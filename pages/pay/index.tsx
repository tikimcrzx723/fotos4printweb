import React from 'react';
import { ShopLayout } from '../../components/layouts';
import appApi from '../../api/appApi';
import {
  ApplePay,
  CreditCard,
  PaymentForm,
  ApplePayProps,
  Ach
} from 'react-square-web-payments-sdk';

const PaytMentPageSquare = () => {
  return (
    <ShopLayout title="Square" pageDescription="Square Page">
      <PaymentForm
        applicationId={process.env.NEXT_PUBLIC_APPLICATION_ID || ''}
        locationId={process.env.NEXT_PUBLIC_LOCATION || ''}
        // createPaymentRequest={}
        cardTokenizeResponseReceived={async (token, buyer) => {
          const response = await appApi.post('/payments/square/pay', {
            sourceId: token.token,
          });
          console.log(response.data);

          alert(JSON.stringify(response.data, null, 2));
        }}
      >
        {/* <CreditCard /> */}
        <ApplePay />
      </PaymentForm>
    </ShopLayout>
  );
};

export default PaytMentPageSquare;
