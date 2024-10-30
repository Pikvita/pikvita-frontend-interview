// components/ResultsChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ResultsChartProps {
    correctAnswers: number;
    totalQuestions: number;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ correctAnswers, totalQuestions }) => {
    const data = {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [
            {
                label: 'Quiz Results',
                data: [correctAnswers, totalQuestions - correctAnswers],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Quiz Results',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ResultsChart;
