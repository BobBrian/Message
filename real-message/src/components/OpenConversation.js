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
