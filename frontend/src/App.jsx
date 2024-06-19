import { useState, useEffect} from 'react'
import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import BoardList from './components/BoardList/BoardList'
import NewBoardForm from './components/NewBoardForm/NewBoardForm'

function App() {
  const [boards, setBoards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getBoards();
  }, []);

  async function getBoards() {
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const response = await fetch(`${backendUrlAccess}/boards`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setBoards(data);
    }
    catch(error) {
      console.error(error);
    }
  };

  function handleOpenModal (){
    setIsModalVisible(true);
  }

  function handleCloseModal () {
    setIsModalVisible(false);
  }

  return (
    <>
      <header id='app-header'>
        <div className='header-logo'>
          <img src='https://placehold.co/100x100' alt=''/>
        </div>
        <h1>KUDOBOARD</h1>
      </header>
      <main>
        <SearchForm />
        <button className="board-list-button" onClick={handleOpenModal}>Create a New Board</button>
        <BoardList boards={boards}/>
      </main>
      <footer>
        Fiyinfoluwa Afolayan 2024
      </footer>
      {isModalVisible && <NewBoardForm isOpen={isModalVisible} closeModal={handleCloseModal}/>}
    </>
  )
}

export default App
