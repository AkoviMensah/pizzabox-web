import React from 'react'
import { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Pizza from './Pizza'

const Pizzas = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/pizzas')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <Container>
            <Row>
                {
                    products.map((product, index) => (
                        <Col>
                            <Pizza key={index} product={product} /></Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Pizzas