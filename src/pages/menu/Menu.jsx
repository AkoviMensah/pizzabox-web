import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pizzaSelectors, fetchPizzasAsync } from './menuSlice';
import Pizzas from './Pizzas'

const Menu = () => {
    const pizzas = useSelector(pizzaSelectors.selectAll);
    const { pizzasLoaded, status } = useSelector(state => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!pizzasLoaded) dispatch(fetchPizzasAsync());
    }, [pizzasLoaded, dispatch])

    if (status.includes('pending')) return <h1> Loading Pizzas</h1>

    return (
        <>
            <Pizzas pizzas={pizzas} />
        </>
    )
}

export default Menu