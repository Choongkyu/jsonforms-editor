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
export var Header = function () {
    var schema = useExportSchema();
    var uiSchema = useExportUiSchema();
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var onClose = function () { return setOpen(false); };
    var openDownloadDialog = function () { return setOpen(true); };
    return (React.createElement(AppBar, { position: 'static', elevation: 0 },
        React.createElement(Toolbar, null,
            React.createElement(Typography, { variant: 'h6', color: 'inherit', noWrap: true, sx: {
                    flexGrow: 1,
                } }, "JSON Forms Editor"),
            React.createElement(IconButton, { "aria-label": "Download", onClick: openDownloadDialog, color: 'inherit' },
                React.createElement(CloudDownloadIcon, null))),
        open && (React.createElement(ExportDialog, { open: open, onClose: onClose, schema: schema, uiSchema: uiSchema }))));
};
//# sourceMappingURL=Header.js.map