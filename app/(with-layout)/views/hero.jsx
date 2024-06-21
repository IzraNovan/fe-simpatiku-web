"use client";

import { handleClickedMenu } from "@/utils/functions";
import { IoIosArrowRoundForward } from "react-icons/io";
import heroImg from "@/public/assets/img/hero.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function HeroSection() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<header
			className="w-full flex flex-col-reverse md:flex-row justify-between content_container max-md:items-center"
			id="home">
			<div className="flex grow flex-row md:flex-col text-left justify-center ">
				<div className="flex flex-col gap-2 max-sm:mt-12 max-md:items-center">
					<h1 className="text-4xl xl:text-6xl font-[700] font-montserrat tracking-[.2rem] text-secondary-blue text-left">
						SIMPATIKU
					</h1>
					<p className="text-left text-secondary-blue max-xl:text-sm max-md:text-[#465170] max-sm:text-sm">
						Sistem Pelayanan Terintegrasi Kutai Timur
					</p>
					<Button
						className="bg-secondary-blue flex-center max-w-max mt-4 gap-2 rounded-full"
						onClick={() =>
							handleClickedMenu(router, pathname, "service")
						}>
						<span className="flex-center font-semibold text-base">
							Akses Layanan
						</span>
						<IoIosArrowRoundForward className="text-lg" />
					</Button>
				</div>
			</div>

			<div className="md:w-1/2 max-md:mt-6 max-md:mr-2 px-6">
				<Image src={heroImg} alt="hero" priority />
			</div>
		</header>
	);
}

export default HeroSection;
