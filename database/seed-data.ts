import bcryptjs from 'bcryptjs';
import { IProduct } from '../interfaces';

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client' | 'federal' | 'frequent';
}

interface SeedData {
  users: SeedUser[];
  products: IProduct[];
}

const password00 = bcryptjs.hashSync('Tikio123.es$');
const password01 = bcryptjs.hashSync('Tikio123.es$');
const password02 = bcryptjs.hashSync('Tikio123.es$');
const password03 = bcryptjs.hashSync('Tikio123.es$');

export const initialData: SeedData = {
  users: [
    {
      name: 'Le Portrait de Petit Cossette',
      email: 'cossette@gmail.com',
      password: password00,
      role: 'admin',
    },
    {
      name: 'Eutiquio Javier',
      email: 'tikimioo@gmail.com',
      password: password01,
      role: 'client',
    },
    {
      name: 'Salomen Delgado',
      email: 'salomen@gmail.com',
      password: password02,
      role: 'federal',
    },
    {
      name: 'Delfino Urgado',
      email: 'delfino@hotmail.com',
      password: password03,
      role: 'frequent',
    },
  ],
  products: [
    {
      title: 'title00',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla. Vitae tempus quam pellentesque nec nam aliquam sem et. Nunc consequat interdum varius sit. Id cursus metus aliquam eleifend. Diam ut venenatis tellus in metus vulputate eu scelerisque. Quis enim lobortis scelerisque fermentum dui. Laoreet id donec ultrices tincidunt arcu non sodales neque. Id diam maecenas ultricies mi eget mauris pharetra et. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Gravida quis blandit turpis cursus in hac. Morbi quis commodo odio aenean sed.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 20,
          priceFrequnt: 15,
          priceFerderal: 10,
        },
        {
          size: 'size01',
          priceClient: 30,
          priceFrequnt: 25,
          priceFerderal: 20,
        },
        {
          size: 'size02',
          priceClient: 40,
          priceFrequnt: 35,
          priceFerderal: 30,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string00',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title01',
      description:
        'Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Et leo duis ut diam quam nulla porttitor. Elementum eu facilisis sed odio morbi quis commodo. Accumsan tortor posuere ac ut consequat semper. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Non diam phasellus vestibulum lorem. Fringilla ut morbi tincidunt augue interdum velit euismod in. Turpis egestas sed tempus urna et. Cras fermentum odio eu feugiat pretium nibh. Sit amet facilisis magna etiam tempor orci.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 0.8,
          priceFrequnt: 0.6,
          priceFerderal: 0.4,
        },
        {
          size: 'size01',
          priceClient: 1.8,
          priceFrequnt: 0.8,
          priceFerderal: 1.0,
        },
        {
          size: 'size02',
          priceClient: 2.8,
          priceFrequnt: 1.6,
          priceFerderal: 1.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string01',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title02',
      description:
        'Urna neque viverra justo nec ultrices dui. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pulvinar proin gravida hendrerit lectus a. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Magna fringilla urna porttitor rhoncus dolor purus. Egestas diam in arcu cursus euismod. Tortor aliquam nulla facilisi cras fermentum. Vulputate odio ut enim blandit volutpat. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Dictum varius duis at consectetur lorem donec massa. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Tellus pellentesque eu tincidunt tortor. Tortor consequat id porta nibh venenatis. Nibh tortor id aliquet lectus.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 5.6,
          priceFerderal: 4.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 10.6,
          priceFerderal: 8.4,
        },
        {
          size: 'size00',
          priceClient: 12.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string02',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title03',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string03',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title04',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string04',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title05',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla. Vitae tempus quam pellentesque nec nam aliquam sem et. Nunc consequat interdum varius sit. Id cursus metus aliquam eleifend. Diam ut venenatis tellus in metus vulputate eu scelerisque. Quis enim lobortis scelerisque fermentum dui. Laoreet id donec ultrices tincidunt arcu non sodales neque. Id diam maecenas ultricies mi eget mauris pharetra et. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Gravida quis blandit turpis cursus in hac. Morbi quis commodo odio aenean sed.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 20,
          priceFrequnt: 15,
          priceFerderal: 10,
        },
        {
          size: 'size01',
          priceClient: 30,
          priceFrequnt: 25,
          priceFerderal: 20,
        },
        {
          size: 'size02',
          priceClient: 40,
          priceFrequnt: 35,
          priceFerderal: 30,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string05',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title06',
      description:
        'Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Et leo duis ut diam quam nulla porttitor. Elementum eu facilisis sed odio morbi quis commodo. Accumsan tortor posuere ac ut consequat semper. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Non diam phasellus vestibulum lorem. Fringilla ut morbi tincidunt augue interdum velit euismod in. Turpis egestas sed tempus urna et. Cras fermentum odio eu feugiat pretium nibh. Sit amet facilisis magna etiam tempor orci.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 0.8,
          priceFrequnt: 0.6,
          priceFerderal: 0.4,
        },
        {
          size: 'size01',
          priceClient: 1.8,
          priceFrequnt: 0.8,
          priceFerderal: 1.0,
        },
        {
          size: 'size02',
          priceClient: 2.8,
          priceFrequnt: 1.6,
          priceFerderal: 1.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string06',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title07',
      description:
        'Urna neque viverra justo nec ultrices dui. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pulvinar proin gravida hendrerit lectus a. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Magna fringilla urna porttitor rhoncus dolor purus. Egestas diam in arcu cursus euismod. Tortor aliquam nulla facilisi cras fermentum. Vulputate odio ut enim blandit volutpat. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Dictum varius duis at consectetur lorem donec massa. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Tellus pellentesque eu tincidunt tortor. Tortor consequat id porta nibh venenatis. Nibh tortor id aliquet lectus.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 5.6,
          priceFerderal: 4.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 10.6,
          priceFerderal: 8.4,
        },
        {
          size: 'size00',
          priceClient: 12.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string07',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title08',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string08',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title09',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string09',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title010',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla. Vitae tempus quam pellentesque nec nam aliquam sem et. Nunc consequat interdum varius sit. Id cursus metus aliquam eleifend. Diam ut venenatis tellus in metus vulputate eu scelerisque. Quis enim lobortis scelerisque fermentum dui. Laoreet id donec ultrices tincidunt arcu non sodales neque. Id diam maecenas ultricies mi eget mauris pharetra et. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Gravida quis blandit turpis cursus in hac. Morbi quis commodo odio aenean sed.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 20,
          priceFrequnt: 15,
          priceFerderal: 10,
        },
        {
          size: 'size01',
          priceClient: 30,
          priceFrequnt: 25,
          priceFerderal: 20,
        },
        {
          size: 'size02',
          priceClient: 40,
          priceFrequnt: 35,
          priceFerderal: 30,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string10',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title11',
      description:
        'Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Et leo duis ut diam quam nulla porttitor. Elementum eu facilisis sed odio morbi quis commodo. Accumsan tortor posuere ac ut consequat semper. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Non diam phasellus vestibulum lorem. Fringilla ut morbi tincidunt augue interdum velit euismod in. Turpis egestas sed tempus urna et. Cras fermentum odio eu feugiat pretium nibh. Sit amet facilisis magna etiam tempor orci.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 0.8,
          priceFrequnt: 0.6,
          priceFerderal: 0.4,
        },
        {
          size: 'size01',
          priceClient: 1.8,
          priceFrequnt: 0.8,
          priceFerderal: 1.0,
        },
        {
          size: 'size02',
          priceClient: 2.8,
          priceFrequnt: 1.6,
          priceFerderal: 1.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string11',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title12',
      description:
        'Urna neque viverra justo nec ultrices dui. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pulvinar proin gravida hendrerit lectus a. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Magna fringilla urna porttitor rhoncus dolor purus. Egestas diam in arcu cursus euismod. Tortor aliquam nulla facilisi cras fermentum. Vulputate odio ut enim blandit volutpat. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Dictum varius duis at consectetur lorem donec massa. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Tellus pellentesque eu tincidunt tortor. Tortor consequat id porta nibh venenatis. Nibh tortor id aliquet lectus.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 5.6,
          priceFerderal: 4.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 10.6,
          priceFerderal: 8.4,
        },
        {
          size: 'size00',
          priceClient: 12.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string12',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title13',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string13',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title14',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string14',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title15',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu odio ut sem nulla. Vitae tempus quam pellentesque nec nam aliquam sem et. Nunc consequat interdum varius sit. Id cursus metus aliquam eleifend. Diam ut venenatis tellus in metus vulputate eu scelerisque. Quis enim lobortis scelerisque fermentum dui. Laoreet id donec ultrices tincidunt arcu non sodales neque. Id diam maecenas ultricies mi eget mauris pharetra et. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Gravida quis blandit turpis cursus in hac. Morbi quis commodo odio aenean sed.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 20,
          priceFrequnt: 15,
          priceFerderal: 10,
        },
        {
          size: 'size01',
          priceClient: 30,
          priceFrequnt: 25,
          priceFerderal: 20,
        },
        {
          size: 'size02',
          priceClient: 40,
          priceFrequnt: 35,
          priceFerderal: 30,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string15',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title16',
      description:
        'Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Et leo duis ut diam quam nulla porttitor. Elementum eu facilisis sed odio morbi quis commodo. Accumsan tortor posuere ac ut consequat semper. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Non diam phasellus vestibulum lorem. Fringilla ut morbi tincidunt augue interdum velit euismod in. Turpis egestas sed tempus urna et. Cras fermentum odio eu feugiat pretium nibh. Sit amet facilisis magna etiam tempor orci.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 0.8,
          priceFrequnt: 0.6,
          priceFerderal: 0.4,
        },
        {
          size: 'size01',
          priceClient: 1.8,
          priceFrequnt: 0.8,
          priceFerderal: 1.0,
        },
        {
          size: 'size02',
          priceClient: 2.8,
          priceFrequnt: 1.6,
          priceFerderal: 1.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string160',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'photo',
    },
    {
      title: 'title17',
      description:
        'Urna neque viverra justo nec ultrices dui. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Pulvinar proin gravida hendrerit lectus a. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Magna fringilla urna porttitor rhoncus dolor purus. Egestas diam in arcu cursus euismod. Tortor aliquam nulla facilisi cras fermentum. Vulputate odio ut enim blandit volutpat. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Dictum varius duis at consectetur lorem donec massa. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Tellus pellentesque eu tincidunt tortor. Tortor consequat id porta nibh venenatis. Nibh tortor id aliquet lectus.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 5.6,
          priceFerderal: 4.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 10.6,
          priceFerderal: 8.4,
        },
        {
          size: 'size00',
          priceClient: 12.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string178',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'press',
    },
    {
      title: 'title18',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string14598',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'press',
    },
    {
      title: 'title19',
      description:
        'Nunc mi ipsum faucibus vitae. Fermentum posuere urna nec tincidunt. Leo a diam sollicitudin tempor id eu nisl. Ut enim blandit volutpat maecenas. Pellentesque dignissim enim sit amet venenatis. Et sollicitudin ac orci phasellus egestas. Potenti nullam ac tortor vitae purus faucibus. Eu nisl nunc mi ipsum faucibus vitae. Eu tincidunt tortor aliquam nulla. Laoreet non curabitur gravida arcu ac tortor dignissim.',
      images: [
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/f6d5406f-d7aa-43d1-aa58-16c5ad613af4.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/bf3c5610-45df-48f9-81c5-32757506859f.jpeg',
        'https://fotos4printmedia.us-southeast-1.linodeobjects.com/products/photo/e10976ea-d2e4-449f-91df-eeb8655a3f8b.jpeg',
      ],
      price: [
        {
          size: 'size00',
          priceClient: 9.8,
          priceFrequnt: 4.6,
          priceFerderal: 3.4,
        },
        {
          size: 'size00',
          priceClient: 10.8,
          priceFrequnt: 8.6,
          priceFerderal: 6.4,
        },
        {
          size: 'size00',
          priceClient: 11.8,
          priceFrequnt: 9.6,
          priceFerderal: 7.4,
        },
      ],
      needImages: true,
      minIMages: 100,
      slug: 'string14pou',
      tags: ['tag00', 'tag01', 'tag02'],
      type: 'gift',
    },
  ],
};
