import { SIMPATIKU_ABOUT, SIMPATIKU_OPD } from "@/utils/constant";
import React from "react";

function AboutSection() {
	return (
		<div className="mt-10 pt-10 flex flex-col" id="about">
			<div className="flex-center gap-10 flex-col">
				<h1 className="mt-5 head_text max-md:text-3xl">
					Tentang SIMPATIKU
				</h1>
				<hr className="mini_hr" />
			</div>

			<div className="mt-14 w-full text-dark-blue font-poppins font-normal text-lg">
				<div className="flex flex-col justify-center sm:max-w-[80%] md:max-w-[680px] xl:max-w-[1141px] gap-6 mx-auto text-justify md:text-left px-10 md:px-0">
					<article className="w-full">
						Sistem Pelayanan Terintegrasi Kutai Timur (SIMPATIKU)
						merupakan layanan administrasi terintegrasi yang
						diperuntukkan bagi masyarakat Kabupaten Kutai Timur.
						Layanan publik ini mewadahi beberapa layanan. OPD, yaitu:
					</article>
					<div>
						{SIMPATIKU_OPD.map((opd) => (
							<div
								className="flex gap-4 mt-4 md:px-1 items-center"
								key={opd.no}>
								<div className="flex-center w-8 h-8 rounded-full bg-primary/50/10 text-primary/50 text-sm">
									{opd.no}
								</div>
								<p>{opd.name}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutSection;
