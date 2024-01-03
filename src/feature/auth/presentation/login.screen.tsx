import { Grid, Paper } from '@mui/material';
import { type JSX } from 'react';

import { useAuth } from './hooks';
import { LoginForm } from './loginForm.component';

export const LoginScreen = (): JSX.Element => {
  const { loginUser, loginStatus } = useAuth();

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
          <LoginForm loginStatus={loginStatus} loginUser={loginUser} />
        </Paper>
      </Grid>
    </Grid>
  );
};
