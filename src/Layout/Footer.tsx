// const Footer = () => {
//   return <div>Footer</div>;
// };

// export default Footer;
// Footer.tsx
import React from 'react';

interface FooterProps {
    score: number | null;
    totalQuestions: number;
}

const Footer: React.FC<FooterProps> = ({ score, totalQuestions }) => {
    return (
        <footer className="mt-6 text-center">
            {score !== null && (
                <p className="text-xl font-bold">
                    Your Score: {score} / {totalQuestions}
                </p>
            )}
        </footer>
    );
};

export default Footer;
