import AboutSection from "./views/about";
import HeroSection from "./views/hero";
import OPDSection from "./views/opd";
import ServiceSection from "./views/service";
import SIAPSection from "./views/siap";
import "./style.css";

export const metadata = {
	title: {
		absolute: "SIMPATIKU | Kutai Timur",
	},
};

export default function HomePage() {
	return (
		<main className="w-full flex-center flex-col pt-10 pb-16 bg-white">
			<HeroSection />

			<OPDSection />

			<AboutSection />

			<ServiceSection />

			<SIAPSection />
		</main>
	);
}
