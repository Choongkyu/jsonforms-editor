/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
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
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useMemo } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { configureJsonSchemaValidation, getMonacoModelForUri, } from '../jsonSchemaValidation';
import { DialogContent, Typography } from '@mui/material';
var Transition = React.forwardRef(function Transition(props, ref) {
    return React.createElement(Fade, __assign({ ref: ref }, props));
});
export var JsonEditorDialog = function (_a) {
    var open = _a.open, title = _a.title, initialContent = _a.initialContent, type = _a.type, onApply = _a.onApply, onCancel = _a.onCancel;
    var modelUri = Uri.parse('json://core/specification/schema.json');
    var configureEditor = useCallback(function (editor) {
        if (type === 'JSON Schema') {
            configureJsonSchemaValidation(editor, modelUri);
        }
    }, [type, modelUri]);
    var model = useMemo(function () { return getMonacoModelForUri(modelUri, initialContent); }, [initialContent, modelUri]);
    var setModel = useCallback(function (editor) {
        if (!model.isDisposed()) {
            editor.setModel(model);
        }
    }, [model]);
    return (React.createElement(Dialog, { open: open, onClose: onCancel, TransitionComponent: Transition, sx: {
            paper: {
                height: '100%',
                minHeight: '95vh',
                maxHeight: '95vh',
            },
        }, maxWidth: 'lg', fullWidth: true },
        React.createElement(AppBar, { sx: { position: 'relative' } },
            React.createElement(Toolbar, { sx: {
                    display: 'flex',
                    justifyContent: 'space-between',
                } },
                React.createElement(IconButton, { edge: 'start', color: 'inherit', onClick: onCancel, "aria-label": 'cancel', "data-cy": 'cancel' },
                    React.createElement(CloseIcon, null)),
                React.createElement(Typography, { variant: 'h6', color: 'inherit', noWrap: true },
                    title,
                    " Text Edit"),
                React.createElement(Button, { variant: 'contained', onClick: function () { return onApply(model.getValue()); }, "data-cy": 'apply' }, "Apply"))),
        React.createElement(DialogContent, { sx: {
                overflow: 'hidden',
                marginTop: function (theme) { return theme.spacing(2); },
                flex: 1,
            } },
            React.createElement(MonacoEditor, { language: 'json', editorDidMount: function (editor) {
                    setModel(editor);
                    editor.focus();
                }, editorWillMount: configureEditor }))));
};
//# sourceMappingURL=JsonEditorDialog.js.map