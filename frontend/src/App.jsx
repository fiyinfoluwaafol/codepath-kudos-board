import { useState } from 'react'
import './App.css'
import SearchForm from './assets/components/SearchForm/SearchForm'
import BoardList from './assets/components/BoardList/BoardList'

function App() {

  return (
    <>
      <header id='app-header'>
        <div className='header-logo'>
          <img src='https://placehold.co/100x100' alt=''/>
        </div>
        <h1>KUDOBOARD</h1>
      </header>
      <SearchForm />
      <BoardList />
    </>
  )
}

export default App
