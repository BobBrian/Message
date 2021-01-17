import React, {useState} from 'react'
import Login from './Login'

function App() {

  // stores all the state for the Id that is shared all accross the application
  const [id, setId] = useState()

  return (
      
        <Login onIdSubmit={setId}/>
      
  )
}

export default App

