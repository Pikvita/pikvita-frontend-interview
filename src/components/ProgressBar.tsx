import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { Flex, Progress } from 'antd';

const ProgressBar: React.FC = () => {
  const { questions, userAnswers } = useQuiz();

  const progress = Math.round(
    (Object.keys(userAnswers).length / questions.length) * 100
  );

  return (
    <Flex gap="small" wrap>
      <div className='flex flex-col items-center'>
        <span className='pb-4 text-lg font-bold'>Progress Bar</span>
        <Progress type="circle" percent={progress} strokeColor="#08204e" />
      </div>
    </Flex>
  );
};

export default ProgressBar;