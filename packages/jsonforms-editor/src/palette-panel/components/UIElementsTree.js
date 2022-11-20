/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DndItems } from '../../core/dnd';
import { StyledTreeItem, StyledTreeView } from './Tree';
var UiSchemaTreeItem = function (_a) {
    var uiSchemaElementProvider = _a.uiSchemaElementProvider, type = _a.type, label = _a.label, icon = _a.icon;
    var _b = useDrag({
        item: DndItems.newUISchemaElement(uiSchemaElementProvider()),
        collect: function (monitor) { return ({
            isDragging: !!monitor.isDragging(),
        }); },
        type: 'div',
    }), isDragging = _b[0].isDragging, drag = _b[1];
    return (React.createElement("div", { ref: drag, "data-cy": "".concat(type, "-source") },
        React.createElement(StyledTreeItem, { key: type, nodeId: type, label: label, icon: icon, isDragging: isDragging })));
};
var Div = styled('div')(function (_a) {
    var theme = _a.theme;
    return "marginBottom: ".concat(theme.spacing(1));
});
export var UIElementsTree = function (_a) {
    var elements = _a.elements;
    return (React.createElement(Div, null,
        React.createElement(Typography, { variant: 'h6', color: 'inherit', noWrap: true }, "Layouts & Other"),
        React.createElement(StyledTreeView, { defaultExpanded: [''] }, elements.map(function (_a) {
            var type = _a.type, label = _a.label, icon = _a.icon, uiSchemaElementProvider = _a.uiSchemaElementProvider;
            return (React.createElement(UiSchemaTreeItem, { key: "treeitem-".concat(type), type: type, label: label, icon: icon, uiSchemaElementProvider: uiSchemaElementProvider }));
        }))));
};
//# sourceMappingURL=UIElementsTree.js.map