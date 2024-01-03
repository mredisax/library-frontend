import { Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
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
// import { UserContext } from '../../core/context/UserContext';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { Paperbase } from 'core/paperbase/presentation';
import { UserProfile } from 'core/types';
import { IAuthor } from 'core/types/author.types';
import { IBook } from 'core/types/book.types';
// import axios from 'axios';
// import { serverAddress } from '../../core/config/server';
import { format } from 'date-fns';
import { ReactNode, useState } from 'react';
import { type JSX } from 'react';

import { modalStyle } from '../data/constants';
import { filterBook } from '../services/filterBook';
import { useAuthorsData } from './hooks/useAuthorsData.hook';
import { useBooksData } from './hooks/useBooksData.hook';
import { useCanBookBeReserved } from './hooks/useCanBookBeReserved.hook';

const Loader = ({
  isLoading,
  children
}: {
  isLoading: boolean;
  children: JSX.Element;
}): ReactNode => {
  if (isLoading) {
    return (
      <div>
        <Typography>Loading...</Typography>
      </div>
    );
  }

  return children;
};

export const DashboardScreen = (): JSX.Element => {
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [reservedBook, setReservedBook] = useState<IBook | null>(null);
  const [reservedAuthor, setReservedAuthor] = useState<IAuthor | null>(null);
  const [selectedDate] = useState<Date>(new Date());
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchData, setSearchData] = useState('');
  const { books } = useBooksData();
  const { authors } = useAuthorsData();
  const { canBookBeReserved, isFetching, reservationDueDate } = useCanBookBeReserved(
    reservedBook,
    selectedDate
  );
  const [localUser] = useLocalStorage<UserProfile | null>('user', null);

  const reserveBook = async () => {
    if (!reservedBook || !localUser) {
      return;
    }

    // TODO: check reservation

    const random = Math.round(Math.random()); // TODO: this is only mockup. Remove it later.

    if (random) {
      setSnackbarMessage('Book reserved successfully!');
      setIsSnackbarOpen(true);
      setIsBorrowModalOpen(false);
      setReservedBook(null);
    } else {
      setSnackbarMessage('Something went wrong. Try again later.');
      setIsSnackbarOpen(true);
      setIsBorrowModalOpen(false);
      setReservedBook(null);
    }
  };

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
                    placeholder="Search through books by title, author or ISBN"
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
                  {books.map((book) => {
                    const author: IAuthor | undefined = authors.find(
                      (_author) => _author.id === book.author_id
                    );

                    if (!filterBook(book, author, searchData)) return null;
                    return (
                      <TableRow key={book.id}>
                        <TableCell>{book.id}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{`${author?.name} ${author?.lastname}`}</TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>{book.category}</TableCell>
                        <TableCell>{book.isbn}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setReservedBook(book);
                              setReservedAuthor(author ?? null);
                              setIsBorrowModalOpen(true);
                            }}>
                            <Typography variant="button">RESERVE</Typography>
                          </Button>
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
      <Modal open={isBorrowModalOpen} onClose={() => setIsBorrowModalOpen(false)}>
        <Box sx={modalStyle}>
          <Grid container spacing={1} sx={{ width: 600 }}>
            <Grid item>
              <Typography variant="h5" fontWeight={600}>
                {reservedBook?.title}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" fontWeight={300}>
                - {reservedAuthor?.name} {reservedAuthor?.lastname} ({reservedBook?.year})
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => setIsBorrowModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography variant="subtitle1" fontWeight={300}>
                {reservedBook?.category}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ mb: 3 }}>
            <Grid item>
              <Typography variant="subtitle1" fontWeight={300}>
                ISBN: {reservedBook?.isbn}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'nowrap'
            }}>
            {/* <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  defaultValue={selectedDate}
                  onChange={(date) => setSelectedDate(date as Date)}
                />
              </LocalizationProvider>
            </Grid> */}
            <Grid item>
              <Loader isLoading={isFetching}>
                {canBookBeReserved ? (
                  <Tooltip
                    title={!localUser ? 'You must login first.' : ''}
                    disableInteractive={localUser !== undefined}>
                    <span>
                      <Button
                        variant="contained"
                        onClick={() => reserveBook()}
                        disabled={localUser === null}>
                        <Typography variant="button">RESERVE</Typography>
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      This book is already reserved due to{' '}
                      {format(reservationDueDate ?? new Date(Date.now()), 'dd/MM/yyyy')}
                    </Typography>
                  </Box>
                )}
              </Loader>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};
