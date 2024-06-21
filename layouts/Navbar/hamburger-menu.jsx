import React from "react";
import Image from "next/image";
import logo from "@/public/assets/svg/logo.svg";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosMenu } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { handleClickedMenu } from "@/utils/functions";
import { MENUS as menus } from "@/utils/constant";

function HamburgerMenu() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<IoIosMenu className="text-3xl" />
			</SheetTrigger>
			<SheetContent>
				<div className="flex flex-col gap-4 items-center mt-12  w-full">
					<ul className="flex flex-col w-full list-none">
						{menus.map((menu) => (
							<li
								key={menu.id}
								className="dropdown_link text_hover"
								onClick={() => {
									handleClickedMenu(router, pathname, menu.id);
								}}>
								{menu.name}
							</li>
						))}
					</ul>
				</div>

				<SheetFooter className="absolute bottom-8">
					<div className="flex-center md:hidden gap-2">
						<Image
							src={logo}
							alt="logo kutai timur"
							width={30}
							height={30}
							onClick={() => router.replace("/")}
							className="cursor-pointer"
						/>

						<div className="text-xs font-montserrat font-bold text-dark-blue">
							Sistem Pelayanan
							<br />
							Terintegrasi Kutai Timur
						</div>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default HamburgerMenu;
