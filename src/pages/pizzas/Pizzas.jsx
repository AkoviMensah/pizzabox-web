import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import PizzaCard from './PizzaCard'

const Pizzas = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/pizzas')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    return (

        <Row>
            {
                products.map((product, index) => (
                    <Col>
                        <PizzaCard key={index} product={product} /></Col>
                ))
            }
        </Row>
    )
}

export default Pizzas