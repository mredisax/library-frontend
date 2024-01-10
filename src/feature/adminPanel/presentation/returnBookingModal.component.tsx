import { Box, Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { modalStyle } from 'core/data/constants';
import { UserDatabase } from 'core/types';
import { format } from 'date-fns';
import { Formik } from 'formik';
import { type JSX, useEffect, useState } from 'react';

import { useUserDatabase } from './hooks/useUserDatabase';

interface Props {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  users?: UserDatabase[];
  onSubmit: (user: number, book: number) => void;
}

export const ReturnBookingModal = ({
  isModalOpen,
  setIsModalOpen,
  users,
  onSubmit
}: Props): JSX.Element => {
  const { mutateUserBookedBooks, userBookedBooks } = useUserDatabase();
  const [selectedUser, setSelectedUser] = useState<number | undefined>();

  useEffect(() => {
    if (selectedUser) {
      mutateUserBookedBooks(selectedUser);
    }
  }, [selectedUser]);

  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Formik
        initialValues={
          {
            user: undefined,
            book: undefined
          } as {
            user?: number;
            book?: number;
          }
        }
        validate={(values) => {
          const errors = {} as {
            user?: string;
            books?: string;
          };

          if (!values.user) {
            errors.user = 'User is required';
          }

          if (!values.book) {
            errors.books = 'Book is required';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          onSubmit(values.user!, values.book!);
          setSubmitting(false);
          setIsModalOpen(false);
        }}>
        {({ values, handleChange, isSubmitting, errors, touched, submitForm }) => {
          useEffect(() => {
            setSelectedUser(values.user);
          }, [values.user]);

          console.log(userBookedBooks);

          return (
            <Box sx={modalStyle}>
              <Grid container spacing={1} sx={{ width: 600 }}>
                <Typography variant="h4" fontWeight="bold">
                  Select user to return book for
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

                <TextField
                  value={values.book}
                  onChange={handleChange}
                  name="book"
                  label="Book"
                  select
                  sx={{ mt: 2, width: '100%' }}
                  error={!!errors.book && touched.book}
                  helperText={touched.book && errors.book}>
                  {userBookedBooks
                    ?.filter((val) => val.wasReturned === false)
                    .map((booking) => (
                      <MenuItem key={booking.id} value={booking.id}>
                        {`${booking.id} | Return To: ${format(
                          new Date(booking.returnTo),
                          'dd MMM yyyy'
                        )} | ISBN: ${booking.book.isbn}`}
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
                      <Typography variant="button">RETURN</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          );
        }}
      </Formik>
    </Modal>
  );
};
