import React, { useState } from 'react'
import { Row } from 'react-bootstrap';
import Option from './Option';

const Toppings = () => {
    const data = [
        { name: "Peperoni", image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
        { name: "mushrum", image: "https://images.unsplash.com/photo-1552825897-bb5efa86eab1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
        { name: "cheese", image: "https://images.unsplash.com/photo-1566843971939-1fe9e277a0c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" }];
    const [toppings, setToppings] = useState(data);
    const [next, setNext] = useState(`/custum`);

    return (
        <Row className='m-3' sm={12} md={6} lg={4} xl={4}>
            {
                toppings.map((topping) => (
                    <Option key={topping.name} item={topping} next={next} />
                ))
            }
        </Row>

    )
}

export default Toppings