import { useNavigate } from 'react-router';
import Button from '../../components/UI/Button'

const ErrorPage = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate(-1); // Navigation to the previous page
    }

    const goHomeHandler = () => {
        navigate('/'); // Navigates home
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-6">
                Oops! Page Not Locate
            </p>
            <div className="flex gap-4">
                <Button onClick={goBackHandler} label="Go Back"></Button>
                <Button label="Home" onClick={goHomeHandler} />
            </div>
        </div>
    );
}

export default ErrorPage;
