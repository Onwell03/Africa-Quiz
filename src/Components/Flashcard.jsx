import Card from "./card/Card";
import './Flashcard.css';
import {CSSTransition} from 'react-transition-group'
import { useState } from "react";

const Flashcard = () =>{
    const [showFront, setShowFront] = useState(true);
    const [index, setIndex] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [trueAnswer, setTrueAnswer] = useState('');

    const pairs = [
        {question : "Start", answer : "Click the NEXT button below"},
        {question : "How many countries are in Africa?", answer : "54 countries"},
        {question : "The largest country in Africa?", answer : "Algeria"},
        {question : "Which country's flag is this?", 
            answer : "Malawi", 
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdfoWx0r5t-OK1cDvC49BMvHS3Rlt5MMnmXoKu6bloE2kqqrHZxlr_3HiYFdORukQ5t-c&usqp=CAU",},
        {question : "Most populated country in Africa?", answer : "Nigeria"},
        {question : "Which South African politician won the Nobel peace Prize in 1960?", answer : "Albert Luthili"},
        {question : "Which is the second longest river in Africa?", answer : "Zaire, formerly Congo"},
        {question : "Which 100-mile long waterway links the Mediterranean and Red Sea?", answer : "Suez Canal"},
        {question : "Name the Eastern African country which lies on the Equator", answer : "Kenya"},
        {question : "Which country's flag is this?", 
            answer : "Botswana", 
            image : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_Botswana.svg/255px-Flag_of_Botswana.svg.png"},
        {question : "In which country are Tangier and Casablanca?", answer : "Morocco"},
        {question : "Which two couontries were not colonized in Africa?", answer : "Ethiopia and Liberia"},
        {question : "On the boarder of which two countries is the Victoria Falls?", answer : "Zimbabwe and Zambia"}
    ]
    const New = () => {
        if (index < 12){
            setIndex(index+1)
            setShowFront(true)
            setTrueAnswer(pairs[index+1].answer)
            setCorrectAnswer('')
            setInputValue('')
        }
    }
    const Prev = () => {
        if (index > 0){
            setIndex(index - 1)
            setShowFront(true)
            setTrueAnswer(pairs[index-1].answer)
            setCorrectAnswer('')
            setInputValue('')
        }
    }
    const Shuffle = () => {
        const newIndex = Math.floor(Math.random() * pairs.length)
        setIndex(newIndex)
        setShowFront(true)
        setTrueAnswer(pairs[newIndex].answer)
        setCorrectAnswer('')
        setInputValue('')
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const LavenshteinDistance = (a, b) => {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = []

        for (let i = 0; i <= b.length; i++){
            matrix[i] = [i];
        }

        for(let j = 0; j <= a.length; j++){
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++){
            for (let j = 1; j <= a.length; j++){
                if (b.charAt(i-1) === a.charAt(j-1)){
                    matrix[i][j] = matrix[i-1][j-1];
                }else{
                    matrix[i][j] = Math.min(
                        matrix[i-1][j-1] +1,
                        matrix[i][j-1] +1,
                        matrix[i-1][j] +1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    const CheckAnswer = () => {
        const similarityThreashold = 3;

        if (inputValue !== trueAnswer){
            const distance = LavenshteinDistance(inputValue.toLowerCase(), trueAnswer.toLowerCase());
            if (distance <= similarityThreashold){
                setCorrectAnswer('correct');
                setCurrentStreak(currentStreak + 1)
            }else{
                setCorrectAnswer('wrong')
                if (currentStreak > longestStreak){
                    setLongestStreak(currentStreak);
                    setCurrentStreak(0);
                }
            }

        }else{
            setCorrectAnswer('correct');
            setCurrentStreak(currentStreak + 1)
        }
    }

    return(
        <div className="flashcard_container">
            <p>Number of cards: {index + 1} / {pairs.length} </p>
            <p>Current Streak: {currentStreak}, Longest Streak: {longestStreak}</p>
            <CSSTransition 
                in={showFront}
                timeout={300}
                classNames='flip'
            >
                <Card onClick={() =>{setShowFront((v) => !v) }}
                    question={pairs[index].question}
                    image = {pairs[index].image}
                    answer={pairs[index].answer}
                />
            </CSSTransition>
            <div className="input">
                <p>Guess the answer here:</p>
                <input
                    id={correctAnswer} 
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Type your answer here!"
                    />
                <button className="submit" onClick={CheckAnswer}>Submit Guess</button>
            </div>

            <div className="buttons">
                <button className="prev" onClick={Prev} disabled={index==0}>Prev</button>
                <button className='next' onClick={New} disabled={index >=12}>Next</button>
                <button className="shuffle" onClick={Shuffle}>Shuffle</button>
            </div>
        </div>
    );
}

export default Flashcard