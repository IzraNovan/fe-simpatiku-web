"use client";

import { createContext, useContext, useState } from "react";

const Context = createContext();

export function StateContext({ children }) {
	const [fileLoad, setFileLoad] = useState(false);
	const [me, setMe] = useState({});
	const [selectedService, setSelectedService] = useState("");

	const [signInModal, setSignInModal] = useState(false);
	const [verificationModal, setVerificationModal] = useState(false);
	const [resendOTPModal, setResendOTPModal] = useState(false);
	const [forgotModal, setForgotModal] = useState(false);
	const [messageModal, setMessageModal] = useState({
		title: "",
		desc: "",
	});

	const [nextPathAfterSignIn, setNextPathAfterSignIn] =
		useState(null);

	return (
		<Context.Provider
			value={{
				me,
				setMe,
				selectedService,
				setSelectedService,
				signInModal,
				setSignInModal,
				verificationModal,
				setVerificationModal,
				messageModal,
				setMessageModal,
				forgotModal,
				setForgotModal,
				nextPathAfterSignIn,
				setNextPathAfterSignIn,
				resendOTPModal,
				setResendOTPModal,
				fileLoad,
				setFileLoad,
			}}>
			{children}
		</Context.Provider>
	);
}

export const useStateContext = () => useContext(Context);
