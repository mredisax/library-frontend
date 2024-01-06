import { Box, Button, Typography } from '@mui/material';

export const NotFoundScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
      }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Nie znaleziono strony
      </Typography>
      <Button variant="text" color="secondary" href="/">
        Wróć do strony głównej
      </Button>
    </Box>
  );
};
