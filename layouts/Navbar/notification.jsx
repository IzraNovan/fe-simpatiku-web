"use client";

import React, { useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

function Notification() {
	const notificationRef = useRef();
	const [totalNotification, setTotalNotification] = useState(2);

	const digits = totalNotification.toString().length;

	const getBadgeWidth = () => {
		if (digits === 1) return "16px";
		if (digits === 2) return "19px";
		return "30px"; // Adjust for 3 or more digits
	};

	return (
		<div
			ref={notificationRef}
			id="notification-icon"
			// onClick={handleToggleNotification}
			className="relative cursor-pointer mt-1">
			<FaBell className="text-xl text-secondary-blue" />
			{totalNotification > 0 && (
				<div
					className={`flex-center h-[17px] rounded-full bg-[#FF1D56] absolute ${
						digits < 3
							? "top-[-10px] right-[-8px]"
							: "top-[-12px] right-[-18px]"
					}  text-xs text-white font-semibold`}
					style={{ width: getBadgeWidth() }}>
					{totalNotification}
				</div>
			)}
		</div>
	);
}

export default Notification;
