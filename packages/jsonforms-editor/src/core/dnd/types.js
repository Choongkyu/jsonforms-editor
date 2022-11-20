/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { getArrayContainer } from '../model';
import { containsControls, getDetailContainer, } from '../model/uischema';
import { tryFindByUUID } from '../util/schemasUtil';
import { getHierarchy } from '../util/tree';
export var NEW_UI_SCHEMA_ELEMENT = 'newUiSchemaElement';
export var MOVE_UI_SCHEMA_ELEMENT = 'moveUiSchemaElement';
var newUISchemaElement = function (uiSchemaElement, schemaUUID) { return ({
    type: NEW_UI_SCHEMA_ELEMENT,
    uiSchemaElement: uiSchemaElement,
    schemaUUID: schemaUUID,
}); };
var moveUISchemaElement = function (uiSchemaElement, schema) { return ({
    type: MOVE_UI_SCHEMA_ELEMENT,
    uiSchemaElement: uiSchemaElement,
    schema: schema,
}); };
export var DndItems = { newUISchemaElement: newUISchemaElement, moveUISchemaElement: moveUISchemaElement };
export var canDropIntoLayout = function (item, rootSchema, layout) {
    // check scope changes
    var detailContainer = getDetailContainer(layout);
    return canDropIntoScope(item, rootSchema, detailContainer);
};
/**
 * Check whether the element to drop fits into the given scope,
 * e.g. whether a nested array object is dropped into the correct array ui schema control.
 *
 * @param item the drag and drop item
 * @param scopeUISchemaElement the nearest scope changing element,
 * e.g. the nearest array control into which shall be dropped.
 * Use `undefined` when dropping outside of any scope changing element.
 */
export var canDropIntoScope = function (item, rootSchema, scopeUISchemaElement) {
    var controlObject = tryFindByUUID(rootSchema, item.schemaUUID);
    if (controlObject) {
        var scopeSchemaElement = getScopeChangingContainer(controlObject);
        if (!scopesMatch(scopeSchemaElement, scopeUISchemaElement)) {
            return false;
        }
    }
    return true;
};
/**
 * Scopes match if they are linked or both don't exist.
 */
var scopesMatch = function (schemaScope, uiScope) {
    return (uiScope === null || uiScope === void 0 ? void 0 : uiScope.linkedSchemaElement) === (schemaScope === null || schemaScope === void 0 ? void 0 : schemaScope.uuid);
};
/**
 * Returns the closest scope changing schema container
 */
var getScopeChangingContainer = function (element) {
    // TODO check other cases than array
    return getArrayContainer(element);
};
export var canMoveSchemaElementTo = function (item, target, index) {
    var elementToMove = item.uiSchemaElement;
    return (!isMoveRoot(elementToMove) &&
        !isMoveIntoItself(elementToMove, target) &&
        !isMoveNextToItself(elementToMove, target, index) &&
        !isMovingControlsInterScopes(elementToMove, target));
};
var isMoveRoot = function (elementToMove) {
    return !elementToMove.parent;
};
var isMoveIntoItself = function (elementToMove, target) { return getHierarchy(target).includes(elementToMove); };
var isMoveNextToItself = function (elementToMove, target, index) {
    if (target === elementToMove.parent) {
        var currentIndex = target.elements.indexOf(elementToMove);
        if (currentIndex === index || currentIndex === index - 1) {
            return true;
        }
    }
    return false;
};
var isMovingControlsInterScopes = function (elementToMove, target) {
    return containsControls(elementToMove) &&
        getDetailContainer(elementToMove) !== getDetailContainer(target);
};
//# sourceMappingURL=types.js.map