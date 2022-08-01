import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useStoreContext } from '../context/StoreContext'

const Header = () => {
    const { basket } = useStoreContext()
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
    return (
        <header>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">PizzaBox</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link className='pe-1' to="/"><i className='fas'>Home</i></Link>
                        <Link className='pe-1' to="/contact"><i className='fas'>Contact</i></Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Link className='pe-1' to='/basket'><i className='fas fa-shopping-cart'> Cart ({itemCount}) </i> </Link>
                        <Link className='pe-1' to="/login"><i className='fas fa-user'> Login </i> </Link>
                        <Link to="/register"><i className='fas fa-user'> Register</i></Link>
                    </Nav>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header