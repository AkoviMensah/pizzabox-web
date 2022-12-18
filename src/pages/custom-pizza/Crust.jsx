import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Option from './Option';

const Crust = () => {
    const [crusts, setCrusts] = useState([{ name: "Original", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
    { name: "Stuffed", image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
    { name: "Grilled", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80" }]);
    const [selected, setSelected] = useState(null);

    return (
        <Row className='m-3' sm={12} md={6} lg={4} xl={4}>
            {
                crusts.map((crust) => (
                    <Option key={crust.name} item={crust} />
                ))
            }
        </Row>

    )
}

export default Crust