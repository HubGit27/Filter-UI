import React, {useState} from 'react';
import Header from './components/Header'
import LogInput from './components/LogInput'

function App() {
  const[tabs, setTabs] = useState([LogInput])
  const[chosenTab, setChosenTab] = useState(tabs[0])


  return (
    <>
    <Header tabs = {setTabs()} chosenTab = {chosenTab}/>
    <LogInput/>
    </>
  );
}

export default App;
