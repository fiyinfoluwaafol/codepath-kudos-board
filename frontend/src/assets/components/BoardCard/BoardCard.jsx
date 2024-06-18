import "./BoardCard.css"

function BoardCard () {
    return (
       <div className="board-card">
            <img src='https://placehold.co/250x400' alt='' className="board-cover"/>
            <h2>Board Title</h2>
            <p>Board Category</p>
            <div className='card-bttn'>
                <button>View Board</button>
                <button>Delete Board</button>
            </div>
       </div>
    )
}

export default BoardCard;
