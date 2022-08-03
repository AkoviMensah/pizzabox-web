import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import PizzaCard from './PizzaCard'
import PizzaCardSkeleton from "./PizzaCardSkeleton";

const Pizzas = ({ pizzas }) => {
    const { pizzasLoaded } = useSelector(state => state.menu)
    return (
        <Grid container spacing={4}>
            {pizzas.map(pizza => (
                <Grid item xs={4} key={pizza.id}>
                    {!pizzasLoaded ? (
                        <PizzaCardSkeleton />
                    ) : (<PizzaCard pizza={pizza} />)}

                </Grid>
            ))}
        </Grid>
    )
}

export default Pizzas