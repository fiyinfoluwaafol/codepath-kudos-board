import './Card.css';

import React from 'react';

function Card({title, description, imgUrl, author, upvotes, id, handleDelete}) {
  return (
    <div className="card">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src={imgUrl} alt="Card" />
        <button>Upvote: {upvotes}</button>
        {author && (<p>Author: {author}</p>)}
        <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
  );}

export default Card;
