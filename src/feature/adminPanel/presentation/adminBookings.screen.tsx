import { Book, KeyboardReturn, Search as SearchIcon } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { Paperbase } from 'core/paperbase/presentation';
import { IBook } from 'core/types';
import { filterBook } from 'feature/dashboard/services/filterBook';
import { useEffect, useState } from 'react';
import { type JSX } from 'react';

import { useBookingData } from './hooks/useBookingData.hook';
import { useBooksData } from './hooks/useBooksData.hook';
import { useUserDatabase } from './hooks/useUserDatabase';
import { NewBookingModal } from './newBookingModal.component';
import { ReturnBookingModal } from './returnBookingModal.component';

// const Loader = ({
//   isLoading,
//   children
// }: {
//   isLoading: boolean;
//   children: JSX.Element;
// }): JSX.Element => {
//   if (isLoading) {
//     return (
//       <div>
//         <Typography>Loading...</Typography>
//       </div>
//     );
//   }

//   return children;
// };

export const AdminBookingsScreen = (): JSX.Element => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchData, setSearchData] = useState('');
  const [selectedBook, setSelectedBook] = useState<undefined | IBook>();
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [isReturnBookingModalOpen, setIsReturnBookingModalOpen] = useState(false);
  const { books } = useBooksData();
  const { mutateCreateBooking, statusMessage, mutateReturnBook } = useBookingData();
  const { usersData } = useUserDatabase();

  useEffect(() => {
    setSnackbarMessage(statusMessage);
  }, [statusMessage]);

  return (
    <>
      <Paperbase>
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <SearchIcon color="inherit" sx={{ display: 'block' }} />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search through reservations by title, author or ISBN"
                    InputProps={{
                      disableUnderline: true,
                      sx: { fontSize: 'default' }
                    }}
                    variant="standard"
                    onChange={(e) => {
                      setSearchData(e.target.value);
                    }}
                    value={searchData}
                  />
                </Grid>
                <Grid item>
                  <Tooltip title="Reload">
                    <Button
                      onClick={() => {
                        setIsReturnBookingModalOpen(true);
                      }}>
                      <KeyboardReturn
                        color="inherit"
                        fontSize="small"
                        sx={{ display: 'block', mr: 1 }}
                      />
                      <Typography variant="caption" color="inherit">
                        RETURN
                      </Typography>
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Grid container spacing={4} sx={{ p: 6 }}>
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
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books?.map((book) => {
                    if (!filterBook(book, book.author, searchData)) return null;
                    return (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{`${book.author?.name} ${book.author?.lastName}`}</TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>
                          <Tooltip title="Create booking">
                            <IconButton
                              onClick={() => {
                                setSelectedBook(book);
                                setIsNewBookingModalOpen(true);
                              }}>
                              <Book />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </Paperbase>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
      <NewBookingModal
        isModalOpen={isNewBookingModalOpen}
        setIsModalOpen={setIsNewBookingModalOpen}
        book={selectedBook}
        users={usersData}
        onSubmit={async (user, book) => {
          await mutateCreateBooking({
            book,
            user
          });
          setIsSnackbarOpen(true);
        }}
      />
      <ReturnBookingModal
        isModalOpen={isReturnBookingModalOpen}
        setIsModalOpen={setIsReturnBookingModalOpen}
        users={usersData}
        onSubmit={async (userId, bookingId) => {
          await mutateReturnBook({
            bookingId,
            userId
          });
          setIsSnackbarOpen(true);
        }}
      />
    </>
  );
};
