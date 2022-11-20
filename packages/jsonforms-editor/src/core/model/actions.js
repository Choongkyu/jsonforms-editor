export var SET_SCHEMA = 'jsonforms-editor/SET_SCHEMA';
export var SET_UISCHEMA = 'jsonforms-editor/SET_UISCHEMA';
export var SET_SCHEMAS = 'jsonforms-editor/SET_SCHEMAS';
export var ADD_SCOPED_ELEMENT_TO_LAYOUT = 'jsonforms-editor/ADD_SCOPED_ELEMENT_TO_LAYOUT';
export var ADD_UNSCOPED_ELEMENT_TO_LAYOUT = 'jsonforms-editor/ADD_UNSCOPED_ELEMENT_TO_LAYOUT';
export var MOVE_UISCHEMA_ELEMENT = 'jsonforms-editor/MOVE_UISCHEMA_ELEMENT';
export var REMOVE_UISCHEMA_ELEMENT = 'jsonforms-editor/REMOVE_UISCHEMA_ELEMENT';
export var UPDATE_UISCHEMA_ELEMENT = 'jsonforms-editor/UPDATE_UISCHEMA_ELEMENT';
export var ADD_DETAIL = 'jsonforms-editor/ADD_DETAIL';
var setSchema = function (schema) { return ({
    type: SET_SCHEMA,
    schema: schema,
}); };
var setUiSchema = function (uiSchema) { return ({
    type: SET_UISCHEMA,
    uiSchema: uiSchema,
}); };
var setSchemas = function (schema, uiSchema) { return ({
    type: SET_SCHEMAS,
    schema: schema,
    uiSchema: uiSchema,
}); };
var addScopedElementToLayout = function (uiSchemaElement, layoutUUID, index, schemaUUID) { return ({
    type: ADD_SCOPED_ELEMENT_TO_LAYOUT,
    uiSchemaElement: uiSchemaElement,
    layoutUUID: layoutUUID,
    index: index,
    schemaUUID: schemaUUID,
}); };
var addUnscopedElementToLayout = function (uiSchemaElement, layoutUUID, index) { return ({
    type: ADD_UNSCOPED_ELEMENT_TO_LAYOUT,
    uiSchemaElement: uiSchemaElement,
    layoutUUID: layoutUUID,
    index: index,
}); };
var moveUiSchemaElement = function (elementUUID, newContainerUUID, index, schemaUUID) { return ({
    type: MOVE_UISCHEMA_ELEMENT,
    elementUUID: elementUUID,
    newContainerUUID: newContainerUUID,
    index: index,
    schemaUUID: schemaUUID,
}); };
var removeUiSchemaElement = function (elementUUID) { return ({
    type: REMOVE_UISCHEMA_ELEMENT,
    elementUUID: elementUUID,
}); };
var updateUISchemaElement = function (elementUUID, changedProperties) { return ({ type: UPDATE_UISCHEMA_ELEMENT, elementUUID: elementUUID, changedProperties: changedProperties }); };
var addDetail = function (uiSchemaElementId, detail) { return ({
    type: ADD_DETAIL,
    uiSchemaElementId: uiSchemaElementId,
    detail: detail,
}); };
export var Actions = {
    setSchema: setSchema,
    setUiSchema: setUiSchema,
    setSchemas: setSchemas,
    addScopedElementToLayout: addScopedElementToLayout,
    addUnscopedElementToLayout: addUnscopedElementToLayout,
    moveUiSchemaElement: moveUiSchemaElement,
    removeUiSchemaElement: removeUiSchemaElement,
    updateUISchemaElement: updateUISchemaElement,
    addDetail: addDetail,
};
//# sourceMappingURL=actions.js.map