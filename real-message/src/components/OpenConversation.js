import React, { useState } from 'react'
import { Form , InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../context/ConversationProvider'

function OpenConversation() {

    const [text, setText] = useState('') // State to store all text Messages

    const { sendmessage, selectedConversation } = useConversations()

    function handleSubmit(e) {
        e.preventDefault()
        
        sendmessage (selectedConversation.recipient.map(r=>r.id),
            // this ensures the recipent data is sent with the sent message
            text
        ) // used to actually send the Data that is gotten form the Conversation Provider
        setText('') // clears the text Box so that another message can be sent
    }

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                {/* Now that we have ensures our Message are goign to appear on the fornt page we have to implement them */}
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {/*Code to Display Our Message */}
                    {selectedConversation.message.map((message, index) =>{

                        return (
                        <div key={index} className={`my-1 d-flex flex-column ${message.formMe ? 'align-self-end': ''}`}>
                            <div className={`rounded px-2 py-1 ${message.form ? 'bg-primary text-white' : 'border'}`}>
                                {message.text}
                            </div>
                            <div className={`text-muted small ${message.formMe ? 'text-right': ''}`}>
                                {message.formMe ? 'You': message.senderName}
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
                                required value={text}
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
