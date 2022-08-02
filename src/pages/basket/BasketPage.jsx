import { Add, Delete, Remove } from '@mui/icons-material';
import React, { useState } from 'react'
import { Card, Container, Table } from 'react-bootstrap'
import { useStoreContext } from '../../app/context/StoreContext'
import agent from '../../app/api/agent'
import { LoadingButton } from '@mui/lab';

const BasketPage = () => {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [loading, setLoading] = useState(false);

    function handleAddItem(pizzaId) {
        setLoading(true);
        agent.Basket.addItem(pizzaId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    function handleRemoveItem(pizzaId, quantity = 1) {
        setLoading(true);
        agent.Basket.removeItem(pizzaId, quantity)
            .then(() => removeItem(pizzaId, quantity))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

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
                            <td align='right'>
                                <LoadingButton loading={loading} onClick={(() => handleRemoveItem(item.pizzaId))} color='error'>
                                    <Remove />
                                </LoadingButton>
                                {item.quantity}
                                <LoadingButton loading={loading} onClick={(() => handleAddItem(item.pizzaId))} color='primary'>
                                    <Add />
                                </LoadingButton>
                            </td>
                            <td align='right'>${((item.price / 100) * item.quantity).toFixed(2)}</td>
                            <td align='right'>
                                <LoadingButton loading={loading} onClick={(() => handleRemoveItem(item.pizzaId, item.quantity))} color='error'>
                                    <Delete />
                                </LoadingButton>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </Container>
    )
}

export default BasketPage