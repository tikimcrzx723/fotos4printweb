import { IOrderItem } from '../../interfaces/order';
import { currency } from '../../utils';
export const completeOrder = (
  image: string,
  orderItems: IOrderItem[] | [],
  orderId: string,
  email: string,
  fullName: string,
  total: number
) => {
  let increment = '';
  orderItems.map(({ title, size, quantity, price }) => {
    increment += `
    <tr class="item">
        <td>${size.includes('http') ? `<img src="${size}" alt="${title}"/>` : `${title}-${size}`}]</td>
        <td>${
          title.includes('Event') || title.includes('event')
            ? Number(size) * quantity
            : quantity
        }</td>
        <td>${currency.format(price)}</td>
        <td>${currency.format(price * quantity)}</td>
    </tr>`;
  });
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Invoice styling -->
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            text-align: center;
            color: #777;
        }

        body h1 {
            font-weight: 300;
            margin-bottom: 0px;
            padding-bottom: 0px;
            color: #000;
        }

        body h3 {
            font-weight: 300;
            margin-top: 10px;
            margin-bottom: 20px;
            font-style: italic;
            color: #555;
        }

        body a {
            color: #06f;
        }

        .invoice-box {
            max-width: 100%;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }

        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;
        }

        .invoice-box table td {
            padding: 5px;
            vertical-align: top;
        }

        .invoice-box table tr td:nth-child(4) {
            text-align: right !important;
        }

        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }

        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }

        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
            border-bottom: none;
        }

        .invoice-box table tr.total td:nth-child(4) {
            border-top: 2px solid #eee;
            font-weight: bold;
            text-align: right !important;
        }

        @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
            }

            .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
            }
        }
    </style>
</head>

<body>

    <div class="invoice-box">
        <table>
            <tr class="top" style="margin-bottom: 50px">

                <td class="title">
                    <img src="${image}"
                        alt="foto studio el sueno" style="width: 100%; max-width: 300px" />
                </td>
                <td></td>
                <td></td>
                <td>
                    <h4><strong>OrderId #:</strong> ${orderId}</h4>
                </td>

            </tr>

            <tr class="information">

                <td>
                    Foto Studio El Sueno.<br />
                    347 N Front st<br />
                    Woodburn, OR 97071
                </td>
                <td></td>
                <td></td>

                <td>
                    ${fullName}<br />
                    ${email}
                </td>
            </tr>


            <tr class="heading">
                <td>Item</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Amount</td>
            </tr>
            ${increment}
            <tr class="total">
                <td></td>
                <td></td>
                <td></td>
                <td>Total: ${currency.format(total)}</td>
            </tr>
        </table>
        <br>
        <br>
        <p style="display: inline; font-size: 18px; font-weight: 400;">We will always send
            confirmation of the order as well as any changes that may be found. You
            can check your order at <a target="_blank" href="https://www.fotos4print.com/orders/${orderId}">fotos4print.com</a>
            <br /><br />

            <br>
            any doubt or comment you can send it to us:
        </p>

        <br />

        <p style="display: inline; font-size: 18px; font-weight: 700;">Email:</p>
        <p style="display: inline; font-size: 18px; font-weight: 400;">service@fotos4print.com</p>

        <br />
        <p style="display: inline; font-size: 18px; font-weight: 700;">Phone:</p>
        <p style="display: inline; font-size: 18px; font-weight: 400;">503 990-4525</p>
    </div>


</body>

</html>
    `;
};
