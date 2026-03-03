import React, { useEffect, useRef, useState } from 'react'
import MovieCard from '../components/MovieCard'
import { getSearchMovies, getPopularMovies } from '../services/api';
import "../css/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  // const input = useRef("")

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popular = await getPopularMovies()
        setMovies(popular)
      }
      catch (err) {
        console.error(err)
        setError("Failed to load movies...")
      }
      finally {
        setLoading(false)
      }
    }
    loadPopularMovies()
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if(!searchQuery.trim()) return
    if(loading) return

    setLoading(true)
    try{
      const searchResults = await getSearchMovies(searchQuery)
      setMovies(searchResults)
    }catch(err){
      console.log(err)
      setError("Failed to search movies...")
    }finally{
      setLoading(false)
    }


    setSearchQuery("")
    // console.log(input.current.value)
  }

  return (
    <div className='home'>
      <form onSubmit={handleSearch} className='search-form'>
        <input
          type="text"
          placeholder='Search for movies....'
          className='search-input'
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value) }}
        // ref={input}
        />
        <button type='submit' className='search-button'>Search</button>
      </form>

      {error && <div className='error-message'>{error}</div>}

      {loading ? (<div className='loading'>Loading...</div>) : (
        <div className='movies-grid'>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
