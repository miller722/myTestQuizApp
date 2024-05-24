// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList';
import CreateQuiz from './components/CreateQuiz';
import EditQuiz from './components/EditQuiz';
// import TakeQuiz from './components/TakeQuiz';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/edit-quiz/:id" element={<EditQuiz />} />
          {/* <Route path="/take-quiz/:id" element={<TakeQuiz />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
