import { Button } from '@mui/material'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SignedInMenu from './SignedInMenu'

const Header = () => {
    const { user } = useSelector(state => state.account);
    const { basket } = useSelector(state => state.basket)
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
                        <Button variant='contained' color='secondary' className='me-1'>
                            <Link className='pe-1' to='/crust'>Customize </Link>
                        </Button>
                        <Button variant='contained' className='me-1'>
                            <Link className='pe-1' to='/basket'><i className='fas fa-shopping-cart'> <sub>{itemCount}</sub> </i> </Link>
                        </Button>
                        {
                            user ? (<SignedInMenu />) : (
                                <Container>
                                    <Link className='pe-1' to="/login"><i className='fas fa-user'> Login </i> </Link>
                                    <Link to="/register"><i className='fas fa-user'> Register </i></Link>
                                </Container>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header