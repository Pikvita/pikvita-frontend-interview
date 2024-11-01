// src/components/UI/Button.tsx

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, variant = 'primary', ...rest }: ButtonProps) => {
  return <button {...rest}>{children}</button>;
};

export default Button;
