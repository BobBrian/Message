import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

export default function Login({ onIdSubmit }) {
  const idRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    onIdSubmit(idRef.current.value)// This gets the value of the control Idref and 
    // pass it to the {onIdSumbit} fucnction which is then passed to the <Login/> 
    // value in the App.js File.
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }

  return (
        //Here were Building a Login Template with bootstrap
        //So that it can be transfered to the App.js File
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}> {/* Sets the Page to the center*/} 
      <Form onSubmit={handleSubmit} className="w-100">  {/* Sets the Length of the Input Bar to fit the entire Page*/} 
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
                {/*Form.Label is used for Text , while Form.Control is used for things like input boxes  
                also required is there to make sure that entering the data is compulsry*/} 
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>   
        <Button type="submit" className="mr-2">Login</Button>
        <Button onClick={createNewId} variant="secondary">Create A New Id</Button>
      </Form>
    </Container>
  )
}