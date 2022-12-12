import { FC, PropsWithChildren, useState } from 'react';

import { AddToPhotosOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { useTheme } from '@mui/material/styles';

interface Props {
  product?: IOrderItem | ICartProduct;
}

export const AddCalendarInfo: FC<PropsWithChildren<Props>> = ({ product }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color='secondary' onClick={handleOpen}>
          <AddToPhotosOutlined /> Add Calendar Info
        </Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='esponsive-dialog-title'>
          <Box display='flex' justifyContent='space-between'>
            <Typography>Add Info Calendar</Typography>
          </Box>
        </DialogTitle>
        <form>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button color='primary' fullWidth>
                  Add Logo
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label='Phone Number' />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField type='email' label='Email' />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField type='website' label='Email' />
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
