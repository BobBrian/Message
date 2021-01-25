import React,{useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ConversationsContext = React.createContext()

export function useConversations(){
    //This is a Quick Shorthand so that we can use our Contacts
    //Essetnially usecontext is for passing down props withouth having to manully implementing them
    return useContext(ConversationsContext)
}

export function ConversationsProvider({children}) {

    const[conversations,SetConversations] = useLocalStorage('conversations',[]) // This will be the Array that all the conversation
    // information will be stored in

    //this fucntion below deals specifically with creating our contacts
    function createConversation(recipients){
        SetConversations(prevConversations =>{
            return[...prevConversations,{recipients, message : []}]
        })
    }

    return (
        //The Provider is used to wrap around any code that needs access to the infomation in the context as shown in the App.js File
        // It has a Single Prop called value which represent what the context is.
        //Via the Provider we have access to the createContact function
        <ConversationsContext.Provider value={{conversations, createConversation}}>
            {children}
        </ConversationsContext.Provider>
    )
}



