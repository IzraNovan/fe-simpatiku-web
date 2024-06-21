import { Toaster } from "react-hot-toast";
import { StateContext } from "@/context/StateContext";
import { API_URL, APP_CONFIG } from "@/utils/constant";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
	src: [
		{
			path: "../public/fonts/Poppins/Poppins-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/Poppins/Poppins-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/Poppins/Poppins-Italic.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "../public/fonts/Poppins/Poppins-SemiBold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/Poppins/Poppins-SemiBoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
});

export const metadata = {
	metadataBase: new URL(API_URL),
	title: {
		default: APP_CONFIG.NAME,
		template: `${APP_CONFIG.NAME} | %s`,
	},
	description: APP_CONFIG.DESC,
	alternates: {
		languages: {
			id: "/id",
		},
	},
	openGraph: {
		title: `${APP_CONFIG.NAME} Kutai Timur`,
		description: APP_CONFIG.DESC,
		url: API_URL,
		siteName: `${APP_CONFIG.NAME} Kutai Timur`,
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<Toaster />
				<StateContext>{children}</StateContext>
			</body>
		</html>
	);
}
