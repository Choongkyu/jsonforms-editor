/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { createAjv } from '@jsonforms/core';
import { materialCells, materialRenderers, } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import React, { useMemo } from 'react';
import { useSchema } from '../../../core/context';
import { generateEmptyData } from '../../../core/model';
import { useExportSchema, useExportUiSchema } from '../../../core/util/hooks';
import { previewOptions } from './options';
export var ReactMaterialPreview = function () {
    var schema = useExportSchema();
    var uischema = useExportUiSchema();
    var editorSchema = useSchema();
    var previewData = useMemo(function () { return (editorSchema ? generateEmptyData(editorSchema) : {}); }, [editorSchema]);
    var ajv = createAjv(previewOptions);
    return (React.createElement(JsonForms, { ajv: ajv, data: previewData, schema: schema, uischema: uischema, renderers: materialRenderers, cells: materialCells }));
};
//# sourceMappingURL=ReactMaterialPreview.js.map