import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">PizzaBox</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/cart"><i className='fas fa-shopping-cart'> Cart</i></Nav.Link>
                        <Nav.Link href="/login"><i className='fas fa-user'> Login</i></Nav.Link>
                        <Nav.Link href="/register"><i className='fas fa-user'> Register</i></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header