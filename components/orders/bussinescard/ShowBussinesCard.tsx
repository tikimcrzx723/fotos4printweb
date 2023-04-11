/* eslint-disable @next/next/no-img-element */
import { FC, PropsWithChildren } from 'react';
import styles from './ShowBussinesCard.module.css';

interface Props {
  frontImage: string;
  backImage: string;
}

export const ShowBussinesCard: FC<PropsWithChildren<Props>> = ({
  frontImage,
  backImage = '',
}) => {
  return (
    <div>
      <div className={styles.card}>
        <div className={`${styles['card-side']} ${styles['card-side-front']}`}>
          <img src={frontImage} width="100%" alt="front image" />
        </div>
        {backImage.length !== 0 ? (
          <div className={`${styles['card-side']} ${styles['card-side-back']}`}>
            <img src={backImage} width="100%" alt="second" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
