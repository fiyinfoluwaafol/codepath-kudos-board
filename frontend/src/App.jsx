import { useState, useEffect} from 'react'
import './App.css'
import SearchForm from './assets/components/SearchForm/SearchForm'
import BoardList from './assets/components/BoardList/BoardList'

function App() {
  const [boards, setBoards] = useState([])

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
      console.log(data);
      setBoards(data);
    }
    catch(error) {
      console.error(error);
    }
  };

  return (
    <>
      <header id='app-header'>
        <div className='header-logo'>
          <img src='https://placehold.co/100x100' alt=''/>
        </div>
        <h1>KUDOBOARD</h1>
      </header>
      <SearchForm />
      <BoardList boards={boards}/>
    </>
  )
}

export default App
