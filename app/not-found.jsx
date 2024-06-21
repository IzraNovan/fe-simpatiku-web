import PageNotFound from "@/public/assets/img/404.png";
import Image from "next/image";

export default function NotFound() {
	return (
		<div className="w-screen h-screen flex-center">
			<div className="max-w-all-resolution px-8">
				<div className="flex flex-col justify-center items-center gap-6 text-dark-blue">
					<Image
						src={PageNotFound}
						alt="404"
						width={450}
						height={300}
					/>
					<h1 className="text-3xl font-semibold mt-5">
						Halaman Tidak Ditemukan
					</h1>
					<p>
						Maaf, kami tidak bisa menemukan halaman yang anda cari
					</p>
					<button className="button_blue button_hover">
						Kembali ke halaman sebelumnya
					</button>
				</div>
			</div>
		</div>
	);
}
