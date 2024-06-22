import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SearchForm from './components/SearchForm/SearchForm'
import BoardList from './components/BoardList/BoardList'
import NewBoardForm from './components/NewBoardForm/NewBoardForm'
import BoardPage from './components/BoardPage/BoardPage'

function App() {
  const [boards, setBoards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boardData, setBoardData] = useState({
    title: '',
    category: '',
    author: null
  });
  const [searchQuery,setSearchQuery] = useState("");
  const [searchResults,setSearchResults] = useState([]);
  const [filterCriteria,setFilterCriteria] = useState("All");
  const [filteredResults,setFilteredResults] = useState([]);
  const [boardPageTitle,setboardPageTitle] = useState("");
  const [selectedBoard,setSelectedBoard] = useState(null);

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
    setFilteredResults(boards);
  };

  async function addBoard(boardData) {
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: boardData.title,
          category: boardData.category,
          author: boardData.author
          })
        };
      const response = await fetch(`${backendUrlAccess}/boards`,options);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      getBoards();
    }
    catch(error) {
      console.error(error);
    }
  };

  async function deleteBoard(boardId) {
    try{
      const backendUrlAccess = import.meta.env.VITE_BACKEND_ADDRESS;
      const options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        };
      const response = await fetch(`${backendUrlAccess}/boards/${boardId}`,options);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      getBoards();
    }
    catch(error) {
      console.error(error);
    }
  }

  const handleBoardDataChange = (data) => {
    setBoardData(prev => ({ ...prev, ...data }));
  };

  const handleCreateBoard = () => {
    addBoard(boardData);
    setIsModalVisible(false);
  }

  const handleSearchQuery = (searchInput) => {
    setSearchQuery(searchInput);
    setSearchResults(boards.filter(board => board.title.toLowerCase().includes(searchInput.toLowerCase())));
  }

  function getFilteredBoards(boards, criteria) {
    if (criteria == "All") {
      return boards;
    }
    const filtered = boards.filter(board => board.category == criteria);
    return filtered.length > 0 ? filtered : [];
  }

  return (
    <Router>
      <header id='app-header'>
        <div className='header-logo'>
          <img src='https://placehold.co/100x100' alt=''/>
        </div>
        <h1>KUDOBOARD</h1>
      </header>
      <Routes>
        <Route path='/' element={
          <>
            <main>
              <SearchForm
                searchQuery={searchQuery}
                handleSearchQuery={handleSearchQuery}
                handleFilterClicked={setFilterCriteria}
              />
              <button className="board-list-button" onClick={() => setIsModalVisible(true)}>Create a New Board</button>
              <BoardList
                boards={searchQuery ? getFilteredBoards(searchResults, filterCriteria) : getFilteredBoards(boards, filterCriteria)}
                onBoardDelete={deleteBoard}
                getBoardPageTitle={setboardPageTitle}
              />
            </main>
            {isModalVisible && <NewBoardForm
              isOpen={isModalVisible}
              closeModal={() => setIsModalVisible(false)}
              onBoardDataChange={handleBoardDataChange}
              boardData={boardData}
              submitForm={handleCreateBoard}/>}
          </>
        } />
        <Route path='/board/:boardId' element={<BoardPage />}/>
      </Routes>
              <footer>
                Fiyinfoluwa Afolayan 2024
              </footer>
    </Router>
  )
}

export default App
