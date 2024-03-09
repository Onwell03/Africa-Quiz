import "./Card.css";

const Card = (props) => {
    return (
        <div className="card" onClick={props.onClick}>
            <div className="card_back">{props.answer}</div>
            <div className="card_front">{props.question} <img src={props.image}/></div>
        </div>
    )
}

export default Card;
