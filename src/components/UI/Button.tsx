// import { ButtonHTMLAttributes } from 'react';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary';
// }

// const Button = ({ children, variant = 'primary', ...rest }: ButtonProps) => {
//   return <button {...rest}>{children}</button>;
// };

// export default Button;
import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string; // make label prop mandatory to be a type of String
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            {label}
        </button>
    );
};

export default Button;