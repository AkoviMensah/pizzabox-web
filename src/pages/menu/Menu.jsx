import { Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pizzaSelectors, fetchPizzasAsync, fetchFilters, setPizzaParams, setPageNumber } from './menuSlice';
import Pizzas from './Pizzas'
import PizzaSearch from './PizzaSearch';
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to Low' },
    { value: 'price', label: 'Price - Low to High' }
]

const Menu = () => {
    const pizzas = useSelector(pizzaSelectors.selectAll);
    const { pizzasLoaded, filtersLoaded, crusts, types, pizzaParams, metaData } = useSelector(state => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!pizzasLoaded) dispatch(fetchPizzasAsync());
    }, [pizzasLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])


    if (!filtersLoaded) return <h1> Loading Pizzas</h1>

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <PizzaSearch />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={pizzaParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setPizzaParams({ orderBy: e.target.value }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={crusts}
                        checked={pizzaParams.crusts}
                        onChange={(items) => dispatch(setPizzaParams({ crusts: items }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={pizzaParams.types}
                        onChange={(items) => dispatch(setPizzaParams({ types: items }))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Pizzas pizzas={pizzas} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{ mb: 2 }}>
                {metaData &&
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page) => dispatch(setPageNumber({ pageNumber: page }))}
                    />}
            </Grid>
        </Grid>
    )
}

export default Menu