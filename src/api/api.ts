
export const fetchQuestions = async () => {
  const apiKey = "M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY";
  const url = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=code&difficulty=Easy&limit=10&tags=JavaScript`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Transform data to ensure each question has correct structure
    return data.map((item: any) => ({
      question: item.question,
      answers: item.answers,
      correctAnswers: Object.keys(item.correct_answers)
        .filter(key => item.correct_answers[key] === "true")
        .map(key => key.replace("_correct", "")) // Removing "_correct" suffix for consistency
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

