/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { isLayout, } from '@jsonforms/core';
import { cloneDeep } from 'lodash';
import { v4 as uuid } from 'uuid';
import { calculatePath, getRoot, isEditorControl, isEditorLayout, isPathError, traverse, } from '../util/schemasUtil';
import { getHierarchy } from '../util/tree';
export var getUiSchemaChildren = function (schemaElement) {
    var children = [];
    if (isEditorLayout(schemaElement)) {
        children.push.apply(children, schemaElement.elements);
    }
    return children;
};
export var hasChildren = function (schemaElement) {
    return isLayout(schemaElement) && !!schemaElement.elements.length;
};
/**
 * Creates a copy of the given ui schema enriched with editor fields
 * like 'parent' and 'linked schema elements'.
 */
export var buildEditorUiSchemaTree = function (uiSchema) {
    // cast to any so we can freely modify it
    var editorUiSchema = cloneDeep(uiSchema);
    traverse(editorUiSchema, function (current, parent) {
        if (current) {
            current.parent = parent;
            current.uuid = uuid();
        }
    });
    return editorUiSchema;
};
/**
 * Creates a copy of the given enriched ui schema and removes all editor
 * related fields.
 */
export var buildUiSchema = function (uiSchema) {
    var clone = cloneDeep(uiSchema);
    traverse(clone, function (current) {
        delete current.parent;
        delete current.linkedSchemaElement;
        delete current.uuid;
    });
    return clone;
};
export var buildDebugUISchema = function (uiSchema) {
    var clone = cloneDeep(uiSchema);
    traverse(clone, function (current) {
        var _a;
        current.parent = (_a = current.parent) === null || _a === void 0 ? void 0 : _a.uuid;
    });
    return clone;
};
export var getUISchemaPath = function (uiSchema) {
    var root = getRoot(uiSchema);
    var path = calculatePath(root, uiSchema);
    if (isPathError(path)) {
        return path;
    }
    // TODO should be done in a cleaner way
    return "/".concat(path.join('/'));
};
/**
 * Returns the closes element whose detail contains the given element
 */
export var getDetailContainer = function (element) {
    var _a;
    var parentIsDetail = function (el) { var _a, _b, _c; return ((_c = (_b = (_a = el.parent) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.uuid) === el.uuid; };
    return (_a = getHierarchy(element).find(parentIsDetail)) === null || _a === void 0 ? void 0 : _a.parent;
};
/**
 * Indicates whether the given ui schema element is a control or contains controls
 */
export var containsControls = function (element) {
    return traverse(element, function (el, _parent, acc) {
        if (isEditorControl(el)) {
            acc.containsControls = true;
        }
    }, { containsControls: false }).containsControls;
};
export var cleanUiSchemaLinks = function (element) {
    if (!element) {
        return element;
    }
    traverse(element, function (current) {
        delete current.linkedSchemaElement;
        return current;
    });
    return element;
};
//# sourceMappingURL=uischema.js.map