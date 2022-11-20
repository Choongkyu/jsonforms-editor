var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React from 'react';
import { DroppableLayout } from './DroppableLayout';
var Group = function (props) {
    var uischema = props.uischema;
    var groupLayout = uischema;
    return (React.createElement(Card, null,
        React.createElement(CardHeader, { component: function () {
                var _a;
                return (React.createElement(Grid, { container: true, direction: 'row', spacing: 1, sx: {
                        padding: function (theme) { return theme.spacing(2); },
                        alignItems: 'baseline',
                    } },
                    React.createElement(Grid, { item: true },
                        React.createElement(Typography, null, "Label:")),
                    React.createElement(Grid, { item: true },
                        React.createElement(Typography, { sx: groupLayout.label
                                ? {
                                    fontStyle: 'italic',
                                    fontWeight: 'lighter',
                                    color: '#9e9e9e',
                                }
                                : null, variant: 'h6' }, (_a = groupLayout.label) !== null && _a !== void 0 ? _a : 'no label'))));
            } }),
        React.createElement(CardContent, null,
            React.createElement(DroppableLayout, __assign({}, props, { layout: groupLayout, direction: 'column' })))));
};
export var DroppableGroupLayoutRegistration = {
    tester: rankWith(45, uiTypeIs('Group')),
    renderer: withJsonFormsLayoutProps(Group),
};
//# sourceMappingURL=DroppableGroupLayout.js.map