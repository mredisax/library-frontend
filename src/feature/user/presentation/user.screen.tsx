import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Paperbase } from 'core/paperbase/presentation';
import { format } from 'date-fns';
import { useState } from 'react';

import { useUserBookedBooks, useUserReservations } from './hooks';
import { useUserDatabase } from './hooks/useUserDatabase';

export const UserScreen = () => {
  const [isProlongSnackbarOpen, setIsProlongSnackbarOpen] = useState(false);
  const [isCancelReservationSnackbarOpen, setIsCancelReservationSnackbarOpen] = useState(false);
  const { userDatabase } = useUserDatabase();

  const {
    userReservations,
    userReservationsStatus,
    statusMessage: reservationsStatusMessage,
    mutateCancelReservation
  } = useUserReservations(userDatabase?.id?.toString() ?? '');

  const { bookedBooks, bookedBooksStatus, mutateProlongueBook, statusMessage } = useUserBookedBooks(
    userDatabase?.id?.toString() ?? ''
  );

  return (
    <>
      <Paperbase>
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
          <Grid container spacing={2} sx={{ py: 2, px: 4, alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="h5">
                Welcome, {userDatabase?.name} {userDatabase?.lastname}!
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="subtitle1" align="right">
                {userDatabase?.email}
              </Typography>
              <Typography variant="subtitle1" align="right">
                {userDatabase?.phone ?? 'No phone number'}
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h5" fontWeight={700}>
                Your reserved books
              </Typography>
            </Grid>
            {userReservationsStatus === 'pending' ? (
              <CircularProgress />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Id
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Title
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Author
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Year
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Category
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          ISBN
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Reservation expiration date
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Remove reservation
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userReservations?.map((reservation) => {
                      const { book } = reservation;

                      return (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>
                            {book.author?.name} {book.author?.lastName}
                          </TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>{book.isbn}</TableCell>
                          <TableCell align="right">
                            {format(new Date(reservation.reservedAt), 'dd MMM yyyy')}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => {
                                mutateCancelReservation(reservation.id);
                                setIsCancelReservationSnackbarOpen(true);
                              }}>
                              <Typography variant="button">Remove</Typography>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>

          <Divider />

          <Grid container spacing={2} sx={{ p: 4 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h5" fontWeight={700}>
                Your booked books
              </Typography>
            </Grid>
            {bookedBooksStatus === 'pending' ? (
              <CircularProgress />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Id
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Title
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Author
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Year
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Category
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          ISBN
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Returned
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Borrow checkout date
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Borrow return date
                        </Typography>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookedBooks?.map((iBooked) => {
                      const { book, wasReturned, id } = iBooked;

                      return (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>
                            {book.author?.name} {book.author?.lastName}
                          </TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>{book.isbn}</TableCell>
                          <TableCell>
                            <Checkbox checked={wasReturned} disabled />
                          </TableCell>
                          <TableCell align="right">
                            {format(new Date(iBooked.borrowAt), 'dd MMM yyyy')}
                          </TableCell>
                          <TableCell align="right">
                            {format(new Date(iBooked.returnTo), 'dd MMM yyyy')}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              disabled={wasReturned}
                              onClick={async () => {
                                await mutateProlongueBook(id);
                                setIsProlongSnackbarOpen(true);
                              }}>
                              <Typography variant="button">Prolong</Typography>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Paper>
      </Paperbase>
      <Snackbar
        open={isProlongSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsProlongSnackbarOpen(false)}
        message={statusMessage}
      />
      <Snackbar
        open={isCancelReservationSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsCancelReservationSnackbarOpen(false)}
        message={reservationsStatusMessage}
      />
    </>
  );
};
