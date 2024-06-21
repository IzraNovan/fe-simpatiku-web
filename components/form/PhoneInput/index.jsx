import React from "react";
import { Controller } from "react-hook-form";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";

import Input from "../TextInput";

function TelephoneInput({
	name,
	control,
	label,
	isInline = false,
	errors,
	customError,
	required,
	errorMessage,
	prefixIcon,
	...rest
}) {
	const inputErrors = customError || errors?.[name];

	return (
		<div
			className={`flex ${
				isInline ? "items-center" : "flex-col gap-2"
			} w-full`}>
			<label
				className={`font-semibold text-fade-black ${
					isInline && "w-[25%]"
				}`}
				htmlFor={name}>
				{label}
			</label>

			{prefixIcon && (
				<div className="absolute left-[15px] top-3 opacity-50 cursor-pointer text-2xl">
					{prefixIcon}
				</div>
			)}
			<Controller
				name={name}
				control={control}
				rules={{ required }}
				defaultValue={null}
				render={({ field }) => {
					return (
						<PhoneInput
							{...field}
							country="id"
							onlyCountries={["id"]}
							countryCodeEditable={false}
							inputStyle={{
								width: "100%",
								height: "50px",
								borderRadius: "10px",
							}}
							{...rest}
						/>
					);
				}}
			/>

			{inputErrors && (
				<p
					className={`text-error/50 text-sm ${
						!inputErrors && "hidden"
					}`}>
					{inputErrors?.message || errorMessage}
				</p>
			)}
		</div>
	);
}

export default TelephoneInput;

{
	/* <PhoneInput
{...field}
country='id'
autoFormat={false}
preferredCountries={['id']}
inputStyle={{
  width: '100%',
  height: '50px',
  borderRadius: '10px',
}}
onChange={() => {
  const inputValue = field.value;
  const cleanPhoneNumber = inputValue?.replace(/\D/g, '');

  if (cleanPhoneNumber?.length <= 15) {
    field.onChange(
      cleanPhoneNumber?.replace(
        /(\d{2})(\d{3})(\d{4})(\d{4})/,
        '+$1 $2 $3 $4'
      )
    );
  }
}}
{...rest}
/> */
}

{
	/*  <PhoneInput
              {...field}
              international
              defaultCountry='ID'
              className={`placeholder:font-light py-2 h-[50px] leading-tight text-gray-700 bg-white border rounded-[10px] appearance-none w-full hover:border-primary/50 focus:outline-0 ${
                inputErrors
                  ? 'border-error/50 ring-[2.9px] ring-error/50/50 transition duration-300'
                  : 'active_input hover:border-primary/50'
              } pl-3`}
              limitMaxLength={15}
              placeholder='Masukkan nomor telepon'
              countryCallingCodeEditable={false}
            /> */
}
