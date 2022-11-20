/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { FormControlLabel, IconButton, Switch, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { ErrorDialog } from '../../core/components/ErrorDialog';
import { copyToClipBoard } from '../../core/util/clipboard';
import { env } from '../../env';
import { JsonEditorDialog } from '../../text-editor';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
export var SchemaJson = function (_a) {
    var title = _a.title, schema = _a.schema, debugSchema = _a.debugSchema, type = _a.type, updateSchema = _a.updateSchema;
    var _b = useState(false), showSchemaEditor = _b[0], setShowSchemaEditor = _b[1];
    var _c = useState(''), updateErrorText = _c[0], setUpdateErrorText = _c[1];
    var showDebugControls = debugSchema && env().DEBUG === 'true';
    var _d = useState(!!showDebugControls), showDebugSchema = _d[0], setShowDebugSchema = _d[1];
    var showErrorDialog = Boolean(updateErrorText);
    var onApply = function (newSchema) {
        var updateResult = updateSchema(newSchema);
        if (updateResult.success) {
            setShowSchemaEditor(false);
            return;
        }
        setUpdateErrorText(updateResult.message);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Toolbar, null,
            React.createElement(IconButton, { onClick: function () {
                    return copyToClipBoard(showDebugSchema && debugSchema ? debugSchema : schema);
                }, "data-cy": 'copy-clipboard' },
                React.createElement(FileCopyIcon, null)),
            React.createElement(IconButton, { onClick: function () { return setShowSchemaEditor(true); }, "data-cy": 'edit-schema' },
                React.createElement(EditIcon, null)),
            showDebugControls ? (React.createElement(FormControlLabel, { control: React.createElement(Switch, { "data-cy": 'debug-toggle', checked: showDebugSchema, onChange: function () { return setShowDebugSchema(function (showDebug) { return !showDebug; }); }, color: 'primary' }), label: 'Debug' })) : null),
        React.createElement("pre", { "data-cy": 'schema-text' }, showDebugSchema ? debugSchema : schema),
        showSchemaEditor && (React.createElement(JsonEditorDialog, { open: true, title: title, initialContent: schema, type: type, onCancel: function () { return setShowSchemaEditor(false); }, onApply: onApply })),
        showErrorDialog && (React.createElement(ErrorDialog, { open: true, title: 'Update Error', text: updateErrorText, onClose: function () { return setUpdateErrorText(''); } }))));
};
//# sourceMappingURL=SchemaJson.js.map