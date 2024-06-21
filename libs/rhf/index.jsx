"use client";

import { InputComponentsConstruct } from "@/components/form/InputComponents";
import { get, has } from "lodash/object";
import { useMemo } from "react";
import {
	Controller,
	useFieldArray as useInputArray,
	useForm as useReactForm,
} from "react-hook-form";

function getPropsErrors(fieldName, label, rules, formState) {
	if (formState.errors == null) {
		return [];
	}
	const fieldError = get(formState.errors, fieldName, null);
	if (fieldError == null) {
		return [];
	} else {
		return [getMessage(fieldError, fieldName, label, rules)];
	}
}

function getMessage(fieldError, fieldName, label, rules) {
	if (fieldError.message.trim() == "" || fieldError.message == null) {
		const type = fieldError.type;
		if (!has(rules, type)) {
			throw new Error(
				"error message and rules props is missing, make sure you write it on props rules.[validation_type].message. Or use validation library like 'yup'. Read /libs/hooks/index.jsx for more detail"
			);
		}
		var value = rules[type]?.value;
		if (value == null) {
			value = rules[type];
		}
		return messageString(type, label, value);
	} else {
		return fieldError.message;
	}
}

function messageString(type, label, value) {
	switch (type) {
		case "required":
			return `'${label}' tidak boleh kosong!`;
		case "minLength":
			return `'${label}' harus diisi minimal ${value} karakter!`;
		case "maxLength":
			return `'${label}' tidak boleh diisi lebih dari ${value} karakter!`;
	}
}

/**
 * useForm
 * ini menggunakan pattern IoC dan
 * hooks yang ini merupakan versi
 * "react-hook-form"
 * kamu bisa membuat hooksForm sendiri
 * tanpa terjadi breakChanges
 *
 * satu hooks untuk membangun page form
 * cara menggunakan
 * ```
 *  useForm();
 * ```
 */

export function useForm(config) {
	const reactForm = useReactForm(config),
		{
			control,
			setValue,
			getValues,
			watch,
			reset,
			formState,
			setError,
			clearErrors,
			trigger,
			register,
		} = reactForm,
		handleSubmitRhf = reactForm.handleSubmit;

	const $this = useMemo(
		() => ({
			/**/
		}),
		[]
	);

	$this.useSetupHooks = (opts) => {
		const value = watch(opts.name);
		return { opts, value };
	};

	$this.control = control;

	$this.setup = (opts) => {};

	const InputComponents = useMemo(() => {
		return InputComponentsConstruct($this);
	}, []);

	/**
	 * getFormValue can retrieve string or Array<string>
	 */
	const getFormValue = (names) => {
		return getValues(names);
	};

	const handleSubmit = (callback) => {
		return handleSubmitRhf(callback);
	};

	const setFormValues = (values) => {
		reset(values);
	};

	const watchForm = (...params) => {
		return watch(...params);
	};

	$this.Wrapper = useMemo(() => {
		return (props) => {
			const {
				required,
				render,
				rules,
				key,
				defaultValue,
				validateOnChange,
				...restProps
			} = props;
			const Render = render;
			const name = props.name;
			var rules0 = {};
			if (typeof rules == "object") {
				rules0 = rules;
			}
			if (rules0.required == null) {
				rules0.required = required;
			}

			return (
				<Controller
					key={key}
					name={name}
					rules={rules0}
					control={control}
					defaultValue={defaultValue}
					render={(props) => {
						return (
							<Render
								name={name}
								checked={props.field.value}
								{...{
									onBlur: props.field.onBlur,
									onChange: props.field.onChange,
									value: props.field.value,
								}}
								innerRef={props.field.ref}
								{...restProps}
								errors={getPropsErrors(
									name,
									restProps.label,
									rules0,
									props.formState
								)}
								onChange={(ev) => {
									props.field.onChange(ev);
									if (validateOnChange) {
										trigger(name);
									}
								}}
								onChangeValue={(val) =>
									props.field.onChange({ target: { value: val } })
								}
							/>
						);
					}}
					{...restProps}
				/>
			);
		};
	}, []);

	function useFieldArray(options = {}) {
		return useInputArray({ ...options, control });
	}

	return {
		InputComponents,
		getFormValue,
		handleSubmit,
		setValue,
		setFormValues,
		watchForm,
		formState,
		triggerForm: (...params) => trigger(...params),
		setError,
		clearErrors,
		useFieldArrayV0: useFieldArray,
		register,
	};
}
