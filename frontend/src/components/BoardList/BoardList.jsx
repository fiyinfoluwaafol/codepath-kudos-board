import './BoardList.css';
import BoardCard from '../BoardCard/BoardCard';
function BoardList({boards,onBoardDelete}) {

  const boardLst = boards.map((board) => {
    return (
      <BoardCard
        key={board.id}
        id={board.id}
        title={board.title}
        category={board.category}
        onBoardDelete={() => onBoardDelete(board.id)}
      />
    );
  });

  return (
    <div className='board-container'>
        <div className="board-list">
            {boardLst}
        </div>
    </div>
    )
  }

export default BoardList;
