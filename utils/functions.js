export const handleSmoothScroll = (id) => {
	const element = document.getElementById(id);
	if (element) {
		const offset = element.offsetTop - 65;
		window.scrollTo({ top: offset, behavior: "smooth" });
	}
};

export const handleClickedMenu = (router, pathname, id) => {
	if (pathname !== "/") {
		router.replace(`#${id}`);
		setTimeout(() => {
			handleSmoothScroll(id);
		}, 0);
	} else {
		handleSmoothScroll(id);
	}
};
