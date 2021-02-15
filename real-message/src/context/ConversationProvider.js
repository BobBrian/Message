import React,{useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const ConversationsContext = React.createContext()

export function useConversations(){
    //This is a Quick Shorthand so that we can use our Contacts
    //Essetnially usecontext is for passing down props withouth having to manully implementing them
    return useContext(ConversationsContext)
}

export function ConversationsProvider({id, children}) {

    const[conversations,setConversations] = useLocalStorage('conversations',[]) // This will be the Array that ALL the conversation
    // information will be stored in

    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0); // This State is used to Store Information on SELECTED Conversation

    const { contacts } = useContacts()

    //this fucntion below deals specifically with creating our contacts
    function createConversation(recipients){
        setConversations(prevConversations =>{
            return[...prevConversations,{recipients, message : []}]
        })
    }

    function addMessageToConversation({recipients, text, sender})
    {
        // first we need to get out previous conversations and determine if any changes have been made ie an empty conversation
        // having new text
        setConversations(prevConversations =>{
            let madeChange = false
            const newMessage = {sender , text}
            const newConversations = prevConversations.map

            (conversations =>{
                // next we are trying to determine if our recipents aarray matches the recipents array of any previous conversation
                // the function arrayEquality simply takes 2 arrays and sees if they are the same
                if (arrayEquality(conversation.recipients, recipient))
                {
                    madeChange = true


                    // what happens here is that it returns our conversations i.e our previous messages and adds our new messages at the end
                    return{...conversations,message:conversations.messages, newMessage
                    }
                }
                 return conversations
            })

            if(madeChange){
                return conversations
            }else{
               return[...prevConversations, 
                {recipients, messages: [newMessage]}

             ] 
            }
        })
    }

    function sendMessage({recipients, message})
    {
        // this is here to call the addmessage fucntion to forward any of our messages
        // bey adding it to value we can export it out
        addMessageToConversation({recipients, text , sender: id})
    }

    const formattedConversations = conversations.map((conversation, index) =>{
        // This is to show and Display the Information of those we are having a Conversation with
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                // This is to check whether or not an enterd contact exist on not when searching through a list of them
                // And if it does then it is displayed , but this is purely for the ID
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient
            // this will display the names but those will be visiable in the page elements
            return { id: recipient, name }
        })
        // this will allow us to see exactly who sent messages meaning that it will display the names directly on the page
        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                
                return contact.id === message.sender
            })
            // this set messages to either us or another sender
            const name = (contact && contact.name) || message.sender
            // this is to display If the User sent the message themselves
            const fromMe = id === message.sender
            return{...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex // Becomes an Identifyer to Tell us whether or Not a Conversation is Selected
        // Basically it to Highlight it. 

        return {...conversation, messages, recipients , selected} // when we access messages we can access the Sendername and
        // formMe Properties
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation : formattedConversations 
        [selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    function arrayEquality( a , b){
        if (a.length !== b.length) return false

        a.sort()
        b.sort()

        return a.every((element, index) =>{
            // we loop trough all elemets of a to see if they are exactly equal to every element in b
            // at the exact same index position
            return element === b[index]
        })
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



