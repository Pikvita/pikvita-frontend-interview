import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Additional props specific to Input component can be defined here
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const Input = ({
  label,
  hasError,
  errorMessage,
  labelClassName,
  errorClassName,
  ...rest
}: InputProps) => {
  const labelClass = labelClassName + 'rest goes here';
  const errorClass = errorClassName + 'rest goes here';
  return (
    <div>
      {label && <label className={labelClass} htmlFor={rest.name}>{label}</label>}
      <input {...rest} />
      {hasError && <p className={errorClass}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
