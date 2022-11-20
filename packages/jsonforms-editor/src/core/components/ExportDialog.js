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
export var ExportDialog = function (_a) {
    var open = _a.open, onClose = _a.onClose, schema = _a.schema, uiSchema = _a.uiSchema;
    var _b = useState(0), selectedTab = _b[0], setSelectedTab = _b[1];
    var handleTabChange = function (event, newValue) {
        setSelectedTab(newValue);
    };
    return (React.createElement(Dialog, { open: open, keepMounted: true, onClose: onClose, "aria-labelledby": 'export-dialog-title', "aria-describedby": 'export-dialog-description', maxWidth: 'md', fullWidth: true },
        React.createElement(DialogTitle, { sx: {
                textAlign: 'center',
            }, id: 'export-dialog-title' }, 'Export'),
        React.createElement(DialogContent, { sx: {
                maxHeight: '90vh',
                height: '90vh',
            } },
            React.createElement(Tabs, { value: selectedTab, onChange: handleTabChange },
                React.createElement(Tab, { label: 'Schema' }),
                React.createElement(Tab, { label: 'UI Schema' })),
            React.createElement(Hidden, { xsUp: selectedTab !== 0 },
                React.createElement(FormattedJson, { object: schema })),
            React.createElement(Hidden, { xsUp: selectedTab !== 1 },
                React.createElement(FormattedJson, { object: uiSchema }))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { "aria-label": 'Close', variant: 'contained', sx: {
                    margin: function (theme) { return theme.spacing(1); },
                }, color: 'primary', startIcon: React.createElement(CancelIcon, null), onClick: onClose }, "Close"))));
};
//# sourceMappingURL=ExportDialog.js.map