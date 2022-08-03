import { debounce, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPizzaParams } from './menuSlice';

const PizzaSearch = () => {
    const { pizzaParams } = useSelector(state => state.menu);
    const [searchTerm, setSearchTerm] = useState(pizzaParams.searchTerm);
    const dispatch = useDispatch();

    const debouncedSearch = debounce((event) => {
        dispatch(setPizzaParams({ searchTerm: event.target.value }))
    }, 1000)

    return (
        <TextField
            label='Search pizzas'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}

export default PizzaSearch