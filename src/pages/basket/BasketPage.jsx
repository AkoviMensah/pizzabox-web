import { Add, Delete, Remove } from '@mui/icons-material';
import React, { useState } from 'react'
import { useStoreContext } from '../../app/context/StoreContext'
import agent from '../../app/api/agent'
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummary';
import { Box, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const BasketPage = () => {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    function handleAddItem(pizzaId, name) {
        setStatus({ loading: true, name });
        agent.Basket.addItem(pizzaId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }

    function handleRemoveItem(pizzaId, quantity = 1, name) {
        setStatus({ loading: true, name });
        agent.Basket.removeItem(pizzaId, quantity)
            .then(() => removeItem(pizzaId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }));
    }

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer className='m-4' component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>pizza</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map(item => (
                            <TableRow
                                key={item.pizzaId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'rem' + item.pizzaId}
                                        onClick={() => handleRemoveItem(item.pizzaId, 1, 'rem' + item.pizzaId)}
                                        color='error'
                                    >
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        loading={status.loading && status.name === 'add' + item.pizzaId}
                                        onClick={() => handleAddItem(item.pizzaId, 'add' + item.pizzaId)}
                                        color='secondary'
                                    >
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.loading && status.name === 'del' + item.pizzaId}
                                        onClick={() => handleRemoveItem(item.pizzaId, item.quantity, 'del' + item.pizzaId)}
                                        color='error'
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>

    )
}

export default BasketPage