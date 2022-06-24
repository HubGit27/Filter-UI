import React, {useState} from 'react';
import FilterList from "./FilterList";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from 'uuid';
import {logs} from "../log_input/LogInput";


const LogFilter = ({logs}) => {
  const[filterBlocks, setFilterBlocks] = useState([])
  const[filters, setFilters] = useState([])
  //const[logs, setLogs] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))

  const addFilter = () => {
    setFilterBlocks([...filterBlocks, {id: uuidv4(), filterBy:"", checkbox:false, andor: "and"}])
  }

  const addFilterBy = () =>{
    let filterBy = document.getElementById("filterBy").value
    if (filterBy === ""){
      return
    }
    setFilters([...filters, {id: uuidv4(), name:filterBy}])
    document.getElementById("filterBy").value = ""
  }

  const deleteFilter = (id) => {
    const newFilterBlocks = filterBlocks.filter((filterBlock) => filterBlock.id !== id);
    setFilterBlocks(newFilterBlocks)
  }

  const filterSelect = (name, id) => {
    let block = filterBlocks.find(block => block.id === id )
    block.filterBy = name
    console.log(block)
  }

  const checkbox = (id) => {
    let block = filterBlocks.find(block => block.id === id )
    if (block.checkbox === false){
      block.checkbox = true
    } else {
      block.checkbox = false
    }
    console.log(block)
  }

  const andor = (andor, id) => {
    let block = filterBlocks.find(block => block.id === id )
    block.andor = andor
    console.log(block)
  }

  return (
    <div>
      <div className= "floatleft">
        <div className= "filterSettings">
          <button onClick={addFilter}>Create Filter</button>
            <input type="text" id="filterBy"/>
            <button onClick={addFilterBy} >save</button>
        </div>
        <FilterList filterBlocks = {filterBlocks} filters = {filters} deleteFilter = {deleteFilter} 
        filterSelect = {filterSelect} checkbox = {checkbox} andor = {andor}/>
      </div>

      <div className ="floatright">
        <h2>Logs</h2>
        <LogsList logs = {logs}/>
      </div>
    </div>
  )
}

export default LogFilter
