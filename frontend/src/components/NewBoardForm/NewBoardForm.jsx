import "./NewBoardForm.css"

function NewBoardForm ({closeModal, onBoardDataChange, boardData, submitForm}) {
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        onBoardDataChange( {[name]: value} );
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button id="close-bttn" onClick={closeModal}>&times;</button>
                <h2>Create a New Board</h2>
                <p>Title:</p>
                <input name='title' type='text' value={boardData.title} onChange={handleInputChange}/>
                <p>Category:</p>
                <select name='category' value={boardData.category} onChange={handleInputChange}>
                    <option></option>
                    <option value="Recent">Recent</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Thank You">Thank You</option>
                    <option value="Inspiration">Inspiration</option>
                </select>
                <p>Author:</p>
                <input name='author' type="text" value={boardData.author} onChange={handleInputChange}/>
                <button onClick={submitForm} id="create-bttn" >Create Board</button>
            </div>
        </div>
    );
}

export default NewBoardForm;
