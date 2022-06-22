import React from 'react'
import Log from './Log'
import '../index.css';



const LogOutput = ({logs}) => {

  return (
    <div>
      {logs.map(log => {
        return <Log key ={log.id} log={log} />
    })}
    </div>
    
  )
}

export default LogOutput //Goes into LogInput.js