import { Grid } from '@mui/material'
import React from 'react'
import PizzaCard from './PizzaCard'

const Pizzas = ({ pizzas }) => {

    return (
        <Grid container spacing={4}>
            {pizzas.map(pizza => (
                <Grid item xs={3} key={pizza.id}>
                    <PizzaCard pizza={pizza} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Pizzas