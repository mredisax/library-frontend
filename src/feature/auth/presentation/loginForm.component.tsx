import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { MutationStatus } from '@tanstack/react-query';
import { UserCredentials } from 'core/types';
import { isEmail, minLength } from 'core/validators';
import { Formik } from 'formik';
import { type JSX } from 'react';

interface Props {
  loginStatus: MutationStatus;
  loginUser: (data: { email: string; password: string }) => Promise<void>;
}

export const LoginForm = ({ loginStatus, loginUser }: Props): JSX.Element => {
  return (
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
      {({ values, handleChange, handleSubmit, isSubmitting, errors, touched }) => (
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
            error={!!errors.email && touched.email}
            helperText={touched.email && errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            sx={{ mt: 2, width: '100%' }}
            onChange={handleChange}
            value={values.password}
            error={!!errors.password && touched.password}
            helperText={touched.password && errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4, width: '100%' }}
            disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
          </Button>

          {loginStatus === 'error' && (
            <Box sx={{ px: 2 }}>
              <Typography variant="caption" sx={{ color: '#d32f2f' }}>
                Credentials provided are not valid
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">
              Don&apos;t have an account? <a href="/register">Register</a>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};
