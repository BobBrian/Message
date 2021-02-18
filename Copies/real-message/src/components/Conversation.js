import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'

function Conversation() {
    const { conversations , selectConversationIndex } = useConversations()

    return (
        <ListGroup variant="flush">
            {/*Since Conversations do not have ID's we Use the Index Instead*/}
            {conversations.map((conversation,index) =>(
                <ListGroup.Item 
                key={index}
                action
                onClick={() => selectConversationIndex(index)} // This Allows us to Idenify which Conversation is Selected
                active={conversation.selected} // Allows us to Click on and Open our Conversation
                >
                     {/*This is where the Actual Conversation will be Rendered and Saved*/}
                    {conversation.recipients.map(r => r.name).join(',')} 
                    {/*What this does is that it takes all the names of recicpents that where provided in the Conversation Provider
                      and dispalys them on the sidebar*/}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default Conversation
