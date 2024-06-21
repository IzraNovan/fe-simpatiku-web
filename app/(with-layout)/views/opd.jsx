import { SIMPATIKU_OPD } from "@/utils/constant";
import Image from "next/image";
import React from "react";
import logoImg from "@/public/assets/svg/logo.svg";

function OPDSection() {
	return (
		<div className="bg-[#FAFBFD] w-full mt-16 max-md:hidden py-6">
			<div className="flex max-md:px-2 content_container justify-between">
				{SIMPATIKU_OPD.map((item) => (
					<div
						className="w-[135px] flex flex-col items-center gap-2 font-poppins"
						key={item.no}>
						<Image
							src={logoImg}
							alt={item.name}
							width={30}
							height={30}
						/>
						<p className="flex-wrap text-xs text-center font-semibold">
							{item.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default OPDSection;
