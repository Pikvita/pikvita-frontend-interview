import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  ...rest
}) => {
  const buttonClass = clsx(
    'font-semibold rounded focus:outline-none transition-colors inline-flex items-center justify-center',
    {
      'px-4 py-2 text-white bg-blue-600 hover:bg-blue-700': variant === 'primary',
      'px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300': variant === 'secondary',
      'opacity-50 cursor-not-allowed': disabled || loading,
    },
    {
      'text-sm px-2 py-1': size === 'small',
      'text-md px-4 py-2': size === 'medium',
      'text-lg px-6 py-3': size === 'large',
    }
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="loader border-t-transparent border-white border-2 w-4 h-4 mr-2 rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

