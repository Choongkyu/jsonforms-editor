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
/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { assign } from 'lodash';
import { withCloneTree, withCloneTrees } from '../util/clone';
import { findByUUID, getRoot, isEditorControl, isEditorLayout, isUUIDError, linkElements, linkSchemas, traverse, } from '../util/schemasUtil';
import { ADD_DETAIL, ADD_SCOPED_ELEMENT_TO_LAYOUT, ADD_UNSCOPED_ELEMENT_TO_LAYOUT, MOVE_UISCHEMA_ELEMENT, REMOVE_UISCHEMA_ELEMENT, SET_SCHEMA, SET_SCHEMAS, SET_UISCHEMA, UPDATE_UISCHEMA_ELEMENT, } from './actions';
import { buildSchemaTree, cleanLinkedElements } from './schema';
import { buildEditorUiSchemaTree, cleanUiSchemaLinks, } from './uischema';
export var uiSchemaReducer = function (uiSchema, action) {
    switch (action.type) {
        case ADD_UNSCOPED_ELEMENT_TO_LAYOUT:
            return uiSchema
                ? withCloneTree(uiSchema, action.layoutUUID, uiSchema, function (newUiSchema) {
                    var newUIElement = action.uiSchemaElement;
                    newUIElement.parent = newUiSchema;
                    newUiSchema.elements.splice(action.index, 0, newUIElement);
                    return getRoot(newUiSchema);
                })
                : uiSchema;
        case UPDATE_UISCHEMA_ELEMENT:
            return uiSchema
                ? withCloneTree(uiSchema, action.elementUUID, uiSchema, function (newUiSchema) {
                    var _a, _b;
                    // options.detail is not part of the editable properties
                    var optionsDetail = (_a = newUiSchema.options) === null || _a === void 0 ? void 0 : _a.detail;
                    assign(newUiSchema, action.changedProperties);
                    if (optionsDetail && !((_b = newUiSchema.options) === null || _b === void 0 ? void 0 : _b.detail)) {
                        newUiSchema.options = newUiSchema.options || {};
                        newUiSchema.options.detail = optionsDetail;
                    }
                    return getRoot(newUiSchema);
                })
                : uiSchema;
    }
    // fallback - do nothing
    return uiSchema;
};
export var combinedReducer = function (state, action) {
    switch (action.type) {
        case SET_SCHEMA:
            return withCloneTree(state.uiSchema, undefined, state, function (clonedUiSchema) {
                return linkSchemas(buildSchemaTree(action.schema), cleanUiSchemaLinks(clonedUiSchema));
            });
        case SET_UISCHEMA:
            return withCloneTree(state.schema, undefined, state, function (clonedSchema) {
                var _a;
                (_a = state.categorizationService) === null || _a === void 0 ? void 0 : _a.clearTabSelections();
                return linkSchemas(cleanLinkedElements(clonedSchema), buildEditorUiSchemaTree(action.uiSchema));
            });
        case SET_SCHEMAS:
            return linkSchemas(buildSchemaTree(action.schema), buildEditorUiSchemaTree(action.uiSchema));
        case ADD_SCOPED_ELEMENT_TO_LAYOUT:
            return withCloneTrees(state.uiSchema, action.layoutUUID, state.schema, action.schemaUUID, state, function (newUiSchema, newSchema) {
                var newUIElement = action.uiSchemaElement;
                newUIElement.parent = newUiSchema;
                newUiSchema.elements.splice(action.index, 0, newUIElement);
                if (!newSchema || !linkElements(newUIElement, newSchema)) {
                    console.error('Could not add new UI element', newUIElement);
                    return state;
                }
                return {
                    schema: getRoot(newSchema),
                    uiSchema: getRoot(newUiSchema),
                };
            });
        case MOVE_UISCHEMA_ELEMENT:
            return withCloneTrees(state.uiSchema, action.newContainerUUID, state.schema, action.schemaUUID, state, function (newContainer, newSchema) {
                var _a;
                var elementToMove = findByUUID(newContainer, action.elementUUID);
                if (isUUIDError(elementToMove)) {
                    console.error('Could not find corresponding element ', elementToMove);
                    return state;
                }
                var oldParentUUID = (_a = elementToMove.parent) === null || _a === void 0 ? void 0 : _a.uuid;
                var oldIndexInParent = elementToMove.parent
                    ? elementToMove.parent.elements.indexOf(elementToMove)
                    : -1;
                var removeResult = removeUiElement(elementToMove, newSchema);
                if (isUUIDError(removeResult)) {
                    console.error('Could not remove ui element ', removeResult);
                    return state;
                }
                // link child and new parent
                elementToMove.parent = newContainer;
                if (newContainer && isEditorLayout(newContainer)) {
                    var moveRightInSameParent = action.newContainerUUID === oldParentUUID &&
                        oldIndexInParent !== -1 &&
                        oldIndexInParent < action.index;
                    // we need to adapt the index as we removed the element previously
                    var indexToUse = moveRightInSameParent
                        ? action.index - 1
                        : action.index;
                    newContainer.elements.splice(indexToUse, 0, elementToMove);
                }
                else if (newContainer && isEditorControl(newContainer)) {
                    newContainer.options = __assign(__assign({}, newContainer.options), { detail: elementToMove });
                }
                else {
                    // TODO other cases
                    console.error('Move encountered an invalid case');
                    return state;
                }
                // add linkedUISchemaElements in the schema (for scoped ui elements) if such links existed before
                if (elementToMove.linkedSchemaElement) {
                    // newSchema can't be undefined when the old ui element had links to it
                    (newSchema.linkedUISchemaElements =
                        newSchema.linkedUISchemaElements || new Set()).add(elementToMove.uuid);
                }
                // schema is optional in this action
                var schemaToReturn = action.schemaUUID !== undefined ? getRoot(newSchema) : state.schema;
                return {
                    schema: schemaToReturn,
                    uiSchema: getRoot(newContainer),
                };
            });
        case REMOVE_UISCHEMA_ELEMENT:
            return withCloneTrees(state.uiSchema, action.elementUUID, state.schema, undefined, state, function (elementToRemove, newSchema) {
                if (!elementToRemove) {
                    console.error('Could not remove ui element ', elementToRemove);
                    return state;
                }
                var removeResult = removeUiElement(elementToRemove, newSchema, state.categorizationService);
                if (isUUIDError(removeResult)) {
                    console.error('Could not remove ui element ', removeResult);
                    return state;
                }
                // check whether the element to remove was the root element
                var uiSchemaToReturn = elementToRemove.parent
                    ? getRoot(elementToRemove)
                    : undefined;
                return {
                    schema: newSchema,
                    uiSchema: uiSchemaToReturn,
                };
            });
        case ADD_DETAIL:
            return withCloneTrees(state.schema, undefined, state.uiSchema, undefined, state, function (schema, uiSchema) {
                var elementForDetail = findByUUID(uiSchema, action.uiSchemaElementId);
                if (isUUIDError(elementForDetail)) {
                    console.error('Could not find ui schema element with id', elementForDetail);
                    return state;
                }
                // link all new ui schema elements
                var linkResult = traverse(action.detail, function (uiSchemaElement, _parent, acc) {
                    if (uiSchemaElement.linkedSchemaElement) {
                        var schemaElementToLink = findByUUID(schema, uiSchemaElement.linkedSchemaElement);
                        if (isUUIDError(schemaElementToLink)) {
                            console.error('Could not find schema element with id', schemaElementToLink);
                            acc.error = true;
                        }
                        (schemaElementToLink.linkedUISchemaElements =
                            schemaElementToLink.linkedUISchemaElements || new Set()).add(action.detail.uuid);
                    }
                }, { error: false });
                if (linkResult.error) {
                    return state;
                }
                elementForDetail.options = elementForDetail.options || {};
                elementForDetail.options.detail = action.detail;
                action.detail.parent = elementForDetail;
                return { schema: schema, uiSchema: uiSchema };
            });
    }
    // fallback - do nothing
    return state;
};
/** Removes the given UI element from its tree.
 *  If a SchemaElement is provided, the element to remove will be cleaned up from all linkedUISchemaElements fields in the schema.
 */
var removeUiElement = function (elementToRemove, schema, categorizationService) {
    var _a, _b;
    // remove links to UI element in the schema (if any)
    if (schema && elementToRemove.linkedSchemaElement) {
        var uuidToRemove = elementToRemove.uuid;
        if (!uuidToRemove) {
            return { id: 'noUUIDError', element: elementToRemove };
        }
        var schemaRoot = getRoot(schema);
        var linkedSchemaElement = findByUUID(schemaRoot, elementToRemove.linkedSchemaElement);
        if (!isUUIDError(linkedSchemaElement)) {
            (_a = linkedSchemaElement.linkedUISchemaElements) === null || _a === void 0 ? void 0 : _a.delete(uuidToRemove);
        }
    }
    // remove from parent
    if (elementToRemove.parent) {
        // - case: Layout
        if (elementToRemove.parent.elements) {
            var index = elementToRemove.parent.elements.indexOf(elementToRemove);
            if (index !== -1) {
                elementToRemove.parent.elements.splice(index, 1);
            }
        }
        // - case: element with detail
        if (((_b = elementToRemove.parent.options) === null || _b === void 0 ? void 0 : _b.detail) === elementToRemove) {
            delete elementToRemove.parent.options.detail;
            if (Object.keys(elementToRemove.parent.options).length === 0) {
                delete elementToRemove.parent.options;
            }
        }
        // TODO other cases
    }
    // - case: categorization/category element
    if (elementToRemove.type === 'Categorization' ||
        elementToRemove.type === 'Category') {
        // release the map entry memory
        categorizationService === null || categorizationService === void 0 ? void 0 : categorizationService.removeElement(elementToRemove);
    }
    return true;
};
export var editorReducer = function (state, action) {
    switch (action.type) {
        case ADD_UNSCOPED_ELEMENT_TO_LAYOUT:
        case UPDATE_UISCHEMA_ELEMENT:
            return {
                schema: state.schema,
                uiSchema: uiSchemaReducer(state.uiSchema, action),
                categorizationService: state.categorizationService,
            };
        case SET_SCHEMA:
        case SET_UISCHEMA:
        case SET_SCHEMAS:
        case ADD_SCOPED_ELEMENT_TO_LAYOUT:
        case MOVE_UISCHEMA_ELEMENT:
        case REMOVE_UISCHEMA_ELEMENT:
        case ADD_DETAIL:
            var combinedReducerResult = combinedReducer(state, action);
            // preserve the service
            combinedReducerResult.categorizationService = state.categorizationService;
            return combinedReducerResult;
    }
    // fallback - do nothing
    return state;
};
//# sourceMappingURL=reducer.js.map