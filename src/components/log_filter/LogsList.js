import React from 'react'
import Log from "./Log"


const FilteredList = ({logs}) => {
  return (
    <div className = "FilterList">
      {logs.map(log => {
        return <Log key = {log.id} log = {log}/>
      })}
  </div>
  )
}

export default FilteredList