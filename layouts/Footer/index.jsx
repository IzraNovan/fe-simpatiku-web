"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/assets/svg/logo.svg";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
	return (
		<footer className="max-md:flex w-full py-6 bg-[#001324] text-slate-100 max-md:items-center mt-auto">
			<div className="flex flex-col gap-4 max-sm:px-4 w-[80%] md:max-w-[680px] xl:max-w-[1141px] mx-auto">
				<div className="flex flex-col md:flex-row justify-center md:justify-between items-start max-md:gap-6 max-md:items-center">
					<div className="flex gap-2 items-center">
						<Image
							src={logo}
							alt="logo kabupaten kutai timur"
							width={34}
							height={45}
							className="w-auto h-auto"
						/>

						<div className="text-xs">
							<h1 className="font-semibold">Sistem Pelayanan</h1>
							<p className="">Terintegrasi Kutai Timur</p>
						</div>
					</div>

					<div className="flex flex-col max-sm:gap-6 gap-4 items-center md:items-end">
						<h1>Social Media :</h1>
						<div className="flex gap-6">
							<PiInstagramLogoFill
								title="Instagram"
								className="text-2xl cursor-pointer"
							/>

							<FaFacebookSquare
								title="Facebook"
								className="text-2xl cursor-pointer"
							/>

							<FaSquareXTwitter
								title="X (Ex Twitter)"
								className="text-2xl cursor-pointer"
							/>

							<FaYoutube
								title="Youtube"
								className="text-2xl cursor-pointer"
							/>
						</div>
					</div>
				</div>

				<hr className="w-full mt-3 opacity-20" />

				<p className="mt-2 max-sm:text-center">
					&copy; {new Date().getFullYear()} SIMPATIKU
				</p>
			</div>
		</footer>
	);
}

export default Footer;
