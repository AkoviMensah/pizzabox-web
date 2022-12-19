import { CardContent, CardMedia } from '@mui/material'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Option = ({ item, next }) => {


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