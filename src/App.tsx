import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QuizList, CreateQuiz, EditQuiz, TakeQuiz, ViewResults } from "./page";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/edit-quiz/:id" element={<EditQuiz />} />
          <Route path="/take-quiz/:id" element={<TakeQuiz />} />
          <Route path="/results/:id" element={<ViewResults />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
