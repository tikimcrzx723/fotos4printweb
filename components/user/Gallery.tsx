import { Card, CardActionArea, Grid, CardMedia } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface Props {
  images: string[];
}

export const Gallery: FC<PropsWithChildren<Props>> = ({ images }) => {
  return (
    <Grid container spacing={6}>
      {images.map((image) => (
        <Grid key={image} item xs={12} sm={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                image={`https://cdwjpmyywa.cloudimg.io/${image}?width=300`}
                alt="user images"
                className="fadeIn"
              />
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
