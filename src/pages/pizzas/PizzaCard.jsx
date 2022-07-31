import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PizzaCard = ({ pizza }) => {
    return (
        <Card className='my-3 rounded'>
            <Link to={`/pizza/${pizza.id}`}>
                <Card.Img variant="top" src={pizza.pictureUrl} />
            </Link>
            <h6>{pizza.name + "  " + pizza.price} </h6>
            <Button>Add to card</Button>
        </Card >
    )
}

export default PizzaCard