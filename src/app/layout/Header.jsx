import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">PizzaBox</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="#home"><i className='fas fa-shopping-cart'> Cart</i></Nav.Link>
                        <Nav.Link href="#features"><i className='fas fa-user'> Login</i></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header