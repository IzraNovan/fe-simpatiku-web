import { Label } from "../ui/label";

function InputLayout({
	Input,
	isInline = false,
	prefix,
	label,
	suffix,
	errors,
	customError,
	errorMessage,
	hideLabel,
	...rest
}) {
	const inputErrors = customError;

	return (
		<div
			className={`flex ${
				isInline ? "items-center" : "flex-col gap-2"
			} w-full`}>
			{!hideLabel && (
				<Label className={`text-base ${isInline && "w-[25%]"}`}>
					{label}
				</Label>
			)}

			<div
				className={`flex flex-col gap-2 relative ${
					isInline ? "w-[80%]" : "w-full"
				}`}>
				{prefix && (
					<div className="absolute left-[15px] top-3 opacity-50 cursor-pointer text-2xl">
						{prefix}
					</div>
				)}

				<div>
					<Input {...rest} />
				</div>

				{suffix && (
					<span className="absolute right-4 top-4 max-sm:text-xs text-sm text-slate-400">
						{suffix}
					</span>
				)}

				{inputErrors && (
					<p
						className={`text-error/50 ${
							!inputErrors && "hidden"
						} text-sm`}>
						{inputErrors?.message || errorMessage}
					</p>
				)}
			</div>
		</div>
	);
}

export default InputLayout;

// ${
// 	inputErrors
// 		? 'border-error/50 ring-[2.9px] ring-error/50/50 transition duration-300'
// 		: 'active_input hover:border-primary/50'
// }
