// src/components/Navigation.tsx
import { Button } from 'antd';

interface NavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  isLastQuestion: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ onNext, onPrevious, isLastQuestion }) => (
  <div className="flex justify-between p-4">
    <Button onClick={onPrevious} disabled={!onPrevious}>Previous</Button>
    <Button type="primary" onClick={onNext}>
      {isLastQuestion ? 'Submit' : 'Next'}
    </Button>
  </div>
);

export default Navigation;
