import React from 'react'

const LogInput = ({run, clear}) => {

  return (
    <div>
    <textarea rows = "4" cols = "50"/>
    <button onClick={run}> Run</button>
    <button onClick={clear}> Clear </button>
    </div>
  )
}

export default LogInput