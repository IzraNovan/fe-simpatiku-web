"use client";

import PropTypes from "prop-types";
import { useMemo } from "react";

import InputLayout from "./InputLayout";

import TextInput from "./TextInput";
import { Input } from "../ui/input";

export function InputComponentsConstruct($this) {
	const InputComponents = (props) => {
		const { label, name, type, renderInput, ...restProps } = props;

		const Input = useMemo(() => {
			/**
			 * Ini dibuat untuk menentukan apakah
			 * input akan dirender menggunakan
			 * render bawaan `InputComponents` atau
			 * dari props yaitu `renderInput`
			 */
			if (props.renderInput != null) {
				return (yprops) =>
					renderInput({ label, name, ...restProps, ...yprops });
			} else {
				/**
				 * Jika menggunakan render bawaan `InputComponents`
				 * maka perlu menentukan apakah input ini
				 * merupakan type inline atau normal
				 * saat ini 2 dua input yang menggunakan
				 * inline, yaitu
				 * 1. checkbox
				 * 2. radio
				 */

				/** Hanya panggil `getType` didalam `useMemo`,
				 * untuk menghemat komputasi dan stabilitas logika
				 * */
				const TypeInput = getType(type);

				let InputWrapper = InputLayout;

				return (xprops) => {
					return (
						<InputWrapper
							type={type}
							{...xprops}
							name={name}
							label={label}
							Input={TypeInput}
						/>
					);
				};
			}
		}, [type != null, type, renderInput != null]);

		/**
		 * Wrapper didapat dari hooks yang memanggil
		 * HOC ini. Jadi Wrapper ini dapat dicustomisasi
		 * lewat hook yang memanggil function `InputComponentsConstruct`
		 */
		const Wrapper = $this.Wrapper;

		return (
			<Wrapper
				name={name}
				label={label}
				render={Input}
				{...restProps}
			/>
		);
	};

	InputComponents.propTypes = {
		name: PropTypes.string.isRequired,
		type: PropTypes.string,
		label: PropTypes.string,
		required: PropTypes.bool,
		rules: PropTypes.object,
		suffixContent: PropTypes.element,
		prefixContent: PropTypes.element,
		renderInput: PropTypes.func,
	};

	return InputComponents;
}

/**
 * Jika ingin menambahkan input baru
 * silahkan daftarkan disini
 */

function getType(type) {
	switch (type) {
		case "text":
			return TextInput;
		default:
			return (
				<div>
					<Input />
				</div>
			);
	}
}
