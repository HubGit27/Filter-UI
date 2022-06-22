import React, {useState, useEffect} from 'react'
import LogOutput from './LogOutput'
import { v4 as uuidv4 } from 'uuid';
import Search from './Search'
import '../index.css';


const LOCAL_STORAGE_KEY = 'LogInput.logs'

const LogInput = () => {
    const[logs, setLogs] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(logs))
    }, [logs])

    const run = () => {
        const log = document.getElementById("logtext")
        const logg = log.value.split("\n")
        const newLogs = [...logs]
        for (let i = 0; i < logg.length; i++) {
            if (logg[i] != "") {
                newLogs.push({id: uuidv4(), log:logg[i]})
            }
        }
        setLogs(newLogs)
    }

    const clear = () => {
        setLogs([])
    }

    //Search Bar
    const[searchText, setSearchText] = useState("")

    return (
        <>
        <div className='logInput'>
            <textarea id= "logtext" rows = "4" cols = "50" placeholder='Paste logs here...'/>
        </div>
        <div className='button'>
            <button onClick={run}> Run</button>
            <button onClick={clear}> Clear </button>
        </div>
        <div>
            <Search searchText = {setSearchText}/>
            <LogOutput logs = {logs.filter((log) =>
						log.log.toLowerCase().includes(searchText)
					)} searchText = {searchText}/>
        </div>
        </>

  )
}

export default LogInput //Goes to App.js