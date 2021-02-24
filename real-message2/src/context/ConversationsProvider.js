import React , { useContext, useEffect, useState, useCallback }from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext()

export function useConversations(){
    
    return useContext(ConversationsContext)
}

export function ConversationsProvider({id, children}) {

    const[conversations,setConversations] = useLocalStorage('conversations',[]) 
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0); 
    const { contacts } = useContacts()
    const socket = useSocket()

    function createConversation(recipients){
        setConversations(prevConversations =>{
            return[...prevConversations,{recipients, messages: []}]
        })
    }

    const addMessageToConversation = useCallback(({recipients, text , sender}) => {
        // first we need to get  previous conversations and determine if any changes have been made
        // for example an empty conversation having new text
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text}
            const newConversation = prevConversations.map(
                conversation => {
                    //next we try and determine if our recipients array matches the recipients array of any previous conversations
                    if (arrayEquality(conversation.recipients, recipients))
                    {

                        madeChange = true
                        // what happens here is that if a change has been made our previous message is returned as well as our
                        // new Message
                        return{
                            ...conversation,
                            messages: [...conversation.messages, newMessage]
                        }
                    }

                    return conversation
                })

            if (madeChange) {
                return newConversation

            } else {
                return [
                    ...prevConversations,
                    {recipients, messages: [newMessage] 
                }]
            }
        })

    },[setConversations])

    useEffect(() => {

        //
        //
        if (socket == null) return

        socket.on('receive-message', addMessageToConversation) // allows for the message sent to the other page to be displayed

        return () => socket.off('receive-message') 

    },[socket , addMessageToConversation])

    function sendMessage(recipients, text){
        socket.emit('send-message',{ recipients, text}) // grants us access to our socket , allowing us to emit messages to another page

        //this here to call the addmessage function forward to any of our messages
        //by adding it to value we can export it out.
        addMessageToConversation({recipients, text , sender: id})

    }

    const formattedConversations = conversations.map((conversation,index) => {
        //This is to show and Display the Information of those we are having a Conversation With
        const recipients = conversation.recipients.map(recipient => {
          const contact = contacts.find(contact => {
              //This is to check whether or not an entered contact exists or not when searching through a list
              //of them and if it does then it is displayed, but this is purley for the Id
            return contact.id === recipient
          })
          // this will allow us to see who exactly sent a message meaning there names are also going to be Displayed
          const name = (contact && contact.name) || recipient
          return { id: recipient, name}
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return {...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex
        return{ ...conversation,messages, recipients, selected}
    
    })

    const value = 
    {
        conversations: formattedConversations,
        selectedConversation: formattedConversations
        [selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )

    
}

function arrayEquality(a,b){
    if (a.length !== b.length) return false

    a.sort()
    b.sort()
  
    return a.every((element, index) => {
      return element === b[index]
    })
}