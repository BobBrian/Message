import React,{useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations(){
    //This is a Quick Shorthand so that we can use our Contacts
    //Essetnially usecontext is for passing down props withouth having to manully implementing them
    return useContext(ConversationsContext)
}

export function ConversationsProvider({children}) {

    const[conversations, setConversations] = useLocalStorage('conversations',[]) 
    // This will be the Array that all the contact information will be stored in
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0); 
    // This State is used to Store Information on SELECTED Conversation
    const { contacts } = useContacts()

    //this fucntion below deals specifically with creating our contacts
    function createConversation(recipients)
    {
        setConversations(prevConversations =>{
            return[...prevConversations,{recipients, messages : []}]
        })
    }

    return (
        //The Provider is used to wrap around any code that needs access to the infomation in the context as shown in the App.js File
        // It has a Single Prop called value which represent what the context is.
        //Via the Provider we have access to the createContact function
        <ConversationsContext.Provider value={{contacts, createConversation}}>
            {children}
        </ConversationsContext.Provider>
    )
}

