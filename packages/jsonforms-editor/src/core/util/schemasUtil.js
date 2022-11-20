var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { isControl, isLayout } from '@jsonforms/core';
import { get } from 'lodash';
export var isCalculatePathError = function (result) {
    return (result === null || result === void 0 ? void 0 : result.id) === 'calulatePathError';
};
export var isGetPathError = function (result) { return (result === null || result === void 0 ? void 0 : result.id) === 'getPathError'; };
export var isPathError = function (result) {
    return isCalculatePathError(result) || isGetPathError(result);
};
export var isNoUUIDError = function (result) { return (result === null || result === void 0 ? void 0 : result.id) === 'noUUIDError'; };
export var isGetByUUIDError = function (result) {
    return (result === null || result === void 0 ? void 0 : result.id) === 'getByUUIDError';
};
export var isUUIDError = function (result) {
    return isNoUUIDError(result) || isGetByUUIDError(result);
};
export var getRoot = function (element) {
    if (element === null || element === void 0 ? void 0 : element.parent) {
        return getRoot(element.parent);
    }
    return element;
};
export var findByUUID = function (element, uuid) {
    var root = getRoot(element);
    var result = doFindByUUID(root, uuid);
    if (!result) {
        return {
            id: 'getByUUIDError',
            root: root,
            uuid: uuid,
        };
    }
    return result;
};
export var tryFindByUUID = function (element, uuid) {
    if (!uuid || !element)
        return undefined;
    var findResult = findByUUID(element, uuid);
    return isUUIDError(findResult) ? undefined : findResult;
};
var doFindByUUID = function (root, uuid) {
    if (!uuid) {
        return {
            id: 'noUUIDError',
        };
    }
    if (root && root.uuid === uuid) {
        return root;
    }
    if (!root) {
        return undefined;
    }
    var entries = root instanceof Map ? root.entries() : Object.entries(root);
    for (var _i = 0, _a = Array.from(entries); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value && value.uuid === uuid) {
            return value;
        }
        if (typeof value === 'object' && key !== 'parent') {
            var result = doFindByUUID(value, uuid);
            if (result) {
                return result;
            }
        }
        // some mappings are 'reversed'
        if (typeof key === 'object') {
            var result = doFindByUUID(key, uuid);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
};
export var calculatePath = function (root, object) {
    var path = doCalculatePath(root, object);
    if (!path) {
        return {
            id: 'calulatePathError',
            root: root,
            element: object,
        };
    }
    return path;
};
export var getPathString = function (object) {
    var root = getRoot(object);
    var path = calculatePath(root, object);
    if (isPathError(path)) {
        return path;
    }
    return "".concat(path.join('/'));
};
var doCalculatePath = function (root, object) {
    if (object.uuid && root.uuid === object.uuid) {
        return [];
    }
    var entries = root instanceof Map ? root.entries() : Object.entries(root);
    for (var _i = 0, _a = Array.from(entries); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (object.uuid && (value === null || value === void 0 ? void 0 : value.uuid) === object.uuid) {
            return [key];
        }
        // some mappings are 'reversed'
        if (object.uuid && (key === null || key === void 0 ? void 0 : key.uuid) === object.uuid) {
            return [value];
        }
        if (typeof value === 'object' && key !== 'parent') {
            var path = doCalculatePath(value, object);
            if (path) {
                return __spreadArray([key], path, true);
            }
        }
        // some mappings are 'reversed'
        if (typeof key === 'object') {
            var path = doCalculatePath(key, object);
            if (path) {
                return __spreadArray([value], path, true);
            }
        }
    }
    return undefined;
};
export var getFromPath = function (root, path) {
    var element = doGetFromPath(root, path);
    if (!element) {
        return {
            id: 'getPathError',
            root: root,
            path: path,
        };
    }
    return element;
};
var doGetFromPath = function (root, path) {
    if (path.length === 0) {
        return root;
    }
    var pathElement = path[0], rest = path.slice(1);
    if (root instanceof Map) {
        if (root.has(pathElement)) {
            return getFromPath(root.get(pathElement), rest);
        }
        // must be a reverse map
        var element = Array.from(root.entries()).reduce(function (acc, _a) {
            var key = _a[0], value = _a[1];
            if (value === pathElement) {
                return key;
            }
            return acc;
        }, undefined);
        return getFromPath(element, rest);
    }
    return getFromPath(get(root, [pathElement]), rest);
};
export var linkElements = function (uiSchemaElement, schemaElement) {
    if (!uiSchemaElement.uuid) {
        console.error('Found element without UUID', uiSchemaElement);
        return false;
    }
    (schemaElement.linkedUISchemaElements =
        schemaElement.linkedUISchemaElements || new Set()).add(uiSchemaElement.uuid);
    uiSchemaElement.linkedSchemaElement = schemaElement.uuid;
    return true;
};
export var linkSchemas = function (schema, uiSchema) {
    if (!schema || !uiSchema) {
        return { schema: schema, uiSchema: uiSchema };
    }
    traverse(uiSchema, function (current) {
        if (isEditorControl(current)) {
            var linkedElement = getSchemaElementFromScope(schema, current.scope);
            if (linkedElement && !isPathError(linkedElement)) {
                linkElements(current, linkedElement);
            }
        }
    });
    return { schema: schema, uiSchema: uiSchema };
};
export var traverse = function (uiSchema, pre, context) { return doTraverse(uiSchema, pre, undefined, context); };
var doTraverse = function (uiSchema, pre, parent, context) {
    var _a;
    pre(uiSchema, parent, context);
    if (uiSchema && isLayout(uiSchema)) {
        uiSchema.elements.forEach(function (el) {
            return doTraverse(el, pre, uiSchema, context);
        });
    }
    if ((_a = uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.options) === null || _a === void 0 ? void 0 : _a.detail) {
        doTraverse(uiSchema.options.detail, pre, uiSchema, context);
    }
    // TODO other containments like categorization
    return context;
};
var getSchemaElementFromScope = function (schema, scope) {
    var schemaRoot = getRoot(schema);
    var validSegment = function (pathSegment) {
        return pathSegment !== '#' && pathSegment !== undefined && pathSegment !== '';
    };
    var validPathSegments = scope.split('/').filter(validSegment);
    return getFromPath(schemaRoot, validPathSegments);
};
export var jsonToText = function (object) { return JSON.stringify(object, null, 2); };
var isEditorUISchemaElement = function (element) {
    return !!(element === null || element === void 0 ? void 0 : element.type) && !!(element === null || element === void 0 ? void 0 : element.uuid);
};
export var isEditorControl = function (element) {
    return isEditorUISchemaElement(element) && isControl(element);
};
export var isEditorLayout = function (element) {
    return isEditorUISchemaElement(element) && isLayout(element);
};
//# sourceMappingURL=schemasUtil.js.map