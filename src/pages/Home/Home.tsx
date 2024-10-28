import { useQuiz } from "../../hooks/useQuiz"

const Home = () => {

  const quesData = useQuiz();
  console.log("Data is here=>", quesData);
  
  return (
    <div>Home</div>
  )
}

export default Home
