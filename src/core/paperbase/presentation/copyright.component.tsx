import { Link, Typography } from '@mui/material';

export const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/about">
        library
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};
