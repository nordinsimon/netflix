import { useState } from "react"

const SearchBar = ({movies, setSearching}) => {
    const [input, setInput] = useState('')

    return(
      <div>
      <h2 onClick={() => setSearching(false)}>x</h2>
      <h2>Search</h2>
      <input type="text" placeholder="Search for movies" onChange={(event) => setInput(event.target.value)}></input>
      <ul>

      </ul>
    </div>
    )
  }

export default SearchBar