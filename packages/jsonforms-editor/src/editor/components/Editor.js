import { materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Grid } from '@mui/material';
import React from 'react';
import { useUiSchema } from '../../core/context';
import { useExportSchema } from '../../core/util/hooks';
import { EmptyEditor } from './EmptyEditor';
export var Editor = function (_a) {
    var editorRenderers = _a.editorRenderers;
    var schema = useExportSchema();
    var uiSchema = useUiSchema();
    return uiSchema ? (React.createElement(Grid, { container: true },
        React.createElement(JsonForms, { data: {}, schema: schema, uischema: uiSchema, renderers: editorRenderers, cells: materialCells }))) : (React.createElement(EmptyEditor, null));
};
//# sourceMappingURL=Editor.js.map