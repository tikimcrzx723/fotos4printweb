import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { IOrderItem } from '../../interfaces';

interface Props {
  order: IOrderItem;
}

export const OrderProductCard: FC<PropsWithChildren<Props>> = ({ order }) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            image={order.image}
            alt={order.title}
            className='fadeIn'
          />
          <Typography variant='h5' component='h5'>
            {order.title}
          </Typography>
          
        </CardActionArea>
      </Card>
    </Grid>
  );
};
