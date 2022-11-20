/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDrag } from 'react-dnd';
import { OkCancelDialog } from '../../core/components/OkCancelDialog';
import { useDispatch, useSchema, useSelection } from '../../core/context';
import { DndItems } from '../../core/dnd';
import { SchemaIcon, UISchemaIcon } from '../../core/icons';
import { Actions } from '../../core/model';
import { getUISchemaPath, hasChildren, } from '../../core/model/uischema';
import { isEditorControl, tryFindByUUID } from '../../core/util/schemasUtil';
export var EditorElement = function (_a) {
    var _b;
    var wrappedElement = _a.wrappedElement, elementIcon = _a.elementIcon, children = _a.children;
    var schema = useSchema();
    var _c = useSelection(), selection = _c[0], setSelection = _c[1];
    var dispatch = useDispatch();
    var _d = React.useState(false), openConfirmRemoveDialog = _d[0], setOpenConfirmRemoveDialog = _d[1];
    var elementSchema = tryFindByUUID(schema, wrappedElement.linkedSchemaElement);
    var _e = useDrag({
        type: 'Grid',
        item: DndItems.moveUISchemaElement(wrappedElement, elementSchema),
        collect: function (monitor) { return ({
            isDragging: !!monitor.isDragging(),
        }); },
    }), isDragging = _e[0].isDragging, drag = _e[1];
    var uiPath = getUISchemaPath(wrappedElement);
    var isSelected = (selection === null || selection === void 0 ? void 0 : selection.uuid) === wrappedElement.uuid;
    var ruleEffect = (_b = wrappedElement.rule) === null || _b === void 0 ? void 0 : _b.effect.toLocaleUpperCase();
    var icon = elementIcon !== null && elementIcon !== void 0 ? elementIcon : (elementSchema ? (React.createElement(SchemaIcon, { type: elementSchema.type })) : (React.createElement(UISchemaIcon, { type: wrappedElement.type })));
    return (React.createElement(Grid, { item: true, "data-cy": "editorElement-".concat(uiPath), sx: {
            border: isSelected ? '1px solid #a9a9a9' : '1px solid #d3d3d3',
            padding: function (theme) { return theme.spacing(1); },
            opacity: isDragging ? 0.5 : 1,
            backgroundColor: isSelected ? 'rgba(63, 81, 181, 0.08)' : '#fafafa',
            width: '100%',
            alignSelf: 'baseline',
            minWidth: 'fit-content',
        }, ref: drag, onClick: function (event) {
            event.stopPropagation();
            var newSelection = { uuid: wrappedElement.uuid };
            setSelection(newSelection);
        } },
        React.createElement(Grid, { item: true, container: true, direction: 'row', wrap: 'nowrap', sx: {
                '&:hover $elementControls': {
                    opacity: 1,
                },
            }, "data-cy": "editorElement-".concat(uiPath, "-header") },
            React.createElement(Grid, { item: true, container: true, alignItems: 'center', xs: true },
                icon,
                ruleEffect ? (React.createElement(Grid, { item: true, container: true, direction: 'row', alignItems: 'center', wrap: 'nowrap', xs: true },
                    React.createElement(Typography, { variant: 'subtitle2', sx: {
                            fontWeight: 'bolder',
                            color: function (theme) { return theme.palette.text.primary; },
                            marginRight: function (theme) { return theme.spacing(0.5); },
                            marginLeft: function (theme) { return theme.spacing(1); },
                        } }, 'R'),
                    React.createElement(Typography, { variant: 'caption', sx: {
                            fontStyle: 'italic',
                            color: function (theme) { return theme.palette.text.secondary; },
                        } }, "(".concat(ruleEffect, ")")))) : null,
                isEditorControl(wrappedElement) && (React.createElement(Grid, { item: true, container: true, direction: 'row', alignItems: 'center', wrap: 'nowrap', xs: true },
                    React.createElement(Typography, { variant: 'caption', sx: {
                            fontStyle: 'italic',
                            color: function (theme) { return theme.palette.text.secondary; },
                        } }, wrappedElement.scope)))),
            React.createElement(Grid, { item: true, container: true, sx: {
                    opacity: 0,
                }, justifyContent: 'flex-end', alignItems: 'center', xs: true },
                React.createElement(IconButton, { "data-cy": "editorElement-".concat(uiPath, "-removeButton"), size: 'small', onClick: function () {
                        hasChildren(wrappedElement)
                            ? setOpenConfirmRemoveDialog(true)
                            : dispatch(Actions.removeUiSchemaElement(wrappedElement.uuid));
                    } },
                    React.createElement(DeleteIcon, null)),
                React.createElement(OkCancelDialog, { open: openConfirmRemoveDialog, text: 'Remove element and all its contents from the UI Schema?', onOk: function () {
                        dispatch(Actions.removeUiSchemaElement(wrappedElement.uuid));
                        setOpenConfirmRemoveDialog(false);
                    }, onCancel: function () { return setOpenConfirmRemoveDialog(false); } }))),
        children));
};
//# sourceMappingURL=EditorElement.js.map