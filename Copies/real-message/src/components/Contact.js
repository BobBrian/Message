import React from 'react'
import {useContacts} from '../context/ContactsProvider'
import {ListGroup} from 'react-bootstrap'

function Contact() {
    // Were going to make it possible for our contacts to be Displayed on the Screen
    const {contacts} = useContacts() // Gives us access to our Contacts


    return (
        <ListGroup variant="flush">
            {contacts.map(contact =>(
                <ListGroup.Item key={contact.id}>  {/*Prevention of Duplicate ID's*/}
                    {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default Contact
