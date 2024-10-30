// // const Header = () => {
// //   return <div>Header</div>;
// // };

// // export default Header;
// // components/Layout/Header.tsx
import React from 'react';

interface HeaderProps {
    progress: number;
}

const Header: React.FC<HeaderProps> = ({ progress }) => {
    return (
        <header className="flex flex-col items-center p-4 bg-gray-100 w-full max-w-xl">
            <h1 className="text-xl font-bold text-gray-700">Quiz App</h1>
            <div className="w-full h-2 bg-gray-300 rounded-full mt-4 overflow-hidden">
                <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </header>
    );
};

export default Header;
// import React from 'react';

// interface HeaderProps {
//     progress: number;
// }

// const Header: React.FC<HeaderProps> = ({ progress }) => {
//     return (
//         <header className="flex flex-col items-center p-4 bg-gray-100 w-full max-w-3xl mx-auto">
//             <h1 className="text-xl font-bold text-gray-700">Quiz App</h1>
//             <div className="w-full h-2 bg-gray-300 rounded-full mt-4 overflow-hidden">
//                 <div
//                     className="h-full bg-green-500 transition-all duration-300"
//                     style={{ width: `${progress}%` }}
//                 ></div>
//             </div>
//         </header>
//     );
// };

// export default Header;
