import React, { useEffect } from 'react'
import { Col, Row, ListGroup, Image } from 'react-bootstrap'
import { useState } from 'react'
import agent from '../../app/api/agent'
import { useParams } from 'react-router-dom'

const PizzaDetails = () => {

    const { id } = useParams();
    const [pizza, setPizza] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        agent.Store.details(parseInt(id))
            .then(response => setPizza(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <h3> Loading ....</h3>
    if (!pizza) return <h3> No Pizza</h3>
    return (
        <Row className='my-3'>
            <Col md={6}>
                <Image className='p-3' src={pizza.pictureUrl} alt={pizza.name} fluid />
            </Col>
            <Col md={3} className='p-3 m-2'>
                <ListGroup.Item>
                    <h1>{pizza.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3> Type: {pizza.type}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3> Crust: {pizza.crust}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Price: {pizza.price}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p> Description: {pizza.description}</p>
                </ListGroup.Item>

            </Col>
        </Row>
    )
}

export default PizzaDetails