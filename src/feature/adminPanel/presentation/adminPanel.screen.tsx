import { Add, Delete, Search as SearchIcon } from '@mui/icons-material';
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
  Typography
} from '@mui/material';
import { Paperbase } from 'core/paperbase/presentation';
import { IBook } from 'core/types';
import { filterBook } from 'feature/dashboard/services/filterBook';
import { useEffect, useState } from 'react';
import { type JSX } from 'react';

import { useAuthorsData } from './hooks/useAuthorsData.hook';
import { useBooksData } from './hooks/useBooksData.hook';
import { NewAuthorModal } from './newAuthorModal.component';
import { NewBookModal } from './newBookModal.component';
import { RemoveBookModal } from './removeBookModal.component';

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

export const AdminPanelScreen = (): JSX.Element => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchData, setSearchData] = useState('');
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);
  const [isNewAuthorModalOpen, setIsNewAuthorModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [bookToRemove, setBookToRemove] = useState<IBook | undefined>();
  const { books, mutateNewBook, mutateRemoveBook } = useBooksData();
  const { authors, mutateNewAuthor } = useAuthorsData();

  useEffect(() => {
    setSnackbarMessage('Book reserved successfully!');
  }, []);

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
                <Grid item>
                  <Button onClick={() => setIsNewBookModalOpen(true)}>
                    <Add fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="button">ADD BOOK</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => setIsNewAuthorModalOpen(true)}>
                    <Add fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="button">ADD AUTHOR</Typography>
                  </Button>
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
                          <IconButton
                            onClick={() => {
                              setIsRemoveModalOpen(true);
                              setBookToRemove(book);
                            }}>
                            <Delete />
                          </IconButton>
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
      <NewBookModal
        authors={authors}
        isModalOpen={isNewBookModalOpen}
        setIsModalOpen={setIsNewBookModalOpen}
        onSubmit={mutateNewBook}
      />
      <NewAuthorModal
        isModalOpen={isNewAuthorModalOpen}
        setIsModalOpen={setIsNewAuthorModalOpen}
        onSubmit={mutateNewAuthor}
      />
      <RemoveBookModal
        isModalOpen={isRemoveModalOpen}
        setIsModalOpen={setIsRemoveModalOpen}
        bookToRemove={bookToRemove}
        onSubmit={mutateRemoveBook}
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};
