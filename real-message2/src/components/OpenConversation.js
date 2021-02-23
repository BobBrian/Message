import React, { useState, useCallback } from 'react'
import { Form , InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../context/ConversationsProvider'

function OpenConversation() {

    const [text, setText] = useState('') // State to store all text Messages

    const setRef = useCallback( node => {
        if(node){
            // the usecallback is used to return a memorized version of a callback function 
            // which in this case is scrollintoview
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const { sendMessage , selectedConversation } = useConversations()

    function handleSubmit(e) {
        e.preventDefault()
        
        sendMessage (
            // this ensures the recipent data is sent with the sent message
            selectedConversation.recipients.map(r => r.id),text
            // used to actually send the Data that is gotten form the Conversation Provider

        )
        setText('')// Used to clear the text Box so that another message can be sent
        
    }

    // for the divs the flex-column Determines whether the Message is form the User and if it is , Diplay there Name change the Text box to Blue and Alignes it to the Right 
    // the text-muted small Determines if a Message if form the User and if is not it is diaplyed in white and Aligned to the Left 

    return (
        <div className="d-flex flex-column flex-grow-1" >
            <div className="flex-grow-1 overflow-auto">
                 {/* Now that we have ensures our Message are goign to appear on the fornt page we have to implement them */}
               <div className="h-100 d-flex flex-column align-items-start justify-content-end px-3">
                   {/*Code to Display Our Message on the Screen Rather than Only in the Page Elements*/}
                    {selectedConversation.messages.map((message, index) => {

                        const lastMessage = selectedConversation.messages.length - 1 === index
                    return (
                        
                        <div
                            
                            ref={lastMessage ? setRef : null}
                            key={index}
                            className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : ' '}`}>
                            
                            <div
                            className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                            {message.text}
                            </div>
                            <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                            {message.fromMe ? 'You' : message.senderName}
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                            <InputGroup>
                                <Form.Control
                                    as="textarea"
                                    required 
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    style= {{height : '75px', resize: 'none'}}
                                />
                                <InputGroup.Append>
                                    <Button type="submit">Send</Button>
                                </InputGroup.Append>
                            </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation
