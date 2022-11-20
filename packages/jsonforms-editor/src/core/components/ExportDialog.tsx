/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Hidden from '@mui/material/Hidden';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react';

import { FormattedJson } from './Formatted';

export interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  schema: any;
  uiSchema: any;
}
export const ExportDialog = ({
  open,
  onClose,
  schema,
  uiSchema,
}: ExportDialogProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby='export-dialog-title'
      aria-describedby='export-dialog-description'
      maxWidth='md'
      fullWidth
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
        }}
        id='export-dialog-title'
      >
        {'Export'}
      </DialogTitle>
      <DialogContent
        sx={{
          maxHeight: '90vh',
          height: '90vh',
        }}
      >
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label='Schema' />
          <Tab label='UI Schema' />
        </Tabs>
        <Hidden xsUp={selectedTab !== 0}>
          <FormattedJson object={schema} />
        </Hidden>
        <Hidden xsUp={selectedTab !== 1}>
          <FormattedJson object={uiSchema} />
        </Hidden>
      </DialogContent>
      <DialogActions>
        <Button
          aria-label={'Close'}
          variant='contained'
          sx={{
            margin: (theme) => theme.spacing(1),
          }}
          color='primary'
          startIcon={<CancelIcon />}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
