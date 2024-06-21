"use client";

import Link from "next/link";
import { CgCloseR } from "react-icons/cg";

function TemplateModal({ children, title }) {
	return (
		<section className="fixed inset-0 z-[999] flex-center bg-[rgba(0,0,0,0.5)]">
			<div className="animate-zoom-out w-[85%] md:w-[70%] max-w-6xl">
				<div className="bg-white max-sm:h-[590px] h-auto md:w-[480px] lg:w-[625px] mx-auto rounded-2xl px-6 md:px-10 py-10">
					<header className="flex relative">
						<p className="text-center w-full font-semibold">
							{title}
						</p>
						<Link href="/">
							<CgCloseR className="absolute right-0 opacity-60 cursor-pointer animate-close-out text-[22px]" />
						</Link>
					</header>

					<main className="flex-column gap-5 mt-16">{children}</main>
				</div>
			</div>
		</section>
	);
}

export default TemplateModal;
