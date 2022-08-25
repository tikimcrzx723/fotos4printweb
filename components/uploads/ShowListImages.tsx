import { Button, Card, CardActions, CardMedia, Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface IProp {
  images: string[];
  spacing: number;
  sm: number;
  xs: number;
  onDeleteImage: (image: string) => void;
}

export const ShowListImages: FC<PropsWithChildren<IProp>> = ({
  images,
  spacing,
  sm,
  xs,
  onDeleteImage,
}) => {
  return (
    <Grid container spacing={spacing}>
      {images.map((img) => (
        <Grid item key={img} xs={xs} sm={sm}>
          <Card>
            <CardMedia
              component="img"
              className="fadeIn"
              image={img}
              alt={img}
            />
            <CardActions>
              <Button
                onClick={() => onDeleteImage(img)}
                fullWidth
                color="error"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
