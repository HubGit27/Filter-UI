import React, {useState, useEffect} from 'react';
import Header from './components/main/Header'
import LogFilter from './components/log_filter/LogFilter';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function App() {

  const[savedLogs, setSavedLogs] = useState(localStorage.SAVEDLOGSAPP ? JSON.parse(localStorage.SAVEDLOGSAPP) : [])

  useEffect(() =>{
    localStorage.setItem('SAVEDLOGSAPP', JSON.stringify(savedLogs))
  }, [savedLogs])

  const [runAuto, setRunAuto] = React.useState(true)

  const api = axios.create({
    baseURL: "http://localhost:5000"
  })

  React.useEffect(() => {
    const getLogs = () => {
        api.get("/logs").then((r) => { 
            for (let i = 0; i < r.data.length; i++){
                r.data[i].id = uuidv4()
                r.data[i].highlight = false
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
    api.post("/logs", {data:value})
    .then(res => {
      console.log(res)
    })
  }

  const importantLogs = (boo) => {
    api.post("/logs", {data:boo})
    .then(res => {
      console.log(res)
    })
  }

  return (
    <>
    <Header />
    <LogFilter logs = {savedLogs} trackLogs = {(boo) => setRunAuto(boo)} chooseSort = {(value) => changeSort(value)} important = {(boo) => importantLogs(boo)}/>
    </>
  );
}

export default App;
