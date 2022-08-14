import React from 'react';
import { ShopLayout } from '../../components/layouts';
import appApi from '../../api/appApi';
import {
  CreditCard,
  PaymentForm,
  GooglePay,
} from 'react-square-web-payments-sdk';

const PaytMentPageSquare = () => {
  return (
    <ShopLayout title="Square" pageDescription="Square Page">
      <PaymentForm
        applicationId={process.env.NEXT_PUBLIC_APPLICATION_ID || ''}
        locationId={process.env.NEXT_PUBLIC_LOCATION || ''}
        cardTokenizeResponseReceived={async (token, buyer) => {
          console.log(token);

          const response = await appApi.post('/orders/square/pay', {
            sourceId: token.token,
          });
          alert(JSON.stringify(response.data, null, 2));
        }}
      >
        <CreditCard />
        {/* <GooglePay /> */}
      </PaymentForm>
    </ShopLayout>
  );
};

export default PaytMentPageSquare;
