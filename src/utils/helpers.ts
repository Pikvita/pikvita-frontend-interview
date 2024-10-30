import axios from 'axios';

const API_URL = 'https://quizapi.io/api/v1/questions';
const API_KEY = 'M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY';

export const fetchQuizQuestions = async () => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                apiKey: API_KEY,
                category: 'code',
                difficulty: 'Easy',
                limit: 10,
                tags: 'JavaScript'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
    }
};
