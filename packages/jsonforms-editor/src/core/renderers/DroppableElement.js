/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { rankWith } from '@jsonforms/core';
import { ResolvedJsonFormsDispatch } from '@jsonforms/react';
import { omit } from 'lodash';
import React, { useMemo } from 'react';
import { EditorElement } from '../../editor/components/EditorElement';
var DroppableElement = function (_a) {
    var uischema = _a.uischema, schema = _a.schema, path = _a.path, renderers = _a.renderers, cells = _a.cells;
    var editorUiSchema = useMemo(function () { return omit(uischema, ['rule']); }, [uischema]);
    return (React.createElement(EditorElement, { wrappedElement: uischema },
        React.createElement(ResolvedJsonFormsDispatch, { uischema: editorUiSchema, schema: schema, path: path, renderers: renderers === null || renderers === void 0 ? void 0 : renderers.filter(function (r) { return r.renderer !== DroppableElementRenderer; }), cells: cells })));
};
var DroppableElementRenderer = DroppableElement;
export var DroppableElementRegistration = {
    tester: rankWith(50, function () { return true; }),
    renderer: DroppableElementRenderer,
};
//# sourceMappingURL=DroppableElement.js.map