import React from 'react'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
    return (
        <Form className='m-3'>
            <Form.Group className="m-2" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    Include Letters and numbers
                </Form.Text>
            </Form.Group>

            <Form.Group className="m-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="m-2" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Stay login" />
            </Form.Group>
            <Button className="m-2" variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default Login