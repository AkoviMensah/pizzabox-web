import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

export default function Review() {
    const { basket } = useSelector(state => state.basket);
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            {basket &&
                <BasketTable items={basket.items} isBasket={false} />}
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                </Grid>
            </Grid>
        </>
    );
}