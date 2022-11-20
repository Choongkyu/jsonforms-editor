import { Typography } from '@mui/material';
import React from 'react';
import { Properties } from './Properties';
export var PropertiesPanel = function (_a) {
    var propertyRenderers = _a.propertyRenderers;
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: 'h6', color: 'inherit', noWrap: true }, "Properties"),
        React.createElement(Properties, { propertyRenderers: propertyRenderers })));
};
//# sourceMappingURL=PropertiesPanel.js.map