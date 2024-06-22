import './Card.css';

import React from 'react';

function Card({title, description, imgUrl, author, upvotes}) {
  return (
    <div className="card">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src="https://placehold.co/100x100" alt="Card" />
        <button>Upvote: {upvotes}</button>
        {author && (<p>Author: {author}</p>)}
        <button>Delete</button>
    </div>
  );}

export default Card;
