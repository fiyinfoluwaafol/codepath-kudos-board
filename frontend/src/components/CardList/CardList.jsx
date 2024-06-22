import "./CardList.css"
import Card from "../Card/Card"

function CardList ({cards}) {
    console.log(cards);
    // Check if cards is available and is an array before mapping
    const cardList = cards && Array.isArray(cards) ? cards.map((card) => {
        return (
            <Card
                key={card.id}
                title={card.title}
                description={card.description}
                imgUrl={card.imgUrl}
                upvotes={card.upvotes}
            />
        );
    }) : <p>No cards available.</p>; // You can customize this message or render nothing
    return (
        <div className="card-list-container">
            {cardList}
        </div>
    );
}

export default CardList;
