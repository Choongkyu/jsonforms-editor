/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Typography } from '@mui/material';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from '../../core/context';
import { NEW_UI_SCHEMA_ELEMENT } from '../../core/dnd';
import { Actions } from '../../core/model';
import { styled } from '@mui/system';
export var EmptyEditor = function () {
    var dispatch = useDispatch();
    var _a = useDrop({
        accept: NEW_UI_SCHEMA_ELEMENT,
        collect: function (mon) {
            var _a;
            return ({
                isOver: !!mon.isOver(),
                uiSchemaElement: (_a = mon.getItem()) === null || _a === void 0 ? void 0 : _a.uiSchemaElement,
            });
        },
        drop: function () {
            dispatch(Actions.setUiSchema(uiSchemaElement));
        },
    }), _b = _a[0], isOver = _b.isOver, uiSchemaElement = _b.uiSchemaElement, drop = _a[1];
    var Top = styled('div')(function () { return "\n    padding: 10;\n    fontSize: ".concat(isOver ? '1.1em' : '1em', ";\n    border: ").concat(isOver ? '1px solid #D3D3D3' : 'none', ";\n    height: '100%';\n  "); });
    return (React.createElement(Top, { ref: drop },
        React.createElement(Typography, { "data-cy": "nolayout-drop" }, "Drag and drop an element from the Palette to begin.")));
};
//# sourceMappingURL=EmptyEditor.js.map