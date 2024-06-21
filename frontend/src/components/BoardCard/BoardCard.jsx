import "./BoardCard.css"
import { useNavigate } from 'react-router-dom';

function BoardCard ({id, title, category, onBoardDelete}) {
    const navigate = useNavigate();
    const handleViewBoard = () => {
        navigate(`/board/${id}`);
    }
    return (
       <div className="board-card">
            <img src='https://placehold.co/250x400' alt='' className="board-cover"/>
            <h2>{title}</h2>
            <p>{category}</p>
            <div className='card-bttn'>
                <button onClick={handleViewBoard}>View Board</button>
                <button onClick={onBoardDelete}>Delete Board</button>
            </div>
       </div>
    )
}

export default BoardCard;
