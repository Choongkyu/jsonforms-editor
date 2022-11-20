/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { styled } from '@mui/system';
import React from 'react';
var Main = styled('main')(function (_a) {
    var theme = _a.theme;
    return "\n    margin-top: ".concat(theme.spacing(2), ";\n    margin-bottom: ").concat(theme.spacing(2), ";\n    min-height: 0;\n  ");
});
var Container = styled('div')("\n    display: grid;\n    height: 100vh;\n    grid-template-areas: header content footer;\n    grid-template-columns: 1fr;\n    grid-template-rows: auto 1fr auto;\n    ");
var Footer = styled('footer')(function (_a) {
    var theme = _a.theme;
    return "\n    padding: ".concat(theme.spacing(2, 2), ";\n    background-color:\n      ").concat(theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800], ";\n  ");
});
export var Layout = function (_a) {
    var HeaderComponent = _a.HeaderComponent, FooterComponent = _a.FooterComponent, children = _a.children;
    return (React.createElement(Container, null,
        React.createElement("header", null, HeaderComponent ? React.createElement(HeaderComponent, null) : null),
        React.createElement(Main, null, children),
        React.createElement(Footer, null, FooterComponent ? React.createElement(FooterComponent, null) : null)));
};
//# sourceMappingURL=Layout.js.map