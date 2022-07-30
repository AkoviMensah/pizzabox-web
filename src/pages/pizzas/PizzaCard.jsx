import React from 'react'
import { Button, Card } from 'react-bootstrap'

const PizzaCard = ({ pizza }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href="##">
                <Card.Img variant="top" src={pizza.pictureUrl} />
            </a>
            <h6>{pizza.name + "  " + pizza.price} </h6>
            <Button>Add to card</Button>
        </Card>
    )
}

export default PizzaCard