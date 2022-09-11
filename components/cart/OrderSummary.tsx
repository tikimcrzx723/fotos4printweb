import {
  FC,
  PropsWithChildren,
  useContext,
  useId,
  useState,
  useEffect,
} from 'react';
import { Grid, Typography } from '@mui/material';
import { currency } from '../../utils';
import { CartContext, UIContext } from '../../context';
import { useCompany } from '../../hooks';
import { useMemo } from 'react';

interface Props {
  deliveryPrice?: number;
  complete?: boolean;
  discount?: number;
  orderValues?: {
    numberOfItems: number;
    subTotal: number;
    total: number;
    tax: number;
  };
}

export const OrderSummary: FC<PropsWithChildren<Props>> = ({
  orderValues,
  complete = false,
  deliveryPrice = 15,
  discount = 0,
}) => {
  const couponKey = useId();
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const { isDelivery } = useContext(UIContext);
  const { company } = useCompany('user/company');

  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subTotal, total, tax };

  useEffect(() => {
    if (summaryValues.subTotal > summaryValues.total) {
      setApplyCoupon(true);
    }
  }, []);

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
      {applyCoupon ? (
        <>
          <Grid item xs={6}>
            <Typography>Discount</Typography>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>-{currency.format(discount)}</Typography>
          </Grid>
        </>
      ) : (
        <></>
      )}
      {isDelivery || complete ? (
        <>
          <Grid item xs={6}>
            <Typography>Delivery</Typography>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{currency.format(deliveryPrice!)}</Typography>
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
        {applyCoupon ? (
          <Typography
            key={couponKey}
            variant="subtitle1"
            sx={{ textDecoration: 'line-through', marginRight: 2 }}
          >
            {currency.format(summaryValues.subTotal)}
          </Typography>
        ) : (
          <></>
        )}
        <Typography variant="subtitle1">
          {currency.format(
            complete
              ? summaryValues.total
              : isDelivery
              ? summaryValues.total >= company!.minFreeDelivery
                ? summaryValues.total
                : isDelivery
                ? summaryValues.total + company!.deliveryPrice
                : summaryValues.total
              : summaryValues.total
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};
