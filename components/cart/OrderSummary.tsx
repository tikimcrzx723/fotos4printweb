import { FC, PropsWithChildren, useContext, useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { currency } from '../../utils';
import { CartContext, UIContext } from '../../context';
import { useCompany } from '../../hooks';
import { ICartProduct } from '../../interfaces';

interface Props {
  cartOrder?: ICartProduct[];
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
  cartOrder = [],
}) => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const { isDelivery } = useContext(UIContext);
  const { company } = useCompany('user/company');
  const incrementPrice = (type: string, arr: any) => {
    const priceChange = arr!.find(
      (el: any) => el.complement === type
    )?.increment;
    if (priceChange !== undefined || priceChange !== undefined) {
      return priceChange;
    }
    return 0;
  };

  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subTotal, total, tax };

  useEffect(() => {
    if (summaryValues.subTotal > summaryValues.total) {
      setApplyCoupon(true);
    }
  }, []);

  return (
    <>
      <Grid container justifyContent={'center'}>
        <Grid item xs={3}>
          <Typography variant="h6">Product</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">Size</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Qty</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Price</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Total</Typography>
        </Grid>
      </Grid>

      {cartOrder.map((product) =>
        product.title.includes('yard') &&
        product.hasOwnProperty('information') ? (
          product.information.map((inf: any, index: any) => (
            <Grid
              container
              key={`${product._id}-${product.size}-${inf.type}-${index}`}
            >
              <Grid item xs={3}>
                <Typography>
                  {product.title}-{inf.type}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{product.size}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{inf.quantity}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  {currency.format(product.price + inf.increment)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  {currency.format(
                    inf.quantity * (product.price + inf.increment)
                  )}
                </Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid container key={`${product._id}-${product.size}`}>
            <Grid item xs={3}>
              <Typography>{product.title}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{product.size}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{product.quantity}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{currency.format(product.price)}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                {currency.format(product.quantity * product.price)}
              </Typography>
            </Grid>
          </Grid>
        )
      )}

      <hr />
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h6">-</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">-</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">{summaryValues.numberOfItems}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">-</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            {currency.format(summaryValues.subTotal)}
          </Typography>
        </Grid>
      </Grid>
      {applyCoupon ? (
        <Grid container>
          <Grid item xs={6}>
            <Typography>Discount</Typography>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>-{currency.format(discount)}</Typography>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
      {isDelivery || complete ? (
        <Grid container>
          <Grid item xs={3}>
            <Typography>Delivery</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">
              {currency.format(deliveryPrice!)}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}

      <Grid container>
        <Grid item xs={3}>
          <Typography>
            Tax ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">-</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">-</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">-</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            {currency.format(summaryValues.tax)}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6">-</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">-</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">
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
      </Grid>
    </>
  );
};
