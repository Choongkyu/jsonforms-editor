/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Container, Typography } from '@mui/material';
import React from 'react';
export var Footer = function () {
    return (React.createElement(Container, { sx: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        } },
        React.createElement(Typography, { variant: 'body2', color: 'textSecondary' }, "Copyright \u00A9 ".concat(new Date().getFullYear()))));
};
//# sourceMappingURL=Footer.js.map