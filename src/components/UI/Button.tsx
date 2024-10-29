import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, variant = 'primary', ...rest }: ButtonProps) => {
  return (
    <button className={`btn-${variant}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
