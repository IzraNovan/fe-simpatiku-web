function Textarea({
	id,
	label,
	className,
	name,
	register,
	errors,
	customError,
	isInline = false,
	required,
	errorMessage,
	...rest
}) {
	const inputErrors = customError || errors?.[name];

	return (
		<div
			className={`flex ${
				isInline ? 'items-center justify-between' : 'flex-col gap-2'
			} gap-2 mt-2 w-full`}>
			<label
				className={`font-semibold text-[#212529] ${
					isInline && 'w-[25%]'
				}`}>
				{label}
			</label>
			<div
				className={`flex flex-col gap-2 relative ${
					isInline ? 'w-[80%]' : 'w-full'
				}`}>
				<textarea
					name={id}
					id={id}
					className='common_textarea active_input'
					style={rest.disabled ? { backgroundColor: '#E9ECEF' } : {}}
					{...register(name, { required })}
					{...rest}
				/>

				{inputErrors && (
					<p
						className={`text-error/50 text-sm ${
							!inputErrors && 'hidden'
						}`}>
						{inputErrors?.message || errorMessage}
					</p>
				)}
			</div>
		</div>
	);
}

export default Textarea;

// className={`${
//   inputErrors
//     ? "error_common_textarea"
//     : "common_textarea active_input"
// } `}
