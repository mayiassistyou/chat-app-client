import clsx from "clsx";
import React from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";

interface Props {
  type?: string;
  name: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  icon: React.ReactNode;
  placeholder: string;
  errors?: {
    [x: string]: any;
  };
  errorLabel?: string;
}

export default function AppInput(props: Props) {
  const {
    type = "text",
    name,
    required = false,
    register,
    icon,
    placeholder,
    errors,
    errorLabel,
  } = props;

  return (
    <>
      <div className='relative'>
        <input
          type={type}
          {...register(name, { required })}
          className={clsx(
            "w-full border-none p-2 pl-10 rounded-2xl focus:outline-primary placeholder-gray-dark placeholder-semibold font-semibold"
          )}
          placeholder={placeholder}
        />
        <div className='absolute left-3 top-3'>{icon}</div>
      </div>
      {errors && errors[name] && (
        <div className='text-red mt-1 text-sm'>* {errorLabel}</div>
      )}
    </>
  );
}
