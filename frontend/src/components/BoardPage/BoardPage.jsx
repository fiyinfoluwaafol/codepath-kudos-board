import './BoardPage.css';
import { useParams } from 'react-router-dom';
import CardList from '../CardList/CardList';
import { useState, useEffect } from 'react';

function BoardPage() {
    const [selectedBoard,setSelectedBoard] = useState({});
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
    return (
        <>
            <h1>{selectedBoard.title}</h1>
            <button>Create a Card</button>
            <CardList cards={selectedBoard.cards}/>
        </>
    );}

export default BoardPage;
