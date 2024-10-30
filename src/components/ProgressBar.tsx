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
      <Progress type="circle" percent={progress} />
    </Flex>
  );
};

export default ProgressBar;