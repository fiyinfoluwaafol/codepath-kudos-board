import './BoardPage.css';
import { useParams } from 'react-router-dom';
import CardList from '../CardList/CardList';
import NewCardForm from '../NewCardForm/NewCardForm';
import { useState, useEffect } from 'react';

function BoardPage() {
    const [selectedBoard,setSelectedBoard] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cardData,setCardData] = useState({
        title: '',
        description: '',
        imgUrl: '',
        author: null,
        upvotes: 0,
        boardId: '',
    });

    const { boardId } = useParams();

    async function getSpecificBoard(boardId) {
        try{
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/boards/${boardId}`);
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setSelectedBoard(data);
        }
        catch(error) {
            console.error(error);
        }
    };

    async function addCard(cardData) {
        try{
          const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
          const options = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            body: JSON.stringify({
              title: cardData.title,
              description: cardData.description,
              imgUrl: cardData.gifUrl,
              author: cardData.author,
              boardId: cardData.boardId
              })
            };
          const response = await fetch(`${backendUrlAccess}/boards/${cardData.boardId}/cards`,options);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setCardData(data);
          getSpecificBoard(cardData.boardId);
        }
        catch(error) {
          console.error(error);
        }
      };

      async function deleteCard(cardId) {
        try{
          const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
          const options = {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            };
          const response = await fetch(`${backendUrlAccess}/cards/${cardId}`,options);
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          setCardData(data);
          getSpecificBoard(cardData.boardId);

        }
        catch(error) {
          console.error(error);
        }
      };

      async function incrementUpvote(cardId) {
        try {
            const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
            const response = await fetch(`${backendUrlAccess}/cards/${cardId}/upvote`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to increment upvote');
            }

            const updatedCard = await response.json();
            setCardData(updatedCard);
            getSpecificBoard(cardData.boardId);
        } catch (error) {
            console.error('Error incrementing upvote:', error);
        }
    }

      const handleCreateCard = (newCardData) => {
        addCard(newCardData);
        setIsModalVisible(false)
      };

    useEffect(() => {
      getSpecificBoard(boardId);
    }, []);

    return (
        <>
            <h1>{selectedBoard.title}</h1>
            <button onClick={() => setIsModalVisible(true)}>Create a Card</button>
            <CardList cards={selectedBoard.cards} handleDelete={deleteCard} handleIncrementUpvote={incrementUpvote}/>
            {isModalVisible && <NewCardForm
                closeModal={() => setIsModalVisible(false)}
                submitForm={handleCreateCard}
                boardId={boardId} />}
        </>
    );}

export default BoardPage;
