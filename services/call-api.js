import { request, requestVanilla } from "@/utils/request";

/**
 *
 * @param {*Object} urls
 * @param {*String} endpoint
 * @returns
 */

export const getEndPoint = (urls, endpoint) => urls[endpoint];

/**
 *
 * @param {*String} endpoint
 * @param {Object} query
 * @param {String} method
 * @param {Object} payload
 * @param {Number} timeout
 * @param {String} responseType
 */

export const callAPI = (
	endpoint,
	query = null,
	method = "GET",
	payload = null,
	timeout = 10000,
	responseType = "json"
) => {
	const requestData = {
		url: endpoint,
		method: method,
		timeout,
		responseType,
	};

	if (query) {
		requestData.params = query;
	}

	if (payload) {
		requestData.data = payload;
	}

	return request(requestData);
};

export const callAPIVanilla = (
	endpoint,
	query = {},
	method = "GET",
	payload = {},
	timeout = 10000,
	responseType = "json"
) => {
	return requestVanilla({
		url: endpoint,
		data: payload,
		params: query,
		method: method,
		timeout,
		responseType,
	});
};
