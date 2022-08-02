import React from 'react'
import { Card, Container, Table } from 'react-bootstrap'
import { useStoreContext } from '../../app/context/StoreContext'

const BasketPage = () => {
    const { basket } = useStoreContext();

    if (!basket) return <h1> Your basket is empty </h1>

    return (
        <Container className='p-5'>
            <Table striped>
                <tbody>
                    <tr >
                        <td><strong>Pizza</strong></td>
                        <td align='right'><strong>Price</strong></td>
                        <td align='right'><strong>Quantity</strong></td>
                        <td align='right'><strong>Subtotal</strong></td>
                        <td align='right'></td>
                    </tr>
                    {basket.items.map(item => (
                        <tr key={item.pizzaId}>
                            <Card display='flex'>
                                <img src={item.pictureUrl} alt={item.name} style={{ height: 50, width: 100, marginRight: 200 }} />
                                <span>{item.name}</span>
                            </Card>

                            <td align='right'>${(item.price / 100).toFixed(2)}</td>
                            <td align='right'>{item.quantity}</td>
                            <td align='right'>${((item.price / 100) * item.quantity).toFixed(2)}</td>
                            <td align='right'><i className='fa fa-trash'></i></td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Container>
    )
}

export default BasketPage