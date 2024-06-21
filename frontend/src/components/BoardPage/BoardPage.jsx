import './BoardPage.css';
import { useParams } from 'react-router-dom';
import CardList from '../CardList/CardList';
import NewCardForm from '../NewCardForm/NewCardForm';
import { useState, useEffect } from 'react';

function BoardPage() {
    const [selectedBoard,setSelectedBoard] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                closeModal={handleCloseModal} />}
        </>
    );}

export default BoardPage;
