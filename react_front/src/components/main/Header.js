import React from 'react';
import Tab from './Tab'
import '../../index.css';

const Header = ({tabs, chosenTab, addTab, deleteTab}) => {

  return (
  <>
    <header>
      <h1>System Controller Team Demo</h1>
    </header>
    <div className="tabs">
      <form className="tab">
        <label className="add" onClick={() => addTab(document.getElementById('selection')[document.getElementById('selection').selectedIndex].value)}> + </label>  
          <select className="list" id = "selection">  
            <option value = "LogInput"> LogInput</option>  
            <option value = "Filter">Filter</option>
          </select>  
      </form>
      {tabs.map(tab => {
          return <Tab key = {tab.id} tab={tab} chosenTab={chosenTab} deleteTab = {deleteTab}/>
      })}
    </div>
    <hr></hr>
  </>
   
  )
}

export default Header // Goes to App.js