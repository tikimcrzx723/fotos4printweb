import type { NextPage } from 'next';

import * as THREE from 'three';

import { ShopLayout } from '../components/layouts';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const HomePage: NextPage = () => {


  return (
    <ShopLayout
      title="Anime"
      pageDescription={
        'Print all your memories and photos with the best quality.'
      }
    >
      <h1>Hola</h1>
    </ShopLayout>
  );
};

export default HomePage;
