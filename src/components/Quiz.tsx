import { Button, Progress, Radio, Spin } from 'antd'
import { AnswerKey, } from '../hooks/useQuizState'
import { FC, } from 'react'
import { cn } from '../utils/cn'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useQuizContext } from '../hooks/useQuizeContext'

const QuizCard: FC<{
  heading: string
  paragraph: string
  buttonLabel: string
  buttonOnClick: () => void
}> = ({ heading, paragraph, buttonOnClick, buttonLabel }) => {
  return (
    <div className="px-4 py-8 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl text-slate-900 font-bold">{heading}</h1>
        <p className="text-slate-800">{paragraph}</p>
      </div>
      <Button
        className="rounded-none"
        color="default"
        size="large"
        onClick={buttonOnClick}
        variant="solid"
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

const QuizEnd = () => {
  const { show } = useQuizContext()

  if (show.end === undefined) {
    return null
  }

  const { result: { percentage, wrongAnswers }, startQuiz } = show.end

  let heading
  let paragraph

  if (percentage === 100) {
    heading = 'Absolutely Perfect!'
    paragraph = `Incredible job! You aced every single question. You're a quiz master! You've guessed ${percentage}% correct.`
  } else if (percentage >= 80) {
    heading = 'Awesome Work!'
    paragraph = `You really know your stuff! Just a few more correct answers and you'd be perfect! You've guessed ${percentage}% correct.`
  } else if (percentage >= 50) {
    heading = 'Nice Try!'
    paragraph = `Good effort! With a bit more practice, you'll score even higher! You've guessed ${percentage}% correct.`
  } else {
    heading = 'Keep Going!'
    paragraph = `Don't worry about the score. Each question is a step towards learning something new! You've guessed ${percentage}% correct.`
  }

  return (
    <div className="p-4 space-y-4 relative">
      {percentage >= 100 && (
        <DotLottieReact
          src="https://lottie.host/a187da1c-870e-4bfb-8c48-1d0ca98f6883/NykZkOoNIZ.json"
          className="absolute top-0 left-0 w-full h-full"
          loop={false}
          autoplay
        />
      )}
      <QuizCard
        heading={heading}
        paragraph={paragraph}
        buttonLabel="Start Again"
        buttonOnClick={startQuiz}
      />
      {percentage < 100 && (
        <div className="space-y-8 p-4">
          <h1 className="text-3xl text-slate-900 font-bold">What you got wrong?</h1>
          <ul className="space-y-4">
            {
              wrongAnswers.map(({ answer, correctAnswer, question }) => (
                <li key={question}>
                  <p className="text-slate-800">{question}</p>
                  <p>Your answer: {answer || <span className="text-red-500">skipped</span>}</p>
                  <p>Correct answer: {correctAnswer}</p>
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  )
}


const QuizProgress = () => {
  const { show, fetching } = useQuizContext()
  if (show.progress === undefined) {
    return null
  }
  if (fetching) {
    return (
      <div className="p-8" >
        <Spin size="large"></Spin>
      </div >
    )
  }
  return (
    <>
      <Progress
        status="active"
        size={{
          height: 20,
        }}
        strokeColor={{
          from: '#108ee9',
          to: '#87d068',
        }}
        strokeLinecap="butt"
        percent={(show.progress.idx / show.progress.totalQuestions) * 100}
        showInfo={false}
      />
      <div className="font-semibold text-slate-900 p-8">
        <h1>{show.progress.question}</h1>
        <div className="space-y-4 font-bold text-slate-900">
          {Object.entries(show.progress.answers)
            .filter((entry) => entry[1] !== null)
            .map(([key, answer]) => {
              return (
                <Radio
                  key={key}
                  checked={show.progress.selectedAnswer === key}
                  onChange={() => show.progress.setSelectedAnswer(key as AnswerKey)}
                  type="radio"
                  name={show.progress.idx.toString()}
                >
                  {answer}
                </Radio>
              )
            })}
        </div>
        <div className="flex gap-x-4 mt-10">
          <Button
            color="default"
            size="large"
            onClick={() => show.progress.nextQuestion()}
            variant="solid"
            className={cn("rounded-none p-4", show.progress.position === 'last' && 'hidden')}
          >
            Next
          </Button>
          <Button
            color="default"
            size="large"
            onClick={() => show.progress.submitQuiz()}
            variant="solid"
            className={cn("rounded-none p-4", show.progress.position !== 'last' && 'hidden')}
          >
            Submit
          </Button>
          <Button
            color="primary"
            size="large"
            onClick={() => show.progress.previousQuestion()}
            variant="solid"
            className="rounded-none p-4"
            disabled={show.progress.position === 'first'}
          >
            Prev
          </Button>
          <Button
            color="danger"
            size="large"
            onClick={() => show.progress.skipQuestion()}
            variant="filled"
            className="rounded-none p-4 ml-auto"
          >
            Skip
          </Button>
        </div>
      </div >
    </>
  )
}


const QuizStart = () => {
  const { show } = useQuizContext()
  if (show.start === undefined) {
    return null
  }
  return (
    <div className="bg-slate-400 m-auto w-full max-w-xl">
      <QuizCard
        heading="Welcome to the Ultimate Quiz Challenge!"
        paragraph="Test your knowledge, sharpen your skills, and learn something new with each question! Ready to start?"
        buttonOnClick={() => show.start.startQuiz()}
        buttonLabel="Start Quiz"
      />
    </div>
  )
}

export const Quiz = () => {
  return (
    <div className="bg-slate-400 m-auto w-full max-w-xl">
      <QuizStart />
      <QuizProgress />
      <QuizEnd />
    </div>
  )
}
