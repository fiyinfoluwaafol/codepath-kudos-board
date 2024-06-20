import "./BoardCard.css"

function BoardCard ({title, category, onBoardDelete}) {
    return (
       <div className="board-card">
            <img src='https://placehold.co/250x400' alt='' className="board-cover"/>
            <h2>{title}</h2>
            <p>{category}</p>
            <div className='card-bttn'>
                <button>View Board</button>
                <button onClick={onBoardDelete}>Delete Board</button>
            </div>
       </div>
    )
}

export default BoardCard;
