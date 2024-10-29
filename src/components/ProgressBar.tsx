import React from 'react';
import { Flex, Progress } from 'antd';

const ProgressBar: React.FC = () => (
  <Flex gap="small" wrap>
    <Progress type="circle" percent={75} />
  </Flex>
);

export default ProgressBar;