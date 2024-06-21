import './Card.css';

import React from 'react';

function Card() {
  return (
    <div className="card">
        <h3>Card Title</h3>
        <p>Card Description</p>
        <img src="https://placehold.co/100x100" alt="Card" />
        <button>Upvote: X</button>
        <button>Delete</button>
    </div>
  );}

export default Card;
