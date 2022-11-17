import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import PizzaCard from './PizzaCard'
import { fetchPizzasAsync, pizzaSelectors } from './menuSlice'

const Pizzas = (props) => {
    const pizzas = useSelector(pizzaSelectors.selectAll);
    const { pizzasLoaded, status } = useSelector(state => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!pizzasLoaded) dispatch(fetchPizzasAsync());
    }, [pizzasLoaded, dispatch])

    if (status.includes('pending')) return <h1> Loading Pizzas</h1>
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