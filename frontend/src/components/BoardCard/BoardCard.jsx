import "./BoardCard.css"
import { useNavigate } from 'react-router-dom';

function BoardCard ({id, title, category, onBoardDelete}) {
    const navigate = useNavigate();
    const handleViewBoard = () => {
        navigate(`/board/${id}`);
    }
    return (
       <div className="board-card">
            <img src={`https://picsum.photos/200/300?random=${Math.random()}`} alt='' className="board-cover"/> {/*Generates a random image*/}
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
