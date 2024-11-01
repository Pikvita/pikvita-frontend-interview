// src/components/MyChartComponent.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement);

const MyChartComponent = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup chart instance on unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default MyChartComponent;
