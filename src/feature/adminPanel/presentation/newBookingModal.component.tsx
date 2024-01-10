import { Box, Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { modalStyle } from 'core/data/constants';
import { IBook, UserDatabase } from 'core/types';
import { Formik } from 'formik';
import { type JSX } from 'react';

interface Props {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  users?: UserDatabase[];
  book?: IBook;
  onSubmit: (user: number, book: IBook) => void;
}

export const NewBookingModal = ({
  isModalOpen,
  setIsModalOpen,
  users,
  book,
  onSubmit
}: Props): JSX.Element => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Formik
        initialValues={
          {
            user: undefined
          } as {
            user?: number;
          }
        }
        validate={(values) => {
          const errors = {} as {
            user?: string;
          };

          if (!values.user) {
            errors.user = 'User is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          onSubmit(values.user!, book!);
          setSubmitting(false);
          setIsModalOpen(false);
        }}>
        {({ values, handleChange, isSubmitting, errors, touched, submitForm }) => (
          <Box sx={modalStyle}>
            <Grid container spacing={1} sx={{ width: 600 }}>
              <Typography variant="h4" fontWeight="bold">
                Select user to create booking for
              </Typography>

              <TextField
                value={values.user}
                onChange={handleChange}
                name="user"
                label="User"
                select
                sx={{ mt: 2, width: '100%' }}
                error={!!errors.user && touched.user}
                helperText={touched.user && errors.user}>
                {users?.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {`${user.name} ${user.lastname}`}
                  </MenuItem>
                ))}
              </TextField>

              <Grid container xs={12} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6} sx={{ pr: { sm: 2, xs: 0 }, mb: { sm: 0, xs: 2 } }}>
                  <Button
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onClick={() => setIsModalOpen(false)}>
                    <Typography variant="button">CANCEL</Typography>
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} sx={{ pl: { sm: 2, xs: 0 } }}>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ width: '100%' }}
                    disabled={isSubmitting}
                    onClick={() => {
                      submitForm();
                    }}>
                    <Typography variant="button">CREATE</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Modal>
  );
};
