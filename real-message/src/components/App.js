import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import Login from './Login'

function App() {

  // stores all the state for the Id that is shared all accross the application
  const [id, setId] = useLocalStorage()

  return(
        <>
          {id}
          <Login onIdSubmit={setId}/>
        </>
  )
}

export default App;

