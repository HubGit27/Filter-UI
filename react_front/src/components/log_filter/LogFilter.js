import React, {useState, useEffect} from 'react';
import FilterList from "./FilterList";
import LogsList from "./LogsList";
import { v4 as uuidv4 } from 'uuid';
//import micromatch from 'micromatch';

const LogFilter = ({logs, trackLogs, chooseSort, important}) => {
  const[filterBlocks, setFilterBlocks] = useState(localStorage.FILTERBLOCKSLOGFILTER ? JSON.parse(localStorage.FILTERBLOCKSLOGFILTER) : [])
  const[importantBoolean, setImportantBoolean] = useState(true)


  useEffect(() =>{
    localStorage.setItem('FILTERBLOCKSLOGFILTER', JSON.stringify(filterBlocks))
  }, [filterBlocks])

  const trackFiles = () => {
    if (importantBoolean === true){
      trackLogs(false)
      setImportantBoolean(false)

    }
    else if (importantBoolean === false){
      trackLogs(true)
      setImportantBoolean(true)
    }
  }

  const importantLogs = () => {
    important(document.getElementById("important").checked)
  }

  const addFilter = () => {
    setFilterBlocks([...filterBlocks, {id: uuidv4(), filterBy:"", checkbox: true, andor: "and", regex: false}])
  }
  const clearFilterBlocks = () => {
    setFilterBlocks([])
  }

  const deleteFilter = (id) => {
    const newFilterBlocks = filterBlocks.filter((filterBlock) => filterBlock.id !== id);
    setFilterBlocks(newFilterBlocks)
  }

  const filterSelect = (name, id) => {
    let block = filterBlocks.find(block => block.id === id )
    block.filterBy = name.toLowerCase()
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
    setFilterBlocks([...filterBlocks])
  }

  const processLogs = (logs, filterBlocks) => {
    const ands = []
    const ors = []
    const highlights = []
    for (let i = 0; i < logs.length; i++) {
      logs[i].highlight = false
    }
    for (let i = 0; i < filterBlocks.length; i++) {
      if (filterBlocks[i].checkbox === true && filterBlocks[i].regex === false){
          if (filterBlocks[i].andor === "and"){
            ands.push(filterBlocks[i].filterBy)
          }else if (filterBlocks[i].andor === "or"){
            ors.push(filterBlocks[i].filterBy)
          }else if (filterBlocks[i].andor === "highlight"){
            highlights.push(filterBlocks[i].filterBy)
          }
      } 

      //Logic for Regex
      if (filterBlocks[i].checkbox === true && filterBlocks[i].regex === true){
        let reg = new RegExp(filterBlocks[i].filterBy);
        for (let j = 0; j < logs.length; j++ ){
          let temp = (logs[j].log.match(reg) || []).join('');
          if (temp.length > 0 && ors.indexOf(temp) < 1 && filterBlocks[i].andor !== "highlight"){
              ors.push(temp)
          } else if (temp.length > 0 && ors.indexOf(temp) < 1 && filterBlocks[i].andor === "highlight"){
            highlights.push(temp)
          }
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

    console.log(highlights)
    for (let i = 0; i < highlights.length; i++ ){
      if (highlights[i].length > 0){
        for (let j = 0; j < output1.length; j++ ){
          if (output1[j].log.includes(highlights[i])){
            output1[j].highlight = true
          } 
        }
      }

    }
    return output1
  }

  async function saveFile() {
    // create a new handle
    const newHandle = await window.showSaveFilePicker();
    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();
    const blob = new Blob([JSON.stringify(filterBlocks, null, 2)], {type : 'application/json'});
    // write our file
    await writableStream.write(blob);
    // close the file and write the contents to disk.
    await writableStream.close();
  }

  async function getFile() {
    // open file picker
    const [fileHandle] = await window.showOpenFilePicker();
    // get file contents
    const fileData = await fileHandle.getFile();
    const text = await (new Response(fileData)).text();
    const temp = JSON.parse(text);
    setFilterBlocks(temp)
  }
  const ChooseSort = () => {
    chooseSort(document.getElementById("sortselect").value)
  }

  return (
    <div>
      <div className= "allFilterOptionFlex">
        <div className= "filterSettingsLeft">
          <div className= "trackbuttons">
            <div className= "filterSettings">
              <button className = "trackbuttonfill" onClick={trackFiles}>{importantBoolean === false ? "Start Tracking":"Stop Tracking"}</button>
            </div>
            <div className= "filterSettings">
              <label className= "importantLabel">JHSC Team</label>
              <label className= "importantLabel">Logs</label>
              <label className="switch">
                <input type="checkbox" id="important" onClick={importantLogs}/>
                <span className="slider"></span>
              </label>
            </div>

          </div>
        </div>
        
        <div className= "filterSettings">
          <div className= "trackbuttons">
            <button className = "trackbutton" onClick={addFilter}>Create Filter</button>
            <button className = "trackbutton" onClick={clearFilterBlocks}>Clear Filters</button>
          </div>

          <div className= "trackbuttons">
            <button className = "trackbutton" onClick={saveFile}>Save Filters</button>
            <button className = "trackbutton" onClick={getFile}>Select Filters</button>
          </div>
        </div>

        <div className='FilterBlocks'>
          <FilterList filterBlocks = {filterBlocks} deleteFilter = {deleteFilter} 
          filterSelect = {filterSelect} checkbox = {checkbox} andor = {andor} regex = {regex}/>
        </div>

      </div>

      <div className ="logFileEntries" >
        <div className ="logFileEntriesheader">
          <h2>Log File Entries</h2>
          <select className = "sort" onChange={ChooseSort} id="sortselect">
            <option value="Oldest">Oldest</option>
            <option value="Newest">Newest</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        
        <LogsList logs = {processLogs(logs, filterBlocks)} />
      </div>
    </div>
  )
}

export default LogFilter
