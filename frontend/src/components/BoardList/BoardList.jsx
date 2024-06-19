import './BoardList.css';
import BoardCard from '../BoardCard/BoardCard';
function BoardList({boards}) {

  const boardLst = boards.map((board) => {
    return (
      <BoardCard
        key={board.id}
        title={board.title}
        category={board.category}
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
