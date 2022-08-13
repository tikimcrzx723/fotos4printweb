import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { create, convert } from 'xmlbuilder2';

type Data = {
  message: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return addAxios(req, res);
    default:
      break;
  }
  res.status(200).json({ message: 'Example' });
}

const addAxios = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let root = create()
    .ele('RateV4Request', { USERID: '249FOTOS2193' })
    .ele('Revision')
    .txt('2')
    .up()
    .ele('Package', { ID: '0' })
    .ele('Service')
    .txt('PRIORITY')
    .up()
    .ele('ZipOrigination')
    .txt('97071')
    .up()
    .ele('ZipDestination')
    .txt('26301')
    .up()
    .ele('Pounds')
    .txt('8')
    .up()
    .ele('Ounces')
    .txt('2')
    .up()
    .ele('Container')
    .up()
    .ele('Width')
    .up()
    .ele('Machinable')
    .txt('TRUE')
    .up()
    .up()
    .up();
  let xml = root.end({ prettyPrint: true });
  console.log(xml);

  const url =
    'https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=' +
    encodeURIComponent(xml);

  const response = await axios.get(url);
  const obj = convert(response.data, { format: 'object' });

  return res.status(200).json({ message: obj });
};
