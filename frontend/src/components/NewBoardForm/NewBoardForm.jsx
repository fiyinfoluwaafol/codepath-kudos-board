import "./NewBoardForm.css"
import { useState } from "react";

function NewBoardForm ({isOpen, closeModal}) {
    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-bttn" onClick={closeModal}>&times;</button>
                    <h2>Create a New Board</h2>
                    <p>Title:</p>
                    <input type='text'/>
                    <p>Category:</p>
                    <select>
                        <option></option>
                        <option>Recent</option>
                        <option>Celebration</option>
                        <option>Thank You</option>
                        <option>Inspiration</option>
                    </select>
                    <p>Author:</p>
                    <input type="text" />
                    <button>Create Board</button>
                </div>
            </div>
        )
    );
}

export default NewBoardForm;
