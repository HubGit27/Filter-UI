import React, {useState, useEffect} from 'react';
import Header from './components/main/Header'
//import Main from './components/main/Main'
import LogFilter from './components/log_filter/LogFilter';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import axios from 'axios';


function App() {
  // const[tabs, setTabs] = useState(localStorage.TABSAPP ? JSON.parse(localStorage.TABSAPP) : [])
  // const[chosenTab, setChosenTab] = useState(localStorage.CHOSENTABAPP ? JSON.parse(localStorage.CHOSENTABAPP) : "none")
  const[savedLogs, setSavedLogs] = useState(localStorage.SAVEDLOGSAPP ? JSON.parse(localStorage.SAVEDLOGSAPP) : [])
  const[sort, setSort] = useState("")



  // useEffect(() =>{
  //   localStorage.setItem('TABSAPP', JSON.stringify(tabs))
  // }, [tabs])

  // useEffect(() =>{
  //   localStorage.setItem('CHOSENTABAPP', JSON.stringify(chosenTab))
  // }, [chosenTab])

  useEffect(() =>{
    localStorage.setItem('SAVEDLOGSAPP', JSON.stringify(savedLogs))
  }, [savedLogs])

  // const chooseTab = (tab) => {
  //   setChosenTab(tab)
  // }

  // const addTab = (e) => {
  //   setTabs([...tabs, {name:e, id: uuidv4()}])
  // }

  // const deleteTab = (id) => {
  //   const newTabs = tabs.filter((tabs) => tabs.id !== id);
  //   setTabs(newTabs)
  // }
  // const clearlogs = (id) => {
  //   setSavedLogs([])
  // }
  // const saveLogs = (logs) =>{
  //   setSavedLogs(logs)
  //   console.log(savedLogs)
  // }

  const [runAuto, setRunAuto] = React.useState(true)

  React.useEffect(() => {
    const getLogs = () => {
        Axios.get("/logs").then((r) => { 
            for (let i = 0; i < r.data.length; i++){
                r.data[i].id = uuidv4()
            }
            setSavedLogs(r.data)
        })
    }

    if (runAuto){
        const handle = setInterval(getLogs, 1000);

        return () => clearInterval(handle);
    }
  }, [runAuto])
  
  const changeSort = (value) => {
    axios.post("/logs", {data:value})
    .then(res => {
      console.log(res)
    })
  }

  //<Main chosenTab = {chosenTab} savedLogs = {saveLogs} logs = {savedLogs} runAuto = {(boo) => setRunAuto(boo)}/>
  return (
    <>
        {/* <button onClick={clearlogs}></button> */}

    <Header />
     {//tabs = {tabs} chosenTab = {chooseTab} addTab = {addTab} deleteTab = {deleteTab}
    }
    <LogFilter logs = {savedLogs} trackLogs = {(boo) => setRunAuto(boo)} chooseSort = {(value) => changeSort(value)}/>
    </>
  );
}

export default App;
