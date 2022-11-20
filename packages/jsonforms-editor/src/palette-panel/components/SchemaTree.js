/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Typography } from '@mui/material';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DndItems } from '../../core/dnd';
import { SchemaIcon } from '../../core/icons';
import { getChildren, getLabel, getPath, isArrayElement, isObjectElement, } from '../../core/model/schema';
import { createControl } from '../../core/util/generators/uiSchema';
import { StyledTreeItem, StyledTreeView } from './Tree';
var SchemaTreeItem = function (_a) {
    var schemaElement = _a.schemaElement;
    var uiSchemaElement = createControl(schemaElement);
    var _b = useDrag({
        item: DndItems.newUISchemaElement(uiSchemaElement, schemaElement.uuid),
        canDrag: function () {
            return schemaElement.schema.type !== 'object';
        },
        collect: function (monitor) { return ({
            isDragging: !!monitor.isDragging(),
        }); },
        type: 'div',
    }), isDragging = _b[0].isDragging, drag = _b[1];
    var schemaElementPath = getPath(schemaElement);
    return (React.createElement("div", { ref: drag, "data-cy": "".concat(schemaElementPath, "-source") },
        React.createElement(StyledTreeItem, { key: schemaElementPath, nodeId: schemaElementPath, label: getLabel(schemaElement), icon: React.createElement(SchemaIcon, { type: schemaElement.type }), isDragging: isDragging }, getChildrenToRender(schemaElement).map(function (child) { return (React.createElement(SchemaTreeItem, { schemaElement: child, key: getPath(child) })); }))));
};
var getChildrenToRender = function (schemaElement) {
    return getChildren(schemaElement).flatMap(function (child) {
        // if the child is the only item of an array, use its children instead
        if (isObjectElement(child) &&
            isArrayElement(child.parent) &&
            child.parent.items === child) {
            return getChildren(child);
        }
        return [child];
    });
};
export var SchemaTreeView = function (_a) {
    var schema = _a.schema;
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: 'h6', color: 'inherit', noWrap: true }, "Controls"),
        schema !== undefined ? (React.createElement(StyledTreeView, { defaultExpanded: [''] },
            React.createElement(SchemaTreeItem, { schemaElement: schema }))) : (React.createElement(NoSchema, null))));
};
var NoSchema = function () { return React.createElement("div", null, "No JSON Schema available"); };
//# sourceMappingURL=SchemaTree.js.map