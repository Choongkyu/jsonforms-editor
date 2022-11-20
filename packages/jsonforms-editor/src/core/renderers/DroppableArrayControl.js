/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { isObjectArrayControl, rankWith, } from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsArrayControlProps, } from '@jsonforms/react';
import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSchema } from '../context';
import { canDropIntoScope, MOVE_UI_SCHEMA_ELEMENT, NEW_UI_SCHEMA_ELEMENT, } from '../dnd';
import { Actions } from '../model';
import { containsControls } from '../model/uischema';
import { DroppableElementRegistration } from './DroppableElement';
var DroppableArrayControl = function (_a) {
    var _b;
    var uischema = _a.uischema, schema = _a.schema, path = _a.path, renderers = _a.renderers, cells = _a.cells;
    var dispatch = useDispatch();
    var rootSchema = useSchema();
    var _c = useDrop({
        accept: [NEW_UI_SCHEMA_ELEMENT, MOVE_UI_SCHEMA_ELEMENT],
        canDrop: function (item) {
            switch (item.type) {
                case NEW_UI_SCHEMA_ELEMENT:
                    return canDropIntoScope(item, rootSchema, uischema);
                case MOVE_UI_SCHEMA_ELEMENT:
                    // move as a new detail is only allowed when there are no controls
                    return !containsControls(uiSchemaElement);
            }
        },
        collect: function (mon) {
            var _a;
            return ({
                isOver: !!mon.isOver() && mon.canDrop(),
                uiSchemaElement: (_a = mon.getItem()) === null || _a === void 0 ? void 0 : _a.uiSchemaElement,
            });
        },
        drop: function (item) {
            switch (item.type) {
                case NEW_UI_SCHEMA_ELEMENT:
                    dispatch(Actions.addDetail(uischema.uuid, uiSchemaElement));
                    break;
                case MOVE_UI_SCHEMA_ELEMENT:
                    dispatch(Actions.moveUiSchemaElement(uiSchemaElement.uuid, uischema.uuid, 0));
                    break;
            }
        },
    }), _d = _c[0], isOver = _d.isOver, uiSchemaElement = _d.uiSchemaElement, drop = _c[1];
    // DroppableControl removed itself before dispatching to us, we need
    // to re-add it for our children
    var renderersToUse = useMemo(function () {
        return renderers && __spreadArray(__spreadArray([], renderers, true), [DroppableElementRegistration], false);
    }, [renderers]);
    if (!((_b = uischema.options) === null || _b === void 0 ? void 0 : _b.detail)) {
        return (React.createElement(Typography, { ref: drop, sx: {
                padding: 10,
                fontSize: isOver ? '1.1em' : '1em',
                border: isOver ? '1px solid #D3D3D3' : 'none',
            } }, "Default array layout. Drag and drop an item here to customize array layout."));
    }
    return (React.createElement(JsonFormsDispatch, { schema: schema, uischema: uischema.options.detail, path: path, renderers: renderersToUse, cells: cells }));
};
export var DroppableArrayControlRegistration = {
    tester: rankWith(40, isObjectArrayControl),
    renderer: withJsonFormsArrayControlProps(DroppableArrayControl),
};
//# sourceMappingURL=DroppableArrayControl.js.map