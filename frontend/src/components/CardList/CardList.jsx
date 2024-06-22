import "./CardList.css"
import Card from "../Card/Card"

function CardList ({cards, handleDelete, handleIncrementUpvote}) {
    // Check if cards is available and is an array before mapping
    const cardList = cards && Array.isArray(cards) ? cards.map((card) => {
        return (
            <Card
                key={card.id}
                title={card.title}
                description={card.description}
                imgUrl={card.imgUrl}
                upvotes={card.upvotes}
                id={card.id}
                handleDelete={handleDelete}
                handleIncrementUpvote={handleIncrementUpvote}
            />
        );
    }) : <p>No cards available.</p>;
    return (
        <div className="card-list-container">
            {cardList}
        </div>
    );
}

export default CardList;
