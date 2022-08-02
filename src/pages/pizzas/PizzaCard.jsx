import { LoadingButton } from '@mui/lab'
import { CardActions, CardContent, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import agent from '../../app/api/agent'
import { useStoreContext } from '../../app/context/StoreContext'
import { currencyFormat } from '../../app/util/util'

const PizzaCard = ({ pizza }) => {
    const [loading, setLoading] = useState(false);
    const { setBasket } = useStoreContext();

    function handleAddItem(pizzaId) {
        setLoading(true);
        agent.Basket.addItem(pizzaId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card className='m-1'>
            <Link to={`/pizza/${pizza.id}`}>
                <CardMedia to={`/pizza/${pizza.id}`}
                    sx={{ height: 200, backgroundSize: 'flex', bgcolor: 'primary.light' }}
                    image={pizza.pictureUrl}
                    title={pizza.name}
                />
            </Link>

            <CardContent>
                <span>
                    {pizza.crust} / {pizza.type} {"   " + currencyFormat(pizza.price)}
                </span>
            </CardContent>
            <CardActions>
                <LoadingButton color="secondary"
                    loading={loading}
                    onClick={() => handleAddItem(pizza.id)}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button size="small"><Link to={`/pizza/${pizza.id}`}>View</Link></Button>
            </CardActions>
        </Card>
    )
}

export default PizzaCard