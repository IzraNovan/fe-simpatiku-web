export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const APP_CONFIG = {
	NAME: process.env.NEXT_PUBLIC_APP_NAME,
	FULL_NAME: process.env.NEXT_PUBLIC_APP_FULLNAME,
	DESC: process.env.NEXT_PUBLIC_APP_DESC,
	PRIMARY_COLOR: "#" + process.env.NEXT_PUBLIC_APP_PRIMARY_COLOR,
	VERIFY_ALL_DEV: process.env.NEXT_PUBLIC_VERIFY_ALL_DEV == "true",
	URL_CHECK_INTERSECT: process.env.NEXT_PUBLIC_URL_API_INTERSECT,
	LOGO: {
		CORE: `${API_URL}/media/appdata/images/logos/logo-full.png`,
		ICO: `${API_URL}/media/appdata/images/logos/logo-ico.png`,
		LOADING: `/assets/png/logo/sidebar-logo.png`,
	},
	IMAGES: {
		SIDE_LOGIN: `${API_URL}/media/appdata/images/side-login.png`,
	},
};

export const STATUS_CODE = {
	200: 200,
	400: 400,
	409: 409,
	401: 401,
	404: 404,
	422: 422,
	500: 500,
	502: 502,
};

export const TOKEN_EXPIRED = {
	CODE: "token_not_valid",
	DETAIL: "Given token not valid for any token type",
};

export const AUTH_NO_PROVIDED =
	"Authentication credentials were not provided.";

export const MENUS = [
	{
		id: "home",
		name: "Beranda",
		path: "/",
	},
	{
		id: "about",
		name: "Tentang",
		path: "/",
	},
	{
		id: "service",
		name: "Layanan",
		path: "/",
	},
	{
		id: "application",
		name: "Aplikasi",
		path: "/",
	},
];

export const SIMPATIKU_OPD = [
	{ no: 1, name: "Dinas Pertanian" },
	{ no: 2, name: "Badan Kesatuan Bangsa dan Politik" },
	{ no: 3, name: "Kecamatan" },
	{ no: 4, name: "Kelurahan/Desa" },
];

export const SIMPATIKU_SERVICES = [
	{
		no: 1,
		label: "Dinas Pertanian",
		value: "dinas-pertanian",
		path: "/layanan/distan",
	},
	{
		no: 2,
		label: "Badan Kesatuan Bangsa dan Politik",
		value: "badan-kesatuan-bangsa-dan-politik",
		path: "/layanan/kesbangpol",
	},
	{
		no: 3,
		label: "Kecamatan",
		value: "kecamatan",
		path: "/layanan/kecamatan",
	},
	{
		no: 4,
		label: "Kelurahan/Desa",
		value: "kelurahan-desa",
		path: "/layanan/desa",
	},
];

export const REACT_SELECT_CUSTOM_STYLES = {
	indicatorSeparator: () => ({
		display: "none",
	}),
	clearIndicator: (baseStyles) => ({
		...baseStyles,
		padding: "0px 8px",
	}),
	menu: (provided) => ({
		...provided,
		zIndex: 99999,
	}),
	option: (provided, { isSelected, ...rest }) => ({
		...provided,
		fontSize: "14px",
		backgroundColor: isSelected ? APP_CONFIG.PRIMARY_COLOR : "",
		"&:hover": {
			color: "white",
			cursor: "pointer",
			backgroundColor: isSelected
				? APP_CONFIG.PRIMARY_COLOR
				: "#336666d5",
		},
	}),
	singleValue: (baseStyles) => ({
		...baseStyles,
		color: "#16192C",
	}),
	valueContainer: (baseStyles) => ({
		...baseStyles,
		padding: "0px",
		fontSize: "14px",
	}),
	input: (baseStyles, { isMulti }) => ({
		...baseStyles,
		margin: "0px",
		padding: isMulti ? "5px" : "0px",
		fontSize: "14px",
		paddingLeft: isMulti ? "14px" : "0px",
	}),
	dropdownIndicator: (baseStyles) => ({
		...baseStyles,
		padding: "0px",
	}),
	multiValue: (baseStyles, { isDisabled }) => ({
		...baseStyles,
		backgroundColor: APP_CONFIG.PRIMARY_COLOR,
		borderRadius: "6px",
		padding: "3px 10px",
		paddingRight: isDisabled ? "" : "0px",
	}),
	multiValueLabel: (baseStyles) => ({
		...baseStyles,
		color: "white",
		fontSize: "14px",
		fontWeight: "400",
	}),
	multiValueRemove: (baseStyles, { isDisabled }) => ({
		...baseStyles,
		color: "white",
		display: isDisabled ? "none" : "flex",
		alignItems: "center",
		margin: isDisabled ? "" : "0px 2px 0px 2px",
		"&:hover": {
			...baseStyles["&:hover"],
			borderRadius: "0px 5px 5px 0px",
			backgroundColor: "#FF3366",
			color: "white",
		},
	}),
	control: (baseStyles, { isMulti, isDisabled }) => ({
		...baseStyles,
		height: "50px",
		borderColor: "#E7EAF0",
		borderRadius: "0.375rem",
		backgroundColor: isDisabled ? "#E7EAF0" : "",
		boxShadow: "none",
		"&:hover": {
			borderColor: APP_CONFIG.PRIMARY_COLOR,
		},
		"&:focus-within": {
			boxShadow:
				"0px 1px 2px rgba(50, 50, 71, 0.08), 0 0 0 3px rgba(51, 102, 102, 0.5)",
			borderColor: APP_CONFIG.PRIMARY_COLOR,
		},
		...(isMulti
			? {
					padding: "4px 20px 4px 5px !important",
					height: "max-content",
					minHeight: "50px",
			  }
			: {}),
	}),
	placeholder: (provided, { isMulti }) => ({
		...provided,
		fontWeight: "300",
		color: "#8898A9",
		marginLeft: isMulti ? "15px" : "0px",
	}),
};

export const BASE_MAP = {
	GOOGLE_MAP: "GOOGLE_MAP",
	GOOGLE_SATELLITE: "GOOGLE_SATELLITE",
};
