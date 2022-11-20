/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React from 'react';
import { useExportSchema, useExportUiSchema } from '../../core/util/hooks';
export var EditorPreview = function () {
    var schema = useExportSchema();
    var uiSchema = useExportUiSchema();
    var inputSchema = JSON.stringify(schema);
    var inputUISchema = JSON.stringify(uiSchema);
    return inputUISchema && inputSchema ? (React.createElement("div", null,
        React.createElement("ng-jsonforms", { uischema: inputUISchema, schema: inputSchema }))) : null;
};
//# sourceMappingURL=EditorPreview.js.map