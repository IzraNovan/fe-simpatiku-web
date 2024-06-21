import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Controller } from 'react-hook-form';

const regex = new RegExp('^\\d+$');

function Input({
  customError,
  errors,
  register,
  watch,
  label,
  name,
  control,
  className,
  required,
  errorMessage,
  inputType = 'text',
  keterangan = '',
  isInline = false,
  prefixIcon,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputErrors = customError || errors?.[name];
  // const registerProps = register(name, { required });
  // console.log("register", registerProps);
  // // const watch(value)
  return (
    <div
      className={`flex ${isInline ? 'items-center' : 'flex-col gap-2'} w-full`}>
      <label
        className={`font-semibold text-fade-black ${isInline && 'w-[25%]'}`}
        htmlFor={name}>
        {label}
      </label>

      {/* Icon bagian kiri/depan */}
      <div
        className={`flex flex-col gap-2 relative ${
          isInline ? 'w-[80%]' : 'w-full'
        }`}>
        {prefixIcon && (
          <div className='absolute left-[15px] top-3 opacity-50 cursor-pointer text-2xl'>
            {prefixIcon}
          </div>
        )}

        {/* Input */}
        <Controller
          control={control}
          name={name}
          rules={{ required: required }}
          render={(props) => {
            return (
              <input
                id={name}
                {...props.field}
                onChange={(ev) => {
                  const val = ev.target.value;
                  if (val == '' || regex.test(val)) {
                    props.field.onChange(ev);
                  } else {
                    ev.preventDefault();
                    return false;
                  }
                }}
                className={`placeholder:font-light py-2 h-[50px] leading-tight text-gray-700 bg-white border rounded-[10px] appearance-none w-full hover:border-primary/50 outline-0 ${
                  inputErrors
                    ? 'border-error/50 ring-[2.9px] ring-error/50/50 transition duration-300'
                    : 'active_input hover:border-primary/50'
                } ${prefixIcon ? 'pl-12' : 'pl-5'}`}
                style={rest.disabled ? { backgroundColor: '#E9ECEF' } : {}}
                type={
                  inputType === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : 'text'
                }
                {...rest}
              />
            );
          }}
        />

        {/* Icon mata saat type password */}
        <div
          className='absolute right-4 top-[15px] opacity-50 cursor-pointer text-xl'
          onClick={() => setShowPassword(!showPassword)}
          hidden={inputType !== 'password'}>
          {showPassword ? <BsEye /> : <BsEyeSlash />}
        </div>

        {keterangan && (
          <span className='absolute right-4 top-4 max-sm:text-xs text-sm text-slate-400'>
            {keterangan}
          </span>
        )}
        {inputErrors && (
          <p className={`text-error/50 ${!inputErrors && 'hidden'}`}>
            {inputErrors?.message || errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;
