/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React from 'react';
import { useDispatch, useUiSchema } from '../../core/context';
import { Actions } from '../../core/model';
import { buildDebugUISchema } from '../../core/model/uischema';
import { jsonToText, useExportUiSchema } from '../../core/util';
import { env } from '../../env';
import { SchemaJson } from './SchemaJson';
export var UISchemaPanel = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'UI Schema' : _b;
    var dispatch = useDispatch();
    var exportUiSchema = useExportUiSchema();
    var uiSchema = useUiSchema();
    var showDebugSchema = env().DEBUG === 'true';
    var handleUiSchemaUpdate = function (newUiSchema) {
        try {
            var newUiSchemaObject = JSON.parse(newUiSchema);
            dispatch(Actions.setUiSchema(newUiSchemaObject));
            return {
                success: true,
            };
        }
        catch (error) {
            if (error instanceof SyntaxError) {
                return {
                    success: false,
                    message: error.message,
                };
            }
            // unknown error type
            throw error;
        }
    };
    return (React.createElement(SchemaJson, { title: title, schema: jsonToText(exportUiSchema), debugSchema: uiSchema && showDebugSchema
            ? jsonToText(buildDebugUISchema(uiSchema))
            : undefined, type: 'UI Schema', updateSchema: handleUiSchemaUpdate }));
};
//# sourceMappingURL=UISchemaPanel.js.map