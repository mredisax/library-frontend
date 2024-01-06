import { Box, Button, Grid, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { modalStyle } from 'core/data/constants';
import { IAuthor, INewBook } from 'core/types';
import { minLength } from 'core/validators';
import { Formik } from 'formik';
import { type JSX } from 'react';

interface Props {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  authors?: IAuthor[];
  onSubmit: (values: INewBook) => void;
}

export const NewBookModal = ({
  isModalOpen,
  setIsModalOpen,
  authors,
  onSubmit
}: Props): JSX.Element => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Formik
        initialValues={{
          title: '',
          author: 0,
          year: new Date().getFullYear(),
          category: '',
          isbn: '',
          description: '',
          cover: ''
        }}
        validate={(values) => {
          const errors = {} as Record<keyof INewBook, string>;

          if (!minLength(values.title, 2)) {
            errors.title = 'Title must be at least 2 characters long.';
          }

          if (!minLength(values.category, 2)) {
            errors.category = 'Category must be at least 2 characters long.';
          }

          if (!minLength(values.isbn, 2)) {
            errors.isbn = 'ISBN must be at least 2 characters long.';
          }

          if (!values.author) {
            errors.author = 'Author must be selected.';
          }

          if (!minLength(values.description, 2)) {
            errors.description = 'Description must be at least 2 characters long.';
          }

          if (!minLength(values.cover, 2)) {
            errors.cover = 'Cover must be at least 2 characters long.';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
          setIsModalOpen(false);
        }}>
        {({ values, handleChange, isSubmitting, errors, touched, submitForm }) => (
          <Box sx={modalStyle}>
            <Grid container spacing={1} sx={{ width: 600 }}>
              <Typography variant="h4" fontWeight="bold">
                Add book
              </Typography>

              <TextField
                label="Title"
                variant="outlined"
                type="text"
                name="title"
                sx={{ mt: 4, width: '100%' }}
                onChange={handleChange}
                value={values.title}
                error={!!errors.title && touched.title}
                helperText={touched.title && errors.title}
              />

              <TextField
                label="Description"
                variant="outlined"
                type="text"
                name="description"
                sx={{ mt: 2, width: '100%' }}
                onChange={handleChange}
                value={values.description}
                error={!!errors.description && touched.description}
                helperText={touched.description && errors.description}
              />

              <TextField
                value={values.author}
                onChange={handleChange}
                name="author"
                label="Author"
                select
                sx={{ mt: 2, width: '100%' }}
                error={!!errors.author && touched.author}
                helperText={touched.author && errors.author}>
                {authors?.map((author) => (
                  <MenuItem key={author.id} value={author.id}>
                    {`${author.name} ${author.lastName}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Year"
                variant="outlined"
                type="number"
                name="year"
                sx={{ mt: 2, width: '100%' }}
                onChange={handleChange}
                value={values.year}
                error={!!errors.year && touched.year}
                helperText={touched.year && errors.year}
              />

              <TextField
                label="Category"
                variant="outlined"
                type="text"
                name="category"
                sx={{ mt: 2, width: '100%' }}
                onChange={handleChange}
                value={values.category}
                error={!!errors.category && touched.category}
                helperText={touched.category && errors.category}
              />

              <TextField
                label="ISBN"
                variant="outlined"
                type="text"
                name="isbn"
                sx={{ mt: 2, width: '100%' }}
                onChange={handleChange}
                value={values.isbn}
                error={!!errors.isbn && touched.isbn}
                helperText={touched.isbn && errors.isbn}
              />

              <TextField
                label="Cover link"
                variant="outlined"
                type="text"
                name="cover"
                sx={{ mt: 2, width: '100%' }}
                onChange={handleChange}
                value={values.cover}
                error={!!errors.cover && touched.cover}
                helperText={touched.cover && errors.cover}
              />

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
                    <Typography variant="button">ADD</Typography>
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
