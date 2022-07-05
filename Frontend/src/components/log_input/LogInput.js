import React, {useState, useEffect, useRef} from 'react'
import LogList from './LogList'
import { v4 as uuidv4 } from 'uuid';
import Search from './Search'
import './log_input.css';
import axios from "axios";


const LogInput = ({savedLogs}) => {
    const[logs, setLogs] = useState(localStorage.LogInputlogs ? JSON.parse(localStorage.LogInputlogs) : [])

    useEffect(() => {
        localStorage.setItem('LogInputlogs', JSON.stringify(logs))
    }, [logs])

    const run = () => {
        const log = document.getElementById("logtext")
        const logg = log.value.split("\n")
        const newLogs = [...logs]
        for (let i = 0; i < logg.length; i++) {
            if (logg[i] !== "") {
                newLogs.push({id: uuidv4(), log:logg[i]})
            }
        }
        setLogs(newLogs)
        savedLogs(newLogs)
    }

    const clear = () => {
        setLogs([])
        savedLogs([])
    }
    
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const bool = useRef(false);

    const auto = async () => {
        for (let i = 0; i < 5; i++) {
        await delay(1000);
        backendLog()
        }
    }

    const backendLog = async () => {
        axios.get("/logs").then(response =>{
            let templog = response.data
            templog.id = uuidv4()
            setLogs([...logs, templog])
            savedLogs([...logs, templog])
        })
    }

    //Search Bar
    const[searchText, setSearchText] = useState("")

    return (
        <>
        <div className='logInput'>
            <textarea id= "logtext" rows = "4" cols = "50" placeholder='Paste logs here...'/>
        </div>
        <div className='buttonarea'>
            <button className='button' onClick={run}> Run</button>
            <button className='button' onClick={clear}> Clear </button>
            <button className='button' onClick={() => auto()}> Auto </button>
            <button className='button' onClick={() => bool.current = false}> Stop </button>

        </div>
        <div>
            <Search searchText = {setSearchText}/>
            <LogList logs = {logs.filter((log) =>
						log.log.toLowerCase().includes(searchText)
					)} searchText = {searchText}/>
        </div>
        </>

  )
}

export default LogInput //Goes to App.js