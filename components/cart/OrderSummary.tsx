import { FC, PropsWithChildren, useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { currency } from '../../utils';
import { CartContext, UIContext } from '../../context';

interface Props {
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    total: number;
    tax: number;
  };
}

export const OrderSummary: FC<PropsWithChildren<Props>> = ({ orderValues }) => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  const { isDelivery } = useContext(UIContext);

  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subTotal, total, tax };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {summaryValues.numberOfItems} product
          {summaryValues.numberOfItems > 1 ? 's' : ''}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>
      {isDelivery ? (
        <>
          <Grid item xs={6}>
            <Typography>Delivery</Typography>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{currency.format(15)}</Typography>
          </Grid>
        </>
      ) : (
        <></>
      )}

      <Grid item xs={6}>
        <Typography>
          Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {currency.format(summaryValues.total + (isDelivery ? 15 : 0))}
        </Typography>
      </Grid>
    </Grid>
  );
};
