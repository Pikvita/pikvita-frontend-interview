import { Quiz } from '../../components/Quiz'
import { Section } from '../../components/Section'
import { QuizProvider } from '../../providers/QuizProvider'

const Home = () => {
  return (
    <div className="bg-slate-900">
      <Section className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center w-full py-20">
        <QuizProvider>
          <Quiz />
        </QuizProvider>
      </Section>
    </div>
  )
}

export default Home