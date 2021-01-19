import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import DashBoard from './DashBoard';
import Login from './Login'

function App() {

  // stores all the state for the Id that is shared all accross the application
  const [id, setId] = useLocalStorage()

  return(

         id ? <DashBoard id={id}/> : <Login onIdSubmit={setId}/> //Basically if we have an ID we will be Redirected to the DashBaord and If not
         //we will be redirected to the login page
  )
}

export default App;

