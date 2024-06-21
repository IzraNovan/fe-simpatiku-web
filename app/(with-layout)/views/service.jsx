"use client";

import { get } from "lodash";
import { useRouter } from "next/navigation";
import { SIMPATIKU_SERVICES } from "@/utils/constant";
import { isUserAuthenticated } from "@/utils/auth";
import Image from "next/image";
import decoLeft from "@/public/assets/img/decoration-left.png";
import decoRight from "@/public/assets/img/decoration-right.png";
import serviceCard from "@/public/assets/img/service-card.png";
import backShadow from "@/public/assets/img/back-shadow.png";
import { useStateContext } from "@/context/StateContext";

function ServiceSection() {
	const router = useRouter();
	const { setSignInModal, setNextPathAfterSignIn } =
		useStateContext() ?? {};

	const handleNavigate = (selectedService) => {
		const isLoggin = isUserAuthenticated();
		const getDesaData = get(profile, "warga_data.desa_data", null);

		let pathService = selectedService.path;

		if (selectedService.value === "kelurahan-desa") {
			pathService = `${selectedService.path}/${getDesaData?.kode}`;
		}

		if (selectedService.value === "kecamatan") {
			pathService = `${selectedService.path}/${getDesaData?.kecamatan_data?.kode}`;
		}

		if (isLoggin) {
			router.push(pathService);
		} else {
			setSignInModal(true);
			setNextPathAfterSignIn(pathService);
		}
	};

	return (
		<div
			className="mt-10 pt-10 flex flex-col relative md:px-10 lg:pb-32 w-full max-md items-center"
			id="service">
			<div className="vector_left max-sm:hidden">
				<Image
					src={decoLeft}
					alt="deco-left"
					width={271}
					height={367}
				/>
			</div>
			<div className="vector_right max-sm:hidden">
				<Image
					src={decoRight}
					alt="deco-right"
					width={271}
					height={367}
				/>
			</div>
			<div className="flex-center gap-10 flex-col">
				<h1 className="head_text max-md:text-3xl mt-5">
					Layanan SIMPATIKU
				</h1>
				<hr className="mini_hr" />
			</div>

			<div className="max-w-[1141px]">
				<div className="mt-16 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-6 gap-8 ">
					{SIMPATIKU_SERVICES.map((service) => (
						<div
							key={service.no}
							className="flex flex-center relative rounded-3xl z-10 cursor-pointer drop-shadow-md"
							onClick={() => handleNavigate(service)}>
							<Image
								src={serviceCard}
								alt="service-card"
								width={320}
								height={190}
								className="bg-white rounded-3xl"
							/>
							<p className="flex-center font-semibold text-dark-blue absolute top-0 bottom-0 w-[70%] text-center text-xl">
								{service.label}
							</p>
							<Image
								src={backShadow}
								width={296}
								height={170}
								alt="back-shadow"
								className="z-[-1] absolute top-0 pt-3 object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ServiceSection;
