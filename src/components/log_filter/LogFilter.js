import React, {useState} from 'react';
import FilterList from "./FilterList";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from 'uuid';


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
  }

  const checkbox = (id) => {
    let block = filterBlocks.find(block => block.id === id )
    if (block.checkbox === false){
      block.checkbox = true
    } else {
      block.checkbox = false
    }
  }

  const andor = (andor, id) => {
    let block = filterBlocks.find(block => block.id === id )
    block.andor = andor
  }

  const processLogs = (logs, filterBlocks) => {
    const newlogs = []
    const ands = []
    const ors = []
    console.log("process logs")
    console.log(logs)
    console.log(filterBlocks)

    for (let i = 0; i < filterBlocks.length; i++) {
      if (filterBlocks[i].checkbox === true){
          if (filterBlocks[i].andor === "and"){
            ands.push(filterBlocks[i].filterBy)
            console.log(ands + "ands array")
          }else if (filterBlocks[i].andor === "or"){
            ors.push(filterBlocks[i].filterBy)
            console.log(ors + "ors array")
          }
      }
    }
    const newLogs = logs.filter((log) => ands.includes(log.log))
    


    // logs.filter((log) =>
		// 				log.log.toLowerCase().includes(searchText)
		// 			)
    return newLogs
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
        <LogsList logs = {processLogs(logs, filterBlocks)}/>
      </div>
    </div>
  )
}

export default LogFilter
