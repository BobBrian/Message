import React,{useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations(){
    //This is a Quick Shorthand so that we can use our Contacts
    //Essetnially usecontext is for passing down props withouth having to manully implementing them
    return useContext(ConversationsContext)
}

export function ConversationsProvider({children}) {

    const[conversations,SetConversations] = useLocalStorage('conversations',[]) // This will be the Array that all the conversation
    // information will be stored in

    const { contacts } = useContacts()

    //this fucntion below deals specifically with creating our contacts
    function createConversation(recipients){
        SetConversations(prevConversations =>{
            return[...prevConversations,{recipients, message : []}]
        })
    }

    const formattedConversations = conversations.map(conversations =>{
        // This is to show and Display the Information of those we are having a Conversation with
        const recipients = conversations.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                // This is to check whether or not an enterd contact exist on not when searching through a list of them
                // And if it does then it is displayed , but this is purely for the ID
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            // This is for  Physically Displaying the Name of the Searched Contact , if it has a Name Associated with the ID , then 
            // That to will be Displayed but if not then just the ID number , Think How in Whatsapp if you add a Someone there
            // but don't have them as a Contact then only there Phone Number will be Displayed.
            return { id: recipient, name }
        })
        return {...conversations, recipients}
    })

    const value = {
        conversations: formattedConversations,
        createConversation
    }

    return (
        //The Provider is used to wrap around any code that needs access to the infomation in the context as shown in the App.js File
        // It has a Single Prop called value which represent what the context is.
        //Via the Provider we have access to the createContact function
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}



