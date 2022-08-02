import React from 'react'
import {MdDeleteOutline} from "react-icons/md";
import './log_filter.css';


const Filter = ({filter, deleteFilter, filterSelect, checkbox, andor, regex}) => {

  const filterByText = () => {
    var index = document.getElementById('filterByText'+filter.id).value;
    console.log(index)
    filterSelect(index, filter.id)
  }
  const check = () =>{
    checkbox(filter.id)
  }

  const and = () =>{
    andor("and", filter.id)
  }

  const or = () =>{
    andor("or", filter.id)
  }

  const Regex = () => {
    regex(filter.id)
  }

//{(filter.checkbox) ? 'defaultChecked': null}

  return (
    <div className="log">
        <input type="checkbox" onClick = {check} defaultChecked={filter.checkbox}/>
        <input type="radio" id = "and" name={"andor" + filter.id} onClick= {and} defaultChecked={filter.andor === "and" ? true : false}/>
        <label>and </label>
        <input type="radio" id = "or" name={"andor" + filter.id} onClick= {or} defaultChecked={filter.andor === "or" ? true : false}/>
        <label>or </label>
        <input type="text" className="list" id = {"filterByText"+filter.id} onChange = {filterByText} value={filter.filterBy === "" ? "" : filter.filterBy}/>
        <label> regex </label>
        <input type="checkbox" onClick = {Regex} defaultChecked={filter.regex}/>
        <button className = "deleteButton" onClick={() => deleteFilter(filter.id)}>
        <MdDeleteOutline/>
        </button>
        
    </div>
  )
}

export default Filter