/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { useExportSchema, useExportUiSchema } from '../util/hooks';
import { ExportDialog } from './ExportDialog';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const Header: React.FC = () => {
  const schema = useExportSchema();
  const uiSchema = useExportUiSchema();
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const openDownloadDialog = () => setOpen(true);

  return (
    <AppBar position='static' elevation={0}>
      <Toolbar>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          sx={{
            flexGrow: 1,
          }}
        >
          JSON Forms Editor
        </Typography>
        <IconButton
          aria-label={`Download`}
          onClick={openDownloadDialog}
          color='inherit'
        >
          <CloudDownloadIcon />
        </IconButton>
      </Toolbar>
      {open && (
        <ExportDialog
          open={open}
          onClose={onClose}
          schema={schema}
          uiSchema={uiSchema}
        />
      )}
    </AppBar>
  );
};
