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
//  */
// import {
//   createStyles,
//   fade,
//   styled,
//   Theme,
//   WithStyles,
//   withStyles,
// } from '@mui/material';
import { Collapse } from '@mui/material';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import React from 'react';
import { animated, useSpring } from 'react-spring'; // web.cjs is required for IE 11 support
import { styled } from '@mui/system';
var PaletteTransitionComponent = function (props) {
    var style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)',
            filter: 'blur(0)',
        },
        to: {
            opacity: props.in ? 1 : 0,
            transform: "translate3d(".concat(props.in ? 0 : 20, "px,0,0)"),
            filter: 'blur(0)',
        },
    });
    return (React.createElement(animated.div, { style: style },
        React.createElement(Collapse, __assign({}, props))));
};
export var StyledTreeView = styled(TreeView)({ flexGrow: 1, maxWidth: 400 });
export var StyledTreeItem = styled(function (props) { return (React.createElement(TreeItem, __assign({}, props, { TransitionComponent: PaletteTransitionComponent }))); })(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b["& .".concat(treeItemClasses.iconContainer)] = {
            '& .close': {
                opacity: 0.3,
            },
        },
        _b["& .".concat(treeItemClasses.group)] = {
            marginLeft: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            borderLeft: "1px dashed fade(".concat(theme.palette.text.primary, ", 0.4)"),
        },
        _b);
});
//# sourceMappingURL=Tree.js.map