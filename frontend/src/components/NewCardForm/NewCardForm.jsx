import "./NewCardForm.css"
import { useState } from "react";

function NewCardForm ({closeModal, onCardDataChange, boardData, submitForm}) {
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        onBoardDataChange( {[name]: value} );
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-bttn" onClick={closeModal}>&times;</button>
                <h2>Create a New Card</h2>
                <p>Title:</p>
                <input name='title' type='text' placeholder="Enter card title"/>
                {/* <input name='title' type='text' placeholder="Enter card description" value={boardData.title} onChange={handleInputChange}/> */}
                <p>Description:</p>
                <input name='description' type="text" placeholder="Enter card description"/>
                {/* <input name='description' type="text" placeholder="Enter card description" value={boardData.description} onChange={handleInputChange}/> */}
                <input name="gifSearch" type="text" placeholder="Search GIFs..." />
                <p>Author:</p>
                <input name='author' type="text" placeholder="Enter owner (optional)"/>
                {/* <input name='author' type="text" placeholder="Enter owner (optional)" value={boardData.author} onChange={handleInputChange}/> */}
                <button onClick={submitForm}>Create Card</button>
            </div>
        </div>
    );
}

export default NewCardForm;
