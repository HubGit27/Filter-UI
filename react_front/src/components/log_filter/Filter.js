import React from 'react'
import {MdDeleteOutline} from "react-icons/md";
import './log_filter.css';


const Filter = ({filter, filters, deleteFilter, filterSelect, checkbox, andor, regex}) => {

  const filterBy = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    filterSelect(event.nativeEvent.target[index].text, filter.id)
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
        <select className="list" id = "filterSelection" onChange = {filterBy}>  
          <option selected disabled hidden>Select Filter</option>
            {filters.map((e) => <option selected={filter.filterBy === e.name ? true : false} key = {e.id} >{e.name}</option>)}
        </select>
        <label> regex </label>
        <input type="checkbox" onClick = {Regex} defaultChecked={filter.regex}/>
        
        <button className = "deleteButton" onClick={() => deleteFilter(filter.id)}>
        <MdDeleteOutline/>
        </button>
        
    </div>
  )
}

export default Filter