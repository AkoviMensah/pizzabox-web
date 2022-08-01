import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import agent from '../../app/api/agent'

const PizzaCard = ({ pizza }) => {
    const [loading, setLoading] = useState(false)

    function handleAddItem(pizzaId) {
        setLoading(true)
        agent.Basket.addItem(pizzaId)
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }
    return (
        <Card className='my-3 rounded'>
            <Link to={`/pizza/${pizza.id}`}>
                <Card.Img variant="top" style={{ maxHeight: '200px' }} src={pizza.pictureUrl} />
            </Link>
            <h6>{pizza.name + "  " + pizza.price} </h6>
            <Button onClick={() => handleAddItem(pizza.id)}>Add to card</Button>
        </Card >
    )
}

export default PizzaCard