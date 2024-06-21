import { MENUS as menus } from "@/utils/constant";
import { handleClickedMenu } from "@/utils/functions";
import { usePathname, useRouter } from "next/navigation";

function Menu() {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<ul className="hidden md:flex md:gap-4 xl:gap-8 items-center">
			{menus.map((menu) => (
				<li
					key={menu.id}
					className="font-medium text-secondary-blue cursor-pointer text_hover"
					onClick={() =>
						handleClickedMenu(router, pathname, menu.id)
					}>
					{menu.name}
				</li>
			))}
		</ul>
	);
}

export default Menu;
