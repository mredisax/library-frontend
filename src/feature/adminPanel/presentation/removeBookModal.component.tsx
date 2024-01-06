import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { modalStyle } from 'core/data/constants';
import { IBook } from 'core/types';
import { type JSX } from 'react';

interface Props {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  bookToRemove?: IBook;
  onSubmit: (values: IBook) => void;
}

export const RemoveBookModal = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  bookToRemove
}: Props): JSX.Element => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={modalStyle}>
        <Grid container spacing={1} sx={{ width: 600 }}>
          <Typography variant="h4" fontWeight="bold">
            Remove {bookToRemove?.title} from database?
          </Typography>

          <Grid container xs={12} sx={{ mt: 4 }}>
            <Grid item flexGrow={1} sx={{ mr: 2 }}>
              <Button
                variant="outlined"
                sx={{ width: '100%' }}
                onClick={() => setIsModalOpen(false)}>
                <Typography variant="button">CANCEL</Typography>
              </Button>
            </Grid>

            <Grid item flexGrow={1} sx={{ ml: 2 }}>
              <Button
                type="button"
                variant="contained"
                sx={{ width: '100%' }}
                disabled={!bookToRemove}
                onClick={() => {
                  if (bookToRemove) onSubmit(bookToRemove);

                  setIsModalOpen(false);
                }}>
                <Typography variant="button">REMOVE</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
