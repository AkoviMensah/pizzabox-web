import { LoadingButton } from '@mui/lab'
import { CardActions, CardContent, CardMedia } from '@mui/material'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { currencyFormat } from '../../app/util/util'
import { addBasketItemAsync } from '../basket/basketSlice'

const PizzaCard = ({ pizza }) => {
    const { status } = useSelector(state => state.basket)
    const dispatch = useDispatch();

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
                    loading={status.includes('pendingAddItem' + pizza.id)}
                    onClick={() => dispatch(addBasketItemAsync({ pizzaId: pizza.id }))}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button size="small"><Link to={`/pizza/${pizza.id}`}>View</Link></Button>
            </CardActions>
        </Card>
    )
}

export default PizzaCard