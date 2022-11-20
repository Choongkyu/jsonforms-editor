/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React from 'react';
import { useDispatch, useSchema } from '../../core/context';
import { Actions, toPrintableObject } from '../../core/model';
import { jsonToText, useExportSchema } from '../../core/util';
import { env } from '../../env';
import { SchemaJson } from './SchemaJson';
export var JsonSchemaPanel = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'JSON Schema' : _b;
    var dispatch = useDispatch();
    var exportSchema = useExportSchema();
    var schema = useSchema();
    var showDebugSchema = env().DEBUG === 'true';
    var handleSchemaUpdate = function (newSchema) {
        try {
            var newSchemaObject = JSON.parse(newSchema);
            dispatch(Actions.setSchema(newSchemaObject));
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
    return (React.createElement(SchemaJson, { title: title, schema: jsonToText(exportSchema), debugSchema: schema && showDebugSchema
            ? jsonToText(toPrintableObject(schema))
            : undefined, type: 'JSON Schema', updateSchema: handleSchemaUpdate }));
};
//# sourceMappingURL=JsonSchemaPanel.js.map