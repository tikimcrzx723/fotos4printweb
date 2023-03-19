import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

interface Props {
  back?: string;
  front?: string;
  color?: string;
  handleClick: () => void;
  handleClose: () => void;
  fullScreen: boolean;
  open: boolean;
  handleSubmit: UseFormHandleSubmit<{ type: '4/4' | '4/0' }>;
  onSaveInfo: () => void;
  key: string;
  add40or44: string;
}

export const DialogImages: FC<PropsWithChildren<Props>> = ({
  back,
  front,
  color,
  handleClick,
  handleClose,
  fullScreen,
  open,
  handleSubmit,
  onSaveInfo,
  key,
  add40or44,
}) => {
  return (
    <div>
      <Box marginBottom={2} marginTop={2}>
        <Button color="primary" onClick={handleClick}></Button>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit(onSaveInfo)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    key={key}
                    value={add40or44}
                    variant="filled"
                  ></Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
