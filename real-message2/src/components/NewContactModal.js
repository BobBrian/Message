import React, {useRef} from 'react'
import {Modal , Form, Button} from 'react-bootstrap'
import {useContacts} from '../context/ContactsProvider'

function NewContactModal({closeModal}) {

    const idRef = useRef()
    const nameRef = useRef()
    const {createContact} = useContacts()

    function handleSumbit(e){
        e.preventDefault()

        // CreateContact Used to Pass on Information we enter via the Contact Modal
        createContact(idRef.current.value,nameRef.current.value)
        closeModal()
    }

    return (
        <>
            <Modal.Header closeButton>Create New Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSumbit}>
                        {/*Bootstrap Code used to Construct the Fields where Data will be Entered*/}
                        <Form.Group>
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" ref={idRef} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required/>
                        </Form.Group>
                        <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default NewContactModal
