import React,{useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactsContext = React.createContext()

export function useContacts(){
    //This is a Quick Shorthand so that we can use our Contacts
    //Essetnially usecontext is for passing down props withouth having to manully implementing them
    return useContext(ContactsContext)
}

export function ContactsProvider({children}) {

    const[contacts,SetContacts] = useLocalStorage('contacts',[]) // This will be the Array that all the contact information will be stored in

    //this fucntion below deals specifically with creating our contacts
    function createContact(id,name){
        SetContacts(prevContacts =>{
            return[...prevContacts,{id, name}]
        })
    }

    return (
        //The Provider is used to wrap around any code that needs access to the infomation in the context as shown in the App.js File
        // It has a Single Prop called value which represent what the context is.
        //Via the Provider we have access to the createContact function
        <ContactsContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    )
}


