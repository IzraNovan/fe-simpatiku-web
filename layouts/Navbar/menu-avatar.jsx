import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";
import { IoChevronDown } from "react-icons/io5";

function MenuAvatar({ isDropdownOpen }) {
	return (
		<>
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<h1 className="font-semibold text-secondary-blue hidden lg:flex">
				Nama Lengkap
			</h1>
			<IoChevronDown
				className={`text-lg text-secondary-blue relative icon-container cursor-pointer focus:outline-none transition-transform duration-300 ${
					isDropdownOpen ? "transform rotate-180" : ""
				}`}
			/>
		</>
	);
}

export default MenuAvatar;
