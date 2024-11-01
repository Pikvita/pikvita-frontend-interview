## Output 

<img src='Home.png'>
<img src='Quiz.png'>
<img src='Score.png>

## Problem Statement

Develop a Quiz Application.

### Core Functionality

1. **API Integration**
   - Fetch questions from the [Quiz API](https://quizapi.io/api/v1/questions?apiKey=M7RT7dicTsTgRWHPM4LqiwuNuiHK9VmtPIuFZOnY&category=code&difficulty=Easy&limit=10&tags=JavaScript).

2. **Question Presentation**
   - Display a single question per page with corresponding options.

3. **Progress Tracking**
   - Display a progress bar at the top of each page to indicate the user's progress through the quiz.
   - The progress bar's width will increase as the user completes each question.

4. **Answer Selection**
   - Allow users to select one or more options as their answer(s).
   - Highlight or check the selected options to indicate the user's choice.

5. **Scoring**
   - Calculate the user's score based on the number of correct answers.
   - Display the final score to the user upon quiz completion.

6. **Navigation**
   - Allow users to navigate back and forth between questions and change already selected answers.
   - Prevent editing of answers once the quiz is submitted.

   **Optional Features**
   - Persist the user's progress using local storage, allowing them to resume where they left off after a page refresh.
   - Display the results in a chart or graph.

### Technical Implementation

- **React.js**: Primary framework for building the user interface and managing the application's state.
- **Vite**: Build tool for fast development and server-side rendering.
- **Ant Design**: Component library providing pre-built UI elements like buttons, progress bars, and input fields.
- **React Context / Redux**: Mechanism for sharing data between components without prop drilling, used to manage the quiz's state, including the current question, selected answers, and score.
- **Tailwind CSS**: Utility-first CSS framework for styling the application's components.

### Development Timeline

- **3 days**

### Task Instructions

1. **Fork** the repository.
2. Work on the **interview task** in your forked repository.
3. Make regular commits of your work, your commit structure will also be reviewed. 
4. After completing the task, raise a **Pull Request (PR)** to the project's **main branch**.

### Contact

If you face any issues, feel free to contact us at:  
**Email:** [pikvitadev@gmail.com](mailto:pikvitadev@gmail.com)