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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { styled } from '@mui/system';
import React from 'react';
var Div = styled('div')(function (_a) {
    var theme = _a.theme;
    return "\n    padding: ".concat(theme.spacing(1, 1, 0, 1), ";\n    height: 100%;\n    overflow: auto;\n  ");
});
export var TabContent = function (props) {
    var children = props.children, index = props.index, currentIndex = props.currentIndex, other = __rest(props, ["children", "index", "currentIndex"]);
    return (React.createElement(Div, __assign({ hidden: currentIndex !== index }, other), currentIndex === index && children));
};
//# sourceMappingURL=TabContent.js.map