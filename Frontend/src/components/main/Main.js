import React from 'react'
import LogInput from '../log_input/LogInput'
import LogFilter from '../log_filter/LogFilter'

const Main = ({chosenTab, savedLogs, logs}) => {

    if (chosenTab === "LogInput"){
        return (
            <>
            <LogInput savedLogs = {savedLogs}/>
            </>
          )
    } else if (chosenTab === "Filter"){
        return(
            <>
            <LogFilter logs = {logs}/>
            </>
        )
    } else {
        return (
            <div>
                Create and select a tab
            </div>
           
          )
    }

}

export default Main