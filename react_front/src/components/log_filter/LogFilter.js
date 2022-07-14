import React, {useState, useEffect} from 'react';
import FilterList from "./FilterList";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from 'uuid';
//import micromatch from 'micromatch';

const LogFilter = ({logs, trackLogs}) => {
  const[filterBlocks, setFilterBlocks] = useState(localStorage.FILTERBLOCKSLOGFILTER ? JSON.parse(localStorage.FILTERBLOCKSLOGFILTER) : [])
  const[filters, setFilters] = useState(localStorage.FILTERSLOGFILTER ? JSON.parse(localStorage.FILTERSLOGFILTER) : [{id: uuidv4()}])
  const[configurations, setConfigurations] = useState(localStorage.CONFIGURATIONSLOGFILTER ? JSON.parse(localStorage.CONFIGURATIONSLOGFILTER) : [])

  useEffect(() =>{
    localStorage.setItem('FILTERBLOCKSLOGFILTER', JSON.stringify(filterBlocks))
  }, [filterBlocks])

  useEffect(() =>{
    localStorage.setItem('FILTERSLOGFILTER', JSON.stringify(filters))
  }, [filters])

  useEffect(() =>{
    localStorage.setItem('CONFIGURATIONSLOGFILTER', JSON.stringify(configurations))
  }, [configurations])

  const trackFiles = () => {
    trackLogs(true)
  }

  const stopTracking = () => {
    trackLogs(false)
  }

  const addFilter = () => {
    setFilterBlocks([...filterBlocks, {id: uuidv4(), filterBy:"", checkbox: true, andor: "and", regex: false}])
  }

  const addFilterBy = () =>{
    let filterBy = document.getElementById("filterBy").value.toLowerCase()
    if (filterBy === ""){
      return
    }
    setFilters([...filters, {id: uuidv4(), name:filterBy}])
    document.getElementById("filterBy").value = ""
  }

  const clearFilterBlocks = () => {
    setFilterBlocks([])
  }
  
  const clearFilter = () => {
    setFilters([])
  }

  const saveConfiguration = () => {
    let ConfName = document.getElementById("ConfName").value
    let duplicate = false
      for (let i = 0; i < configurations.length; i++) {
        if (ConfName === configurations[i].name || ConfName === ""){
          duplicate = true
        }
      }
    if (duplicate === true){
      document.getElementById("ConfName").value = "Name already exist";
    } else {
      setConfigurations([...configurations, {name: ConfName, filters:filters, blocks:filterBlocks} ])
      document.getElementById("ConfName").value = "";
      console.log(configurations)
    }
  }

  const deleteConfiguration = () => {
    let ConfName = document.getElementById("ConfName").value
    let newConfifurations = configurations.filter(conf => conf.name !== ConfName)
    setConfigurations(newConfifurations)
    console.log(configurations)
    document.getElementById("ConfName").value = "";
  }

  const selectConfiguration = () => {
    let ConfName = document.getElementById("ConfName").value
    for (let i = 0; i < configurations.length; i++){
      if (ConfName === configurations[i].name){
        setFilters(configurations[i].filters)
        setFilterBlocks(configurations[i].blocks)
      }
    }
    document.getElementById("ConfName").value = "";
    console.log(filterBlocks)
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

  const regex = (id) => {
    let block = filterBlocks.find(block => block.id === id )
    if (block.regex === false){
      block.regex = true
    } else {
      block.regex = false
    }
    console.log(block)
    setFilterBlocks([...filterBlocks])
  }

  const processLogs = (logs, filterBlocks) => {
    const ands = []
    const ors = []

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
        return ors.some(term => l.log.toLowerCase().includes(term))
      })
    }
    if (output.length < 1 || ors.length < 1){
      output = logs
    }

    // filter for ands
    const output1 = output.filter((log) => {
        return ands.every(val => log.log.toLowerCase().includes(val))
    })

    return output1
  }

  return (
    <div>
      <div className= "allFilterOptionFlex">
        <div className= "filterSettingsLeft">
          <div className= "trackbuttons">
            <button className = "trackbutton" onClick={trackFiles}>Track Files</button>
            <button className = "stoptrackbutton" onClick={stopTracking}>Stop Tracking</button>
          </div>
          <div className= "trackbuttons">
            <button className = "greenwords" onClick={addFilterBy} >Save</button>
            <button className = "redwords" onClick={clearFilter}>Clear</button>
          </div>
          <div>
              <input className='listOfFilters' list="FilterBy" id="filterBy" placeholder="Add words to filter"/>  
              <datalist id="FilterBy">
                {filters.map((e) => <option key = {uuidv4()}>{e.name}</option>)}
              </datalist>
          </div>
        </div>
        
        <div className= "filterSettings">
          <div className= "trackbuttons">
            <button className = "greenwords" onClick={addFilter}>Create Filter</button>
            <button className = "redwords" onClick={clearFilterBlocks}>Clear Filters</button>
          </div>

          <div className= "trackbuttons">
            <button className = "greenwords" onClick={saveConfiguration}>Save Configuration</button>
            <button className = "redwords" onClick={deleteConfiguration}>Delete Configuration</button>
            <button className = "bluewords" onClick={selectConfiguration}>Select Configuration</button>
          </div>

          <div>
            <input list="configs" id="ConfName" placeholder="Pre-loaded Configurations" className='listOfFilters'/>  
            <datalist id="configs">
              {configurations.map((e) => <option key = {uuidv4()} >{e.name}</option>)}
            </datalist>
          </div>
        </div>

        <div className='FilterBlocks'>
          <FilterList filterBlocks = {filterBlocks} filters = {filters} deleteFilter = {deleteFilter} 
          filterSelect = {filterSelect} checkbox = {checkbox} andor = {andor} regex = {regex}/>
        </div>

      </div>

      <div className ="logFileEntries" >
        <h2>Log File Entries</h2>
        <LogsList logs = {processLogs(logs, filterBlocks)} />
      </div>
    </div>
  )
}

export default LogFilter
