import React from 'react';
import { TiDelete } from "react-icons/ti";

const Tab = ({tab, chosenTab, deleteTab}) => {

  return (
    <button className="tab" onClick={() => chosenTab(tab.name)}>{tab.name} 
        <TiDelete onClick={() => deleteTab(tab.id)}/>
    </button>
  )
}

export default Tab