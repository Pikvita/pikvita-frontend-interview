export const fetchQuestions = async () => {
    const apiKey = "M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY";
    const url = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=code&difficulty=Easy&limit=10&tags=JavaScript`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };
  