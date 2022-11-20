/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React, { useContext } from 'react';
/**We always use a provider so default can be undefined*/
var defaultContext = undefined;
export var EditorContextInstance = React.createContext(defaultContext);
export var useEditorContext = function () {
    return useContext(EditorContextInstance);
};
export var useGitLabService = function () {
    var schemaService = useEditorContext().schemaService;
    return schemaService;
};
export var useSchema = function () {
    var schema = useEditorContext().schema;
    return schema;
};
export var useUiSchema = function () {
    var uiSchema = useEditorContext().uiSchema;
    return uiSchema;
};
export var useSelection = function () {
    var _a = useEditorContext(), selection = _a.selection, setSelection = _a.setSelection;
    return [selection, setSelection];
};
export var useDispatch = function () {
    var dispatch = useEditorContext().dispatch;
    return dispatch;
};
export var usePaletteService = function () {
    var paletteService = useEditorContext().paletteService;
    return paletteService;
};
export var usePropertiesService = function () {
    var propertiesService = useEditorContext().propertiesService;
    return propertiesService;
};
export var useCategorizationService = function () {
    var categorizationService = useEditorContext().categorizationService;
    return categorizationService;
};
//# sourceMappingURL=context.js.map