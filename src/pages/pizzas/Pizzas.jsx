import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import agent from '../../app/api/agent'
import PizzaCard from './PizzaCard'

const Pizzas = (props) => {
    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        agent.Store.list().then(pizzas => setPizzas(pizzas))
    }, [])
    return (

        <Row className='m-1'>
            {
                pizzas.map((pizza) => (
                    <Col key={pizza.id} sm={12} md={6} lg={4} xl={3}>
                        <PizzaCard pizza={pizza} />
                    </Col>
                ))
            }
        </Row>
    )
}

export default Pizzas