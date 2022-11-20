/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Link, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';

const Copyright: React.FC = () => (
  <Typography variant='body2' color='textSecondary'>
    {'Copyright © '}
    <Link color='inherit' href='https://eclipsesource.com' target='_blank'>
      EclipseSource
    </Link>
    {' ' + new Date().getFullYear()}
  </Typography>
);

export const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <Copyright />
    </Box>
  );
};
