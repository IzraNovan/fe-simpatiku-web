"use client";

import Image from "next/image";
import logo from "@/public/assets/svg/logo.svg";
import { useRouter } from "next/navigation";
import Menu from "./menu";
import Notification from "./notification";
import { Button } from "@/components/ui/button";
import MenuAvatar from "./menu-avatar";
import HamburgerMenu from "./hamburger-menu";
import { useState } from "react";
import Link from "next/link";

function Navbar() {
	const router = useRouter();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<nav className="w-full h-[85px] px-6 bg-white sticky top-0 z-20 shadow-sm">
			<div className="flex md:max-w-[900px] xl:max-w-[1141px] h-full items-center justify-between mx-auto relative">
				<section>
					<div className="hidden md:flex gap-2 items-center cursor-pointer">
						<Image
							src={logo}
							alt="logo kutai timur"
							width={30}
							height={30}
							onClick={() => router.replace("/")}
						/>

						<div className="text-xs font-montserrat font-bold text-dark-blue">
							Sistem Pelayanan
							<br />
							Terintegrasi Kutai Timur
						</div>
					</div>

					<div className="flex md:hidden items-center">
						<HamburgerMenu />
					</div>
				</section>

				<section className="flex items-center gap-10">
					<Menu />
				</section>

				<section className="flex gap-8 items-center">
					<section>
						<Notification />
					</section>

					<Link href="/login">
						<Button className="bg-secondary-blue rounded-full px-8">
							Masuk
						</Button>
					</Link>

					{/* <section
						className="flex justify-between items-center gap-4"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
						<MenuAvatar isDropdownOpen={isDropdownOpen} />
					</section> */}
				</section>
			</div>
		</nav>
	);
}

export default Navbar;
