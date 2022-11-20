/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import React from 'react';
export var ErrorDialog = function (_a) {
    var open = _a.open, title = _a.title, text = _a.text, onClose = _a.onClose;
    return (React.createElement(Dialog, { open: open, onClose: onClose },
        React.createElement(DialogTitle, null, title),
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, null, text)),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose, color: 'primary', autoFocus: true }, "OK"))));
};
//# sourceMappingURL=ErrorDialog.js.map