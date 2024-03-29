import React, { useState } from 'react'
import { Row } from 'react-bootstrap';
import Option from './Option';

const Size = () => {
    const data = [
        { name: "Small", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
        { name: "Medium", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
        { name: "Large", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80" }];
    const [sizes, setSizes] = useState(data);
    const [next, setNext] = useState(`/toppings`);

    return (
        <Row className='m-3' sm={12} md={6} lg={4} xl={4}>
            {
                sizes.map((crust) => (
                    <Option key={crust.name} item={crust} next={next} />
                ))
            }
        </Row>

    )
}

export default Size