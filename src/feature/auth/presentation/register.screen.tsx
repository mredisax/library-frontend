import { Alert, Grid, Paper, Snackbar } from '@mui/material';
import { type JSX } from 'react';

import { useAuth } from './hooks';
import { RegisterForm } from './registerForm.component';

export const RegisterScreen = (): JSX.Element => {
  const { registerUser, registerStatus, isRegisterSnackbarOpen } = useAuth();

  return (
    <>
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
            <RegisterForm registerStatus={registerStatus} registerUser={registerUser} />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={isRegisterSnackbarOpen} autoHideDuration={6000}>
        <Alert severity="success">Succesfully registered! Going back to login...</Alert>
      </Snackbar>
    </>
  );
};
