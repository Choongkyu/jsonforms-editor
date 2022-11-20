/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material';
import React from 'react';
export var OkCancelDialog = function (_a) {
    var open = _a.open, _b = _a.title, title = _b === void 0 ? '' : _b, text = _a.text, onOk = _a.onOk, onCancel = _a.onCancel;
    return (React.createElement(Dialog, { open: open, onClose: onCancel },
        React.createElement(DialogTitle, null, title),
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, null, text)),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onCancel, color: 'primary', "data-cy": 'cancel-button' }, "Cancel"),
            React.createElement(Button, { onClick: onOk, color: 'primary', autoFocus: true, "data-cy": 'ok-button' }, "Ok"))));
};
//# sourceMappingURL=OkCancelDialog.js.map