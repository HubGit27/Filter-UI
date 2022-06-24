import React from 'react'
import {MdDeleteOutline} from "react-icons/md";

const Filter = ({filter, filters, deleteFilter, filterSelect, checkbox, andor}) => {

  const filterBy = () => {
    filterSelect(document.getElementById("filterSelection").options[document.getElementById("filterSelection").selectedIndex].text, filter.id)
  }
  const check = () =>{
    checkbox(filter.id)
  }

  const andOr = () =>{
    if(document.getElementById('and').checked == true) {
      andor("and", filter.id)
    }else if(document.getElementById('or').checked == true) {
      andor("or", filter.id)
    }
    
  }

  return (
    <div className="log">
        <input type="checkbox" onClick = {check}/>
        <input type="radio" id = "and" name={"andor" + filter.id} onClick= {andOr} defaultChecked/>
        <label>and </label>
        <input type="radio" id = "or" name={"andor" + filter.id} onClick= {andOr}/>
        <label>or </label>
        <select className="list" id = "filterSelection" onChange = {filterBy}>  
            {filters.map((e) => <option key = {e.id} >{e.name}</option>)}
        </select>

        <div>
          <button onClick={() => deleteFilter(filter.id)}>
          <MdDeleteOutline/>
          </button>
        </div>
    </div>
  )
}

export default Filter