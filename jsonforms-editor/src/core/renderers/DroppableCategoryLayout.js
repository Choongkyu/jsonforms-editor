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
import { Card, CardContent } from '@mui/material';
import React from 'react';
import { DroppableLayout } from './DroppableLayout';
var CategoryLayout = function (props) {
    var uischema = props.uischema;
    var categoryLayout = uischema;
    return (React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(DroppableLayout, __assign({}, props, { layout: categoryLayout, direction: 'column' })))));
};
export var DroppableCategoryLayoutRegistration = {
    tester: rankWith(45, uiTypeIs('Category')),
    renderer: withJsonFormsLayoutProps(CategoryLayout),
};
//# sourceMappingURL=DroppableCategoryLayout.js.map