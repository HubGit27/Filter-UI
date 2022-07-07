import React from 'react'
import './log_input.css';


const Log = ({log}) => {
  return (
    <div className="log">{log.log}</div>
  )
}

export default Log //Goes to LogOutput.js