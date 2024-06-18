import './BoardList.css';
import BoardCard from '../BoardCard/BoardCard';
function BoardList() {
  return (
    <div className='board-container'>
        <button className="board-list-button">Create a New Board</button>
        <div className="board-list">
            <BoardCard />
            <BoardCard />
            <BoardCard />
        </div>
    </div>
    )
  }

export default BoardList;
