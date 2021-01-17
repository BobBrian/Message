import React, { useRef } from 'react'
import { Container, Form , Button } from 'react-bootstrap';

function Login({onIdSumbit}) {
    // IdRef is uesed to refrence the input control and get its value when we submit data to the form
    const idRef = useRef()

    //The Function below activates whenever we submit data
     function handleSubmit(e)
     {
         e.preventDefault() // ensures the page does not refresh

         onIdSumbit(idRef.current.value) // This gets the value of the control Idref and 
         // pass it to the {onIdSumbit} fucnction which is then passed to the <Login/> 
         // value in the App.js File.
     }

    return (
        //Here were Building a Login Template with bootstrap
        //So that it can be transfered to the App.js File
        <Container className="align-items-center d-flex" style={{height:'100vh'}}> {/* Sets the Page to the center*/} 
            
            <Form onSubmit={handleSubmit} className="w-100"> {/* Sets the Length of the Input Bar to fit the entire Page*/} 
                <Form.Group>
                    <Form.Label>Please Enter Your ID</Form.Label>

                    {/*Form.Label is used for Text , while Form.Control is used for things like input boxes
                     also required is there to make sure that entering the data is compulsry*/} 
                    <Form.Control type="text" ref={idRef} required/>
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button variant="secondary">Create a New Id</Button>
            </Form>
        </Container>
    )
}

export default Login
