import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Avatar, Grid, IconButton, Link, Menu, MenuItem, Toolbar } from '@mui/material';
import { useRef, useState } from 'react';

import { useLocalUser } from './hooks/useLocalUser.hook';

const lightColor = 'rgba(255, 255, 255, 0.7)';

interface Props {
  onDrawerToggle: () => void;
}

export const Header = ({ onDrawerToggle }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const { localUser, logoutUser } = useLocalUser();

  return (
    <AppBar color="primary" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start">
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Link
              href="/"
              variant="body2"
              sx={{
                textDecoration: 'none',
                color: lightColor,
                '&:hover': {
                  color: 'common.white'
                }
              }}
              rel="noopener noreferrer"
              target="_blank">
              Regulamin
            </Link>
          </Grid>
          {localUser && (
            <Grid item>
              <IconButton
                color="inherit"
                sx={{ p: 0.5 }}
                ref={profileButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Toolbar>

      <Menu
        anchorEl={profileButtonRef.current}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}>
        <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};
