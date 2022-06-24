import React from 'react'
import Log from "./Log"


const FilteredList = ({logs}) => {
  return (
    <div>
      {logs.map(log => {
        return <Log key = {log.id} log = {log}/>
      })}
  </div>
  )
}

export default FilteredList