// src/utils/api.ts
export interface Question {
    id: number;
    question: string;
    answers: {
      answer_a: string | null;
      answer_b: string | null;
      answer_c: string | null;
      answer_d: string | null;
      answer_e: string | null;
      answer_f: string | null;
    };
    multiple_correct_answers: string; // "true" or "false"
    correct_answers: {
      answer_a_correct: string; // "true" or "false"
      answer_b_correct: string; // "true" or "false"
      answer_c_correct: string; // "true" or "false"
      answer_d_correct: string; // "true" or "false"
      answer_e_correct: string; // "true" or "false"
      answer_f_correct: string; // "true" or "false"
    };
    correct_answer: string; // e.g., "answer_b"
  }
  
  export const fetchQuizData = async (): Promise<Question[]> => {
    const apiUrl = import.meta.env.VITE_QUIZ_API_URL;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch quiz data");
      return await response.json();
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };
  