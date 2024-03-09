import React from 'react';
import './App.css'
import Flashcard from './Components/Flashcard';


function App() {
  return (
    <div className='App'>
      <h1>Africa General Knowledge</h1>
      <h4>Below contains Africa General Knowledge questions and answers. 
        You are currently in the History Question & Answers quizzes section. 
        Quiz Global also has many multiple choice tests which are available to play here
      </h4>

      <Flashcard />
    </div>
  )
}

export default App

