import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { categories, itemCategoryStyle, itemStyle } from '../data';

interface Props {
  PaperProps?: React.ComponentProps<typeof Drawer>['PaperProps'];
  variant?: React.ComponentProps<typeof Drawer>['variant'];
  open?: React.ComponentProps<typeof Drawer>['open'];
  onClose?: React.ComponentProps<typeof Drawer>['onClose'];
  sx?: React.ComponentProps<typeof Drawer>['sx'];
}

export const Navigator = ({ PaperProps, open, onClose, sx, variant = 'permanent' }: Props) => {
  const location = useLocation();

  return (
    <Drawer variant={variant} PaperProps={PaperProps} open={open} onClose={onClose} sx={sx}>
      <List disablePadding>
        <ListItem sx={{ ...itemStyle, ...itemCategoryStyle, fontSize: 22, color: '#fff' }}>
          Library
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, to }) => (
              <Link to={to} style={{ textDecoration: 'none' }} key={childId}>
                <ListItem disablePadding>
                  <ListItemButton selected={location.pathname === to} sx={itemStyle}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
};
