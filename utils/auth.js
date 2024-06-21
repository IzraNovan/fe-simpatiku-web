import { Cookies } from "react-cookie";
import { APP_CONFIG } from "./constant";

const keyTokenName = `${APP_CONFIG.NAME.toLowerCase()}_token`;
const keyRefreshName = `${APP_CONFIG.NAME.toLowerCase()}_refresh`;
const keyUserLogName = `${APP_CONFIG.NAME.toLowerCase()}_user`;

const ONE_MONTH_IN_SECONDS = 30 * 24 * 60 * 60; // 30 hari

const cookies = new Cookies();

const isUserAuthenticated = () => {
	const token = getAuthToken();

	if (!token) {
		setToken(null);

		return false;
	}

	return true;
};

const getAuthToken = () => {
	const token = cookies.get(keyTokenName);

	return token;
};

const getIsUserKeepLogin = () => {
	const refresh = cookies.get(keyRefreshName);

	if (refresh === "true") {
		return true;
	}

	return false;
};

const setToken = (token) => {
	if (token) {
		cookies.set(keyTokenName, JSON.stringify(token), {
			path: "/",
		});
	} else {
		cookies.remove(keyTokenName, { path: "/" });
	}
};

const setIsRefresh = (isRefresh) => {
	if (isRefresh) {
		cookies.set(keyRefreshName, isRefresh, { path: "/" });
	} else {
		cookies.remove(keyTokenName, { path: "/" });
	}
};

const setUserLog = (userData) => {
	if (userData) {
		cookies.set(keyUserLogName, JSON.stringify(userData), {
			path: "/",
			expires: new Date(Date.now() + ONE_MONTH_IN_SECONDS * 1000),
		});
	} else {
		cookies.remove(keyUserLogName, { path: "/" });
	}
};

const getUserLog = () => {
	const user = cookies.get(keyUserLogName);
	return user;
};

export {
	isUserAuthenticated,
	getAuthToken,
	setToken,
	getIsUserKeepLogin,
	setIsRefresh,
	setUserLog,
	getUserLog,
};
