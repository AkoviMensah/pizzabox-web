import React from 'react'
import { Button, Card } from 'react-bootstrap'

const Pizza = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href="google.com">
                <Card.Img variant="top" src={product.pictureUrl} />
            </a>
            <h6>{product.name + "  " + product.price} </h6>
            <Button>Add to card</Button>
        </Card>
    )
}

export default Pizza