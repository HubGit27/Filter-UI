import React, {useState, useEffect} from 'react';
import Header from './components/main/Header'
import Main from './components/main/Main'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const[tabs, setTabs] = useState(localStorage.TABSAPP ? JSON.parse(localStorage.TABSAPP) : [])
  const[chosenTab, setChosenTab] = useState(localStorage.CHOSENTABAPP ? JSON.parse(localStorage.CHOSENTABAPP) : "none")
  const[savedLogs, setSavedLogs] = useState(localStorage.SAVEDLOGSAPP ? JSON.parse(localStorage.SAVEDLOGSAPP) : [])

  useEffect(() =>{
    localStorage.setItem('TABSAPP', JSON.stringify(tabs))
  }, [tabs])

  useEffect(() =>{
    localStorage.setItem('CHOSENTABAPP', JSON.stringify(chosenTab))
  }, [chosenTab])

  useEffect(() =>{
    localStorage.setItem('SAVEDLOGSAPP', JSON.stringify(savedLogs))
  }, [savedLogs])

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
