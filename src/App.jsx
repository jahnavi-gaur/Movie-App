import "./css/App.css";
import React from 'react'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { MovieProvider } from "./context/MovieContext";

const App = () => {
  return (
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/favorites" element={<Favorites/>} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
