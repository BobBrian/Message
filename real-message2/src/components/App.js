import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { ContactsProvider } from '../context/ContactsProvider';
import DashBoard from './DashBoard';
import Login from './Login'

function App() {
  // stores all the state for the Id that is shared all accross the application
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
        <DashBoard id={id}/>
    </ContactsProvider>
  )

  
  return(

    id ? dashboard : <Login onIdSubmit={setId}/> //Basically if we have an ID we will be Redirected to the DashBaord and If not
         //we will be redirected to the login page
  )
}

export default App

