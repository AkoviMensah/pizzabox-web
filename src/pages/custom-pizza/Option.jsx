import { LoadingButton } from '@mui/lab'
import { CardActions, CardContent, CardMedia } from '@mui/material'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { currencyFormat } from '../../app/util/util'
import { addBasketItemAsync } from '../basket/basketSlice'

const Option = ({ item, next }) => {
    const { status } = useSelector(state => state.basket)
    const dispatch = useDispatch();

    return (
        <Card className='m-1'>
            <Link to={next}>
                <CardMedia to={`/crust`}
                    sx={{ height: 200, backgroundSize: 'flex', bgcolor: 'primary.light' }}
                    image={item.image}
                    title={item.name}
                />
            </Link>
            <CardContent>
                <h2>
                    {item.name}
                </h2>
            </CardContent>
        </Card>
    )
}

export default Option