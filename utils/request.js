import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { toast } from "react-hot-toast";
import { refreshToken } from "@/services/auth";
import { getAuthToken, getIsUserKeepLogin, setToken } from "./auth";
import {
	AUTH_NO_PROVIDED,
	STATUS_CODE,
	TOKEN_EXPIRED,
} from "./constant";

/**
 * Instance dari 'axios' yang akan redirect ke '/login' jika token
 * user sudah expire atau invalid
 */
export const request = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	timeout: 1_000_000_000,
});

export const requestVanilla = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	timeout: 1_000_000_000,
});

request.interceptors.request.use((config) => {
	if (!config.headers) {
		config.headers = {};
	}

	const token = getAuthToken();
	if (token) {
		config.headers["Authorization"] = `Bearer ${token?.access_token}`;
	}

	return config;
});

request.interceptors.response.use(
	(response) => {
		return response;
	},
	(err) => {
		if (err.response == null) {
			return Promise.reject(err);
		}
		const errorResponse = err.response.data.errors;
		const errorStatusCode = err.response.status;

		const forbiddenResponse = err.response.status === 403;
		if (forbiddenResponse) {
			toast.error("Anda tidak memiliki izin untuk mengakses!");
		}

		const isInternalError = [
			STATUS_CODE[400],
			STATUS_CODE[422],
			STATUS_CODE[409],
			STATUS_CODE[401],
			STATUS_CODE[404],
		];

		if (isInternalError.includes(errorStatusCode)) {
			if (errorResponse?.detail) {
				if (
					errorResponse?.code !== TOKEN_EXPIRED.CODE &&
					errorResponse?.detail !== TOKEN_EXPIRED.DETAIL &&
					errorResponse?.detail !== AUTH_NO_PROVIDED
				) {
					toast.error(errorResponse?.detail, {
						duration: 9000,
					});
				}
			}

			const errorText = errorResponse?.[0];

			if (
				Array.isArray(errorResponse) &&
				errorText != "Data autentikasi tidak diberikan."
			) {
				errorResponse.forEach((err) => {
					if (typeof err == "string") {
						toast.error(err);
					}
				});
			} else if (
				Array.isArray(errorResponse) &&
				typeof errorResponse == "object" &&
				Array.isArray(errorResponse.non_field_errors)
			) {
				toast.error(errorResponse.non_field_errors[0]);
			}
		}
		if (
			errorStatusCode === STATUS_CODE[500] ||
			errorStatusCode === STATUS_CODE[502]
		) {
			toast.error(
				"Terjadi kesalahan dari internal, silakan coba lagi nanti !"
			);
		}

		return Promise.reject(err);
	}
);

const handleLogoutUser = () => {
	setToken(null);
	toast.error("Sesi habis, silakan masuk kembali.", {
		duration: 3_000,
	});
	setTimeout(function () {
		window.location.replace("/masuk");
	}, 1_500);
};

const refreshAuthLogic = (failedRequest) =>
	getIsUserKeepLogin()
		? refreshToken({ token: getAuthToken().refresh_token }).then(
				(tokenResponse) => {
					setToken(tokenResponse.data.data);
					const newToken = tokenResponse.data.data.access_token;
					failedRequest.response.config.headers[
						"Authorization"
					] = `Bearer ${newToken}`;

					return Promise.resolve();
				},
				(err) => {
					setToken(null);
					toast.error("Sesi habis, silakan masuk kembali.", {
						duration: 3_000,
					});
					setTimeout(function () {
						window.location.replace("/masuk");
					}, 1_500);
					return Promise.reject(err);
				}
		  )
		: handleLogoutUser();

createAuthRefreshInterceptor(request, refreshAuthLogic);
