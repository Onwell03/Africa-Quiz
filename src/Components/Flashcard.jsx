import Card from "./card/Card";
import './Flashcard.css';
import {CSSTransition} from 'react-transition-group'
import { useState } from "react";

const Flashcard = () =>{
    const [showFront, setShowFront] = useState(true);
    const [index, setIndex] = useState(0);

    const pairs = [
        {question : "Start", answer : "Click the button below"},
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
        }
    }

    return(
        <div className="flashcard_container">
            <p>Number of cards: {index + 1} / {pairs.length} </p>
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

            <button className='next' onClick={New} disabled={index >=12}>NEXT</button>

        </div>
    );
}

export default Flashcard