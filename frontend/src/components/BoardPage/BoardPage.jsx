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
              imgUrl: cardData.imgUrl,
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

      async function deleteCard(boardId) {
        try{
          const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
          const options = {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'},
            };
          const response = await fetch(`${backendUrlAccess}/boards/${boardId}/cards/`,options);
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
      }
      const handleCreateCard = (newCardData) => {
        console.log(newCardData);
        addCard(newCardData);
        handleCloseModal();
      }

    useEffect(() => {
      getSpecificBoard(boardId);
    }, []);

    function handleOpenModal (){
        setIsModalVisible(true);
        console.log('modal opened');
      }

    function handleCloseModal () {
    setIsModalVisible(false);
    }

    return (
        <>
            <h1>{selectedBoard.title}</h1>
            <button onClick={handleOpenModal}>Create a Card</button>
            <CardList cards={selectedBoard.cards}/>
            {isModalVisible && <NewCardForm
                closeModal={handleCloseModal}
                submitForm={handleCreateCard}
                boardId={boardId} />}
        </>
    );}

export default BoardPage;
