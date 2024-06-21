'use client';

import { DateInput } from '@mantine/dates';
import { Controller } from 'react-hook-form';
import { BsCalendar } from 'react-icons/bs';
import format from 'date-fns/format';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function InputDate({
	name,
	control,
	label,
	isInline = false,
	errors,
	customError,
	required,
	errorMessage,
	...rest
}) {
	const inputErrors = customError || errors?.[name];

	const handleChangeDate = (dateValue, onChange) => {
		return onChange(format(new Date(dateValue), 'yyyy-MM-dd'));
	};

	return (
		<div
			className={`flex ${
				isInline ? 'items-center' : 'flex-col gap-2'
			} w-full`}>
			<label
				className={`font-semibold text-fade-black ${
					isInline && 'w-[25%]'
				}`}
				htmlFor={name}>
				{label}
			</label>
			<Controller
				name={name}
				control={control}
				rules={{ required }}
				defaultValue={null}
				render={({ field }) => {
					return (
						<DateInput
							{...field}
							{...rest}
							locale='id'
							onChange={(dateValue) =>
								handleChangeDate(dateValue, field.onChange)
							}
							value={
								field.value ? new Date(field.value) : field.value
							}
							rightSection={<BsCalendar className='mr-5' />}
							placeholder='dd/mm/yyyy'
							valueFormat='DD/MM/YYYY'
							mx='auto'
							styles={() => ({
								root: {
									width: isInline ? '80.4%' : '100%',
									display: 'flex',
								},
								wrapper: {
									width: '100%',
								},
								input: {
									backgroundColor: rest.disabled ? '#E9ECEF' : '#FFF',
									fontFamily: 'Poppins',
									paddingLeft: '22px',
									paddingRight: '22px',
									width: '100%',
									height: '50px',
									borderRadius: '10px',
									border: rest.disabled ? 0 : '1px solid #80808030',
									boxShadow: 'none',
									appearance: 'none',
									fontSize: '15px',
									color: '#00095',
									'&:disabled': {
										opacity: 1,
										color: 'rgb(55,65,81)',
										backgroundColor: 'rgb(233, 236, 239)',
									},
								},
							})}
						/>
					);
				}}
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
	);
}

export default InputDate;

// border: inputErrors
// ? '1px solid #FF3366'
// : rest.disabled
//   ? 0
//   : '1px solid #80808030',
// boxShadow: inputErrors ? '0 0 0 3px #FF336680' : 'none',
