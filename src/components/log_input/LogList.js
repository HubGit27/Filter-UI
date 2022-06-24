import React from 'react'
import Log from './Log'
import '../../index.css';



const LogList = ({logs}) => {

  return (
    <div>
      {logs.map(log => {
        return <Log key ={log.id} log={log} />
    })}
    </div>
    
  )
}

export default LogList //Goes into LogInput.js