import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { UserCredentials } from 'core/types';
import { isEmail, minLength } from 'core/validators';
import { Formik } from 'formik';
import { type JSX } from 'react';

import { useAuth } from './hooks';

export const LoginScreen = (): JSX.Element => {
  const { loginUser } = useAuth();

  return (
    <Grid container justifyContent="center" sx={{ pt: 4 }}>
      <Grid item xs={6} display="flex" justifyContent="center">
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validate={(values) => {
              const errors = {} as UserCredentials;

              if (!isEmail(values.email) || !minLength(values.email, 2)) {
                errors.email = 'Invalid email address';
              }

              if (!minLength(values.password, 8)) {
                errors.password = 'Password must be at least 8 characters long';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await loginUser({
                email: values.email,
                password: values.password
              });
              setSubmitting(false);
            }}>
            {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
              <form onSubmit={handleSubmit}>
                <Typography variant="h4" fontWeight="bold">
                  Login
                </Typography>

                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                  sx={{ mt: 4, width: '100%' }}
                  onChange={handleChange}
                  value={values.email}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  sx={{ mt: 2, width: '100%' }}
                  onChange={handleChange}
                  value={values.password}
                  error={!!errors.password}
                  helperText={errors.password}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 4, width: '100%' }}
                  disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};
