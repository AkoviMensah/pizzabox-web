import React, { useEffect } from 'react'
import { useState } from 'react'
import agent from '../../app/api/agent'
import { useParams } from 'react-router-dom'
import { Divider, Grid, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useStoreContext } from '../../app/context/StoreContext'
import { Table } from 'react-bootstrap'

const PizzaDetails = () => {

    const { basket, setBasket, removeItem } = useStoreContext();
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.pizzaId === pizza?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        agent.Store.details(parseInt(id))
            .then(response => setPizza(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id, item]);

    function handleInputChange(event) {
        if (event.target.value > 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        setSubmitting(true);
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(pizza?.id, updatedQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(pizza?.id, updatedQuantity)
                .then(() => removeItem(pizza?.id, updatedQuantity))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }
    }

    if (loading) return <h1>Loading pizza...</h1>

    if (!pizza) return <h1>Not found</h1>

    return (
        <Grid className='m-3' container spacing={6}>
            <Grid item xs={6}>
                <img src={pizza.pictureUrl} alt={pizza.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{pizza.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4'>${(pizza.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{pizza.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{pizza.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{pizza.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Crust</TableCell>
                                <TableCell>{pizza.crust}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{pizza.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity}
                            loading={submitting}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PizzaDetails