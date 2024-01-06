import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { MutationStatus } from '@tanstack/react-query';
import { isEmail, isPhoneNumber, minLength } from 'core/validators';
import { Formik } from 'formik';
import { type JSX } from 'react';

interface Props {
  registerUser: (data: {
    name: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
  }) => Promise<void>;
  registerStatus: MutationStatus;
}

export const RegisterForm = ({ registerStatus, registerUser }: Props): JSX.Element => {
  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      }}
      validate={(values) => {
        const errors = {} as {
          name?: string;
          lastname?: string;
          email?: string;
          password?: string;
          confirmPassword?: string;
          phone?: string;
        };

        if (!isEmail(values.email) || !minLength(values.email, 2)) {
          errors.email = 'Invalid email address';
        }

        if (!minLength(values.password, 8)) {
          errors.password = 'Password must be at least 8 characters long';
        }

        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords must match';
        }

        if (!isPhoneNumber(values.phone)) {
          errors.phone = 'Invalid phone number';
        }

        if (!minLength(values.name, 2)) {
          errors.name = 'Name must be at least 2 characters long';
        }

        if (!minLength(values.lastname, 2)) {
          errors.lastname = 'Lastname must be at least 2 characters long';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        setTouched({
          name: true,
          lastname: true,
          email: true,
          password: true,
          confirmPassword: true,
          phone: true
        });
        await registerUser({
          name: values.name,
          lastname: values.lastname,
          phone: values.phone,
          email: values.email,
          password: values.password
        });
        setSubmitting(false);
      }}>
      {({ values, handleChange, handleSubmit, isSubmitting, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" fontWeight="bold">
            Register
          </Typography>

          <Box sx={{ mt: 4, display: 'flex' }}>
            <TextField
              label="First name"
              variant="outlined"
              type="text"
              name="name"
              sx={{ width: '100%', mr: 1 }}
              onChange={handleChange}
              value={values.name}
              error={!!errors.name && touched.name}
              helperText={touched.name && errors.name}
            />
            <TextField
              label="Last name"
              variant="outlined"
              type="text"
              name="lastname"
              sx={{ width: '100%', ml: 1 }}
              onChange={handleChange}
              value={values.lastname}
              error={!!errors.lastname && touched.lastname}
              helperText={touched.lastname && errors.lastname}
            />
          </Box>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            sx={{ mt: 2, width: '100%' }}
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
          <TextField
            label="Confirm password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            sx={{ mt: 2, width: '100%' }}
            onChange={handleChange}
            value={values.confirmPassword}
            error={!!errors.confirmPassword && touched.confirmPassword}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
          <TextField
            label="Phone number"
            variant="outlined"
            type="number"
            name="phone"
            sx={{ mt: 2, width: '100%' }}
            onChange={handleChange}
            value={values.phone}
            error={!!errors.phone && touched.phone}
            helperText={touched.phone && errors.phone}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4, width: '100%' }}
            disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
          </Button>

          {registerStatus === 'error' && (
            <Box sx={{ px: 2 }}>
              <Typography variant="caption" sx={{ color: '#d32f2f' }}>
                Credentials provided are not valid
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">
              Want to know more about us? <a href="/about">About</a>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};
