import React from 'react'


const Log = (log) => {
  // console.log(log)
  return (
    <div className= {log.log.highlight === true ? "hlogentry" : "logentry"}
     >{log.log.log}</div>
  )
}

export default Log