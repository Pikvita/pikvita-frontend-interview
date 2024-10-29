import { useState } from 'react';

const Question: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const options: string[] = ['A. COBOL', 'B. COBOL', 'C. COBOL', 'D. COBOL'];

    const handleOptionClick = (index: number) => {
        setSelectedOption(index);
    };

    return (
        <div className=" bg-white w-full">
            <h2 className="text-lg font-semibold mb-2">Question 1 of 10</h2>
            <p className="text-gray-700 mb-4">
                Which of the following is a popular programming language for developing multimedia webpages.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(index)}
                        className={`flex items-center justify-center p-3 border rounded-lg font-semibold ${
                            selectedOption === index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                        } hover:bg-blue-500 hover:text-white transition duration-150`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
