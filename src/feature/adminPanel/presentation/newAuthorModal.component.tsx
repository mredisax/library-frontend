import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { modalStyle } from 'core/data/constants';
import { IAuthor } from 'core/types';
import { minLength } from 'core/validators';
import { Formik } from 'formik';
import { type JSX } from 'react';

interface Props {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  onSubmit: (values: IAuthor) => void;
}

export const NewAuthorModal = ({ isModalOpen, setIsModalOpen, onSubmit }: Props): JSX.Element => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Formik
        initialValues={{
          name: '',
          lastName: ''
        }}
        validate={(values) => {
          const errors = {} as Record<keyof IAuthor, string>;

          if (!minLength(values.name, 2)) {
            errors.name = 'First name must be at least 2 characters long.';
          }

          if (!minLength(values.lastName, 2)) {
            errors.lastName = 'Last name must be at least 2 characters long.';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}>
        {({ values, handleChange, isSubmitting, errors, touched, submitForm }) => (
          <Box sx={modalStyle}>
            <Grid container spacing={1} sx={{ width: 600 }}>
              <Typography variant="h4" fontWeight="bold">
                Add author
              </Typography>

              <Grid container xs={12} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6} sx={{ pr: { sm: 2, xs: 0 }, mb: { sm: 0, xs: 2 } }}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    type="text"
                    name="name"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    value={values.name}
                    error={!!errors.name && touched.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12} sm={6} sx={{ pl: { sm: 2, xs: 0 }, mb: { sm: 0, xs: 2 } }}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    name="lastName"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    value={values.lastName}
                    error={!!errors.lastName && touched.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
              </Grid>

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
