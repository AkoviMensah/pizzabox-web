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

        <Row>
            {
                pizzas.map((pizza, index) => (
                    <Col>
                        <PizzaCard key={index} pizza={pizza} /></Col>
                ))
            }
        </Row>
    )
}

export default Pizzas