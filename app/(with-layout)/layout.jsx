import Footer from "@/layouts/Footer";
import Navbar from "@/layouts/Navbar";
import React from "react";

function WithLayout({ children, modal }) {
	return (
		<>
			<Navbar />
			{modal}
			{children}
			<Footer />
		</>
	);
}

export default WithLayout;
