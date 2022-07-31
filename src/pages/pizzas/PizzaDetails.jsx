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
            <Col md={3}>
                <ListGroup.Item>
                    <h2>{pizza.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p>{pizza.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h1>{id}</h1>
                </ListGroup.Item>
            </Col>
        </Row>
    )
}

export default PizzaDetails