"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import siap from "@/public/assets/img/layanan-peta.png";
import { Button } from "@/components/ui/button";

function SIAPSection() {
	const router = useRouter();

	return (
		<div
			className="mt-20 xl:mt-0 pt-16 mb-14 xl:mb-20 flex sm:w-full md:max-w-[690px] xl:max-w-[1440px] xl:h-[38em] relative"
			id="siap">
			<header
				className="w-full flex flex-col-reverse md:flex-row justify-between content_container mx-auto max-md:items-center relative"
				id="siap">
				<div className="flex grow flex-row md:flex-col text-left xl:justify-center">
					<div className="flex flex-col gap-6 max-sm:mt-12 max-md:items-center">
						<h1 className="text-4xl xl:text-6xl font-[700] font-montserrat tracking-[.2rem] text-secondary-blue text-left">
							Layanan Peta
						</h1>
						<p className="text-justify md:text-left px-10 md:px-0 text-secondary-blue max-lg:text-sm max-md:text-[#465170] max-sm:text-sm sm:max-w-[80%] md:max-w-[50%] xl:max-w-[473px]">
							Sistem Informasi Administrasi Pertanahan (SIAP)
							merupakan sebuah sistem yang dirancang untuk mengelola
							informasi terkait dengan aspek pertanahan suatu wilayah.
						</p>
						<Button
							className="bg-secondary-blue flex-center max-w-max mt-4 gap-2 rounded-full"
							onClick={() => router.push("/map")}>
							<span className="flex-center font-semibold text-base">
								Lihat Peta
							</span>
							<IoIosArrowRoundForward className="text-lg" />
						</Button>
					</div>
				</div>
			</header>
			<div className="md:w-1/2 hidden md:inline absolute top-6 xl:top-0 -right-10 xl:right-0">
				<Image
					src={siap}
					alt="hero"
					priority
					className="absolute right-0"
				/>
			</div>
		</div>
	);
}

export default SIAPSection;
