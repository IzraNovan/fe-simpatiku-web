import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
// const AsyncSelect = dynamic(() => import("react-select/async"), {
//   ssr: false, // Menonaktifkan server-side rendering (SSR)
//   loading: () => (
//     <div className="relative">
//       <input className="common_input" />
//     </div>
//   ),
// });

function AsyncSelect({
	label,
	loadOptions,
	name,
	errorMessage,
	control,
	setValue,
	customError,
	errors,
	isInline = false,
	required,
	setState,
	onChange: onChangeOrigin,
	defaultOptions,
	defaultValue,
	...rest
}) {
	const inputErrors = customError || errors?.[name];

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: state.isDisabled ? "#E9ECEF" : "#FFF",
			width: "100%",
			display: "flex",
			fontFamily: "Poppins",
			paddingTop: "8px",
			paddingBottom: "8px",
			paddingLeft: "12px",
			justifyContent: "center",
			alignItems: "center",
			outlineWidth: "0px",
			borderRadius: "10px",
			transitionDuration: "300ms",
			border: state.isFocused
				? "1px solid #0340ED"
				: "1px solid #e7eaf0",
			boxShadow: state.isFocused
				? "0 0 0 3px rgba(86, 130, 252, 0.3)"
				: "none",
			"&:hover": {
				border: "1px solid #0340ED",
			},
		}),
		placeholder: (provided) => ({
			...provided,
			fontWeight: "300",
			color: "#757575",
			opacity: ".9",
			letterSpacing: ".2px",
			fontSize: "16px",
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			color: "#212529",
		}),
		singleValue: (provided, state) => ({
			...provided,
			color: state.isDisabled && "#00095",
		}),
	};

	return (
		<div
			className={`flex ${
				isInline ? "items-center justify-between" : "flex-col gap-2"
			} w-full`}>
			<label
				className={`font-semibold text-[#212529] ${
					isInline && "w-[25%]"
				}`}>
				{label}
			</label>
			<div
				className={`flex flex-col relative ${
					isInline ? "w-[80%]" : "w-full"
				}`}>
				<Controller
					name={name}
					control={control}
					rules={{ required }}
					render={({ field: { value, onChange } }) => {
						return (
							<AsyncSelect
								defaultOptions
								styles={customStyles}
								value={value}
								loadOptions={loadOptions}
								onChange={(ev) => {
									onChange(ev);

									if (onChangeOrigin != null) {
										onChangeOrigin(ev);
									}

									setState && setState(selectedOptions);
								}}
								{...rest}
							/>
						);
					}}
				/>
				{inputErrors && (
					<p
						className={`mt-2 text-error/50 ${
							!inputErrors && "hidden"
						}`}>
						{inputErrors?.message || errorMessage}
					</p>
				)}
			</div>
		</div>
	);
}

export default AsyncSelect;

// border: inputErrors
// ? '1px solid #FF3366'
// : state.isFocused
// ? '1px solid #0340ED'
// : '1px solid #e7eaf0',
// boxShadow: inputErrors
// ? '0 0 0 3px #FF336680'
// : state.isFocused
// ? '0 0 0 3px rgba(86, 130, 252, 0.3)'
// : 'none',
// '&:hover': {
// border: '1px solid #0340ED',
// },
