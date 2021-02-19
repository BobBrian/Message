import React, { useState } from 'react'
import {Modal , Form, Button} from 'react-bootstrap'
import {useContacts} from '../context/ContactsProvider'
import {useConversations} from '../context/ConversationsProvider'

function NewConversationModal({ closeModal }) {

    const [selectedContactIds, setSelectedContactIds] = useState([])
    const {contacts} = useContacts() // usage of the ContactProvider
    const {createConversation} = useConversations() // usage of the Conversation Provider

    function handleSumbit (e){
        e.preventDefault()

        createConversation(selectedContactIds)
        
        closeModal()
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            // first we determine if our contactId is already in the list
          if (prevSelectedContactIds.includes(contactId)) {
              // so if it is included we want to remove it
            return prevSelectedContactIds.filter(prevId => {
                 // Then we check if the previous id is equal to the contact Id
              return contactId !== prevId // here it keeps all the ids not equal to the contact id and removes the contact id that matches
            })
          } else {
              // this is to remove it form the list
            return [...prevSelectedContactIds, contactId]
          }
        })
    }

    return (
        <>  
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSumbit}>
                {/*The Purpose of this is to loop through contacts to get checkboxes*/}
                {contacts.map(contact =>(
                    <Form.Group controlId={contact.id} key={contact.id}>
                        <Form.Check
                            type="checkbox"
                            value={selectedContactIds.includes(contact.id)} // Becomes true or false based on wheter or not we have selected this contact id
                            label = {contact.name}
                            onChange ={() => handleCheckboxChange(contact.id)} // To idenify which contact we are working with
                        />
                    </Form.Group>
                ))}
                <Button type="submit">Create</Button>
            </Form>
        </Modal.Body>
    </>
    )
}

export default NewConversationModal
