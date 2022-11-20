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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { rankWith, uiTypeIs, } from '@jsonforms/core';
import { ResolvedJsonFormsDispatch, withJsonFormsLayoutProps, } from '@jsonforms/react';
import { Grid } from '@mui/material';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSchema } from '../context';
import { canDropIntoLayout, canMoveSchemaElementTo, MOVE_UI_SCHEMA_ELEMENT, NEW_UI_SCHEMA_ELEMENT, } from '../dnd';
import { Actions } from '../model';
import { getUISchemaPath, } from '../model/uischema';
import { isPathError } from '../util/schemasUtil';
import { DroppableElementRegistration } from './DroppableElement';
export var DroppableLayout = function (_a) {
    var schema = _a.schema, layout = _a.layout, path = _a.path, direction = _a.direction, renderers = _a.renderers, cells = _a.cells;
    return (React.createElement(Grid, { container: true, direction: direction, spacing: direction === 'row' ? 2 : 0, wrap: 'nowrap' },
        React.createElement(DropPoint, { index: 0, layout: layout, key: "".concat(path, "-").concat(0, "-drop") }),
        layout.elements.map(function (child, index) { return (React.createElement(React.Fragment, { key: "".concat(path, "-").concat(index, "-fragment") },
            React.createElement(Grid, { item: true, key: "".concat(path, "-").concat(index), sx: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }, xs: true },
                React.createElement(ResolvedJsonFormsDispatch, { uischema: child, schema: schema, path: path, renderers: renderers && __spreadArray(__spreadArray([], renderers, true), [DroppableElementRegistration], false), cells: cells })),
            React.createElement(DropPoint, { index: index + 1, layout: layout, key: "".concat(path, "-").concat(index + 1, "-drop") }))); })));
};
var DropPoint = function (_a) {
    var layout = _a.layout, index = _a.index;
    var dispatch = useDispatch();
    var rootSchema = useSchema();
    var _b = useDrop({
        accept: [NEW_UI_SCHEMA_ELEMENT, MOVE_UI_SCHEMA_ELEMENT],
        canDrop: function (item, monitor) {
            switch (item.type) {
                case NEW_UI_SCHEMA_ELEMENT:
                    return canDropIntoLayout(item, rootSchema, layout);
                case MOVE_UI_SCHEMA_ELEMENT:
                    return canMoveSchemaElementTo(item, layout, index);
            }
        },
        collect: function (mon) {
            var _a, _b;
            return ({
                isOver: !!mon.isOver() && mon.canDrop(),
                uiSchemaElement: (_a = mon.getItem()) === null || _a === void 0 ? void 0 : _a.uiSchemaElement,
                schemaUUID: (_b = mon.getItem()) === null || _b === void 0 ? void 0 : _b.schemaUUID,
            });
        },
        drop: function (item) {
            switch (item.type) {
                case NEW_UI_SCHEMA_ELEMENT:
                    schemaUUID
                        ? dispatch(Actions.addScopedElementToLayout(uiSchemaElement, layout.uuid, index, schemaUUID))
                        : dispatch(Actions.addUnscopedElementToLayout(uiSchemaElement, layout.uuid, index));
                    break;
                case MOVE_UI_SCHEMA_ELEMENT:
                    dispatch(Actions.moveUiSchemaElement(uiSchemaElement.uuid, layout.uuid, index, schemaUUID));
                    break;
            }
        },
    }), _c = _b[0], isOver = _c.isOver, uiSchemaElement = _c.uiSchemaElement, schemaUUID = _c.schemaUUID, drop = _b[1];
    var fillWidth = layout.type !== 'HorizontalLayout' || layout.elements.length === 0;
    return (React.createElement(Grid, { item: true, container: true, ref: drop, sx: {
            padding: function (theme) { return theme.spacing(1); },
            backgroundImage: isOver
                ? 'radial-gradient(#c8c8c8 1px, transparent 1px)'
                : 'none',
            backgroundSize: 'calc(10 * 1px) calc(10 * 1px)',
            backgroundClip: 'content-box',
            minWidth: '2em',
            minHeight: isOver ? '8em' : '2em',
            maxWidth: fillWidth || isOver ? 'inherit' : '2em',
        }, "data-cy": "".concat(getDataPath(layout), "-drop-").concat(index), xs: true }));
};
var getDataPath = function (uischema) {
    var path = getUISchemaPath(uischema);
    if (isPathError(path)) {
        console.error('Could not calculate data-cy path for DropPoint', path);
        return '';
    }
    return path;
};
var createRendererInDirection = function (direction) {
    return function (_a) {
        var uischema = _a.uischema, path = _a.path, renderers = _a.renderers, props = __rest(_a, ["uischema", "path", "renderers"]);
        var layout = uischema;
        return (React.createElement(DroppableLayout, __assign({}, props, { path: path, layout: layout, direction: direction, renderers: renderers })));
    };
};
export var DroppableHorizontalLayoutRegistration = {
    tester: rankWith(45, uiTypeIs('HorizontalLayout')),
    renderer: withJsonFormsLayoutProps(createRendererInDirection('row')),
};
export var DroppableVerticalLayoutRegistration = {
    tester: rankWith(45, uiTypeIs('VerticalLayout')),
    renderer: withJsonFormsLayoutProps(createRendererInDirection('column')),
};
//# sourceMappingURL=DroppableLayout.js.map