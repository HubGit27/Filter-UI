import React, {useState, useEffect} from 'react';
import FilterList from "./FilterList";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from 'uuid';


const LogFilter = ({logs}) => {
  const[filterBlocks, setFilterBlocks] = useState(localStorage.FILTERBLOCKSLOGFILTER ? JSON.parse(localStorage.FILTERBLOCKSLOGFILTER) : [])
  const[filters, setFilters] = useState(localStorage.FILTERSLOGFILTER ? JSON.parse(localStorage.FILTERSLOGFILTER) : [{id: uuidv4(), name:"Add new filters"}])

  useEffect(() =>{
    localStorage.setItem('FILTERBLOCKSLOGFILTER', JSON.stringify(filterBlocks))
  }, [filterBlocks])

  useEffect(() =>{
    localStorage.setItem('FILTERSLOGFILTER', JSON.stringify(filters))
  }, [filters])

  const addFilter = () => {
    setFilterBlocks([...filterBlocks, {id: uuidv4(), filterBy:"", checkbox: true, andor: "and"}])
  }

  const addFilterBy = () =>{
    let filterBy = document.getElementById("filterBy").value
    if (filterBy === ""){
      return
    }
    setFilters([...filters, {id: uuidv4(), name:filterBy}])
    document.getElementById("filterBy").value = ""
  }

  const clearFilter = () => {
    setFilters([{id: uuidv4(), name:"Add new filters"}])
  }

  const deleteFilter = (id) => {
    const newFilterBlocks = filterBlocks.filter((filterBlock) => filterBlock.id !== id);
    setFilterBlocks(newFilterBlocks)
  }

  const filterSelect = (name, id) => {
    let block = filterBlocks.find(block => block.id === id )
    block.filterBy = name
    setFilterBlocks([...filterBlocks])
  }

  const checkbox = (id) => {
    let block = filterBlocks.find(block => block.id === id )
    if (block.checkbox === false){
      block.checkbox = true
    } else {
      block.checkbox = false
    }
    setFilterBlocks([...filterBlocks])
  }

  const andor = (andor, id) => {
    let block = filterBlocks.find(block => block.id === id )
    block.andor = andor
    setFilterBlocks([...filterBlocks])
  }

  const processLogs = (logs, filterBlocks) => {
    const ands = []
    const ors = []
    console.log("filterblocks below")
    console.log(filterBlocks)

    for (let i = 0; i < filterBlocks.length; i++) {
      if (filterBlocks[i].checkbox === true){
          if (filterBlocks[i].andor === "and"){
            ands.push(filterBlocks[i].filterBy)

          }else if (filterBlocks[i].andor === "or"){
            ors.push(filterBlocks[i].filterBy)
          }
      }
    }

    let output = []
    // filter for, or
    if (ors.length > 0){
      output = logs.filter(l => {
        return ors.some(term => l.log.includes(term))
      })
    }
    if (output.length < 1 || ors.length < 1){
      output = logs
    }

    // filter for ands
    const output1 = output.filter((log) => {
        return ands.every(val => log.log.includes(val))
    })

    return output1
  }

  return (
    <div>
      <div className= "floatleft">
        <div className= "filterSettings">
          <button onClick={addFilter}>Create Filter</button>
          <input type="text" id="filterBy"/>
          <button onClick={addFilterBy} >Save</button>
          <button onClick={clearFilter}>Clear</button>
        </div>
        <FilterList filterBlocks = {filterBlocks} filters = {filters} deleteFilter = {deleteFilter} 
        filterSelect = {filterSelect} checkbox = {checkbox} andor = {andor}/>
      </div>

      <div className ="floatright">
        <h2>Logs</h2>
        <LogsList logs = {processLogs(logs, filterBlocks)}/>
      </div>
    </div>
  )
}

export default LogFilter
