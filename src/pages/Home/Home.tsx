import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography } from 'antd'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title level={1}>Welcome to the JavaScript Quiz Application</Title>
      <Paragraph className="mb-8">
        Test your JavaScript knowledge with our interactive quiz!
      </Paragraph>
      <Link to="/quiz">
        <Button type="primary" size="large">
          Start Quiz
        </Button>
      </Link>
    </div>
  )
}

export default Home
