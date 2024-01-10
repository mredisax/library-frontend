import { Add, Delete, Search } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Paper,
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
import { IAuthor } from 'core/types';
import { filterAuthor } from 'feature/dashboard/services/filterBook';
import { type JSX, useState } from 'react';

import { useAuthorsData } from './hooks/useAuthorsData.hook';
import { NewAuthorModal } from './newAuthorModal.component';
import { RemoveAuthorModal } from './removeAuthorModal.component';

export const AuthorsScreen = (): JSX.Element => {
  const [searchData, setSearchData] = useState('');
  const [isNewAuthorModalOpen, setIsNewAuthorModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [authorToRemove, setAuthorToRemove] = useState<IAuthor | undefined>();
  const { authors, mutateNewAuthor, mutateRemoveAuthor } = useAuthorsData();

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
                  <Search color="inherit" sx={{ display: 'block' }} />
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
                        First Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Last Name
                      </Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {authors?.map((author) => {
                    if (!filterAuthor(author, searchData)) return null;
                    return (
                      <TableRow key={author.id}>
                        <TableCell>{author.id}</TableCell>
                        <TableCell>{author.name}</TableCell>
                        <TableCell>{author.lastName}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              setIsRemoveModalOpen(true);
                              setAuthorToRemove(author);
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
      <NewAuthorModal
        isModalOpen={isNewAuthorModalOpen}
        setIsModalOpen={setIsNewAuthorModalOpen}
        onSubmit={mutateNewAuthor}
      />
      <RemoveAuthorModal
        isModalOpen={isRemoveModalOpen}
        setIsModalOpen={setIsRemoveModalOpen}
        authorToRemove={authorToRemove}
        onSubmit={mutateRemoveAuthor}
      />
    </>
  );
};
