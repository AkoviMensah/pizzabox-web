import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Divider, Grid, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addBasketItemAsync, removeBasketItemAsync } from '../basket/basketSlice'
import { fetchPizzaAsync, pizzaSelectors } from './storeSlice'

const PizzaDetails = () => {

    const { basket, status } = useSelector(state => state.basket);
    const { status: pizzaStatus } = useSelector(state => state.store)
    const dispatch = useDispatch();
    const { id } = useParams();
    const pizza = useSelector(state => pizzaSelectors.selectById(state, id))

    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.pizzaId === pizza?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!pizza) dispatch(fetchPizzaAsync(parseInt(id)))
    }, [id, item, dispatch, pizza]);

    function handleInputChange(event) {
        if (event.target.value > 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {

        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ pizzaId: pizza?.id, quantity: updatedQuantity }))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ pizzaId: pizza?.id, quantity: updatedQuantity }))
        }
    }

    if (pizzaStatus.includes('pending')) return <h1>Loading pizza...</h1>

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
                            loading={status.includes('pending')}
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