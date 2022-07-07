import React from 'react'

const Search = ({searchText}) => {
  return (
    <div className="Search">
        <input onChange={(e) => searchText(e.target.value)} type='text' placeholder='type to search...'></input>
    </div>
  )
}

export default Search //Goes to LogInput.js