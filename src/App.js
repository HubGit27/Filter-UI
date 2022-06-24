import React, {useState} from 'react';
import Header from './components/main/Header'
import LogInput from './components/log_input/LogInput'
import Main from './components/main/Main'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const[tabs, setTabs] = useState([])
  const[chosenTab, setChosenTab] = useState("none")
  const[savedLogs, setSavedLogs] = useState([])


  //chooseTab
  const chooseTab = (tab) => {
    setChosenTab(tab)
  }

  const addTab = (e) => {
    setTabs([...tabs, {name:e, id: uuidv4()}])
  }

  const deleteTab = (id) => {
    const newTabs = tabs.filter((tabs) => tabs.id !== id);
    setTabs(newTabs)
  }

  const saveLogs = (logs) =>{
    setSavedLogs(logs)
    console.log(savedLogs)
  }

  return (
    <>
    <Header tabs = {tabs} chosenTab = {chooseTab} addTab = {addTab} deleteTab = {deleteTab}/>
    <Main chosenTab = {chosenTab} savedLogs = {saveLogs} logs = {savedLogs}/>
    </>
  );
}

export default App;
