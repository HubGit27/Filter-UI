import React from 'react'
import {MdDeleteOutline} from "react-icons/md";
import './log_filter.css';


const Filter = ({filter, filters, deleteFilter, filterSelect, checkbox, andor}) => {

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
  {console.log(filter)}



  return (
    <div className="log">
        <input type="checkbox" onClick = {check} {(filter.checkbox) ? 'defaultChecked': null}defaultChecked/>
        <input type="radio" id = "and" name={"andor" + filter.id} onClick= {and} defaultChecked/>
        <label>and </label>
        <input type="radio" id = "or" name={"andor" + filter.id} onClick= {or}/>
        <label>or </label>
        <select className="list" id = "filterSelection" onChange = {filterBy}>  
            {filters.map((e) => <option key = {e.id} >{e.name}</option>)}
        </select>

        
        <button className = "deleteButton" onClick={() => deleteFilter(filter.id)}>
        <MdDeleteOutline/>
        </button>
        
    </div>
  )
}

export default Filter