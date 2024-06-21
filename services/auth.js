import { callAPI, callAPIVanilla } from "./call-api";

export const authUrls = {
	login: "/auth/login/",
	logout: "/auth/logout/",
	"forgot-password": "/auth/request_reset_token/",
	"reset-password": "/auth/reset_password/",
	"refresh-access-token": "/auth/refresh_token/",
	"validate-reset-token": "/auth/validate_reset_token/",
	"get-me": "/auth/me/",
	"register-user": "/auth/register/",
	"register-validate-token": "/auth/validate_register_token/",
};

export function loginUser(body) {
	return callAPIVanilla(authUrls.login, {}, "POST", body);
}

export function logoutUser() {
	return callAPI(authUrls.logout, {}, "DELETE");
}

export function refreshToken(body) {
	return callAPI(authUrls["refresh-access-token"], {}, "POST", body);
}

export function forgotPassword(body) {
	return callAPIVanilla(
		authUrls["forgot-password"],
		{},
		"POST",
		body
	);
}

export function resetPassword(body) {
	return callAPIVanilla(authUrls["reset-password"], {}, "POST", body);
}

export function getUser() {
	return callAPI(authUrls["get-me"], {}, "GET", null);
}

export function refreshAccessToken(body) {
	return callAPI(authUrls["refresh-access-token"], {}, "POST", body);
}

export function checkTokenReset(body) {
	return callAPI(authUrls["validate-reset-token"], {}, "POST", body);
}

export function aturPassword(body) {
	return callAPI(authUrls["register-user"], {}, "POST", body);
}

export function validateTokenRegister(body) {
	return callAPI(
		authUrls["register-validate-token"],
		{},
		"POST",
		body
	);
}
