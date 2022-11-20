import traverse from 'json-schema-traverse';
import { assign, cloneDeep, omit } from 'lodash';
import { v4 as uuid } from 'uuid';
import { getHierarchy } from '../util/tree';
export var OBJECT = 'object';
export var ARRAY = 'array';
export var PRIMITIVE = 'primitive';
export var OTHER = 'other';
export var getChildren = function (schemaElement) {
    var children = [];
    switch (schemaElement.type) {
        case OBJECT:
            children.push.apply(children, Array.from(schemaElement.properties.values()));
            break;
        case ARRAY:
            var items = Array.isArray(schemaElement.items)
                ? schemaElement.items
                : [schemaElement.items];
            children.push.apply(children, items);
            break;
    }
    if (schemaElement.other) {
        children.push.apply(children, Array.from(schemaElement.other.values()));
    }
    return children;
};
var containsAs = function (schemaElement) {
    var containments = [];
    switch (schemaElement.type) {
        case OBJECT:
            var propertyEntries = Array.from(schemaElement.properties.entries()).map(function (_a) {
                var prop = _a[0], element = _a[1];
                return [element, "properties/".concat(prop)];
            });
            containments.push.apply(containments, propertyEntries);
            break;
        case ARRAY:
            var itemEntries = Array.isArray(schemaElement.items)
                ? schemaElement.items.map(function (element, index) { return [
                    element,
                    "items/".concat(index),
                ]; })
                : [[schemaElement.items, 'items']];
            containments.push.apply(containments, itemEntries);
            break;
    }
    if (schemaElement.other) {
        var entries = Array.from(schemaElement.other.entries()).map(function (_a) {
            var prop = _a[0], element = _a[1];
            return [element, prop];
        });
        containments.push.apply(containments, entries);
    }
    return new Map(containments);
};
/** Calculates the full path from root to the given element */
export var getPath = function (schemaElement) {
    if (!schemaElement.parent) {
        return '';
    }
    return "".concat(getPath(schemaElement.parent), "/").concat(containsAs(schemaElement.parent).get(schemaElement));
};
/**
 *  Calculates the scope for the given element.
 *  This is the same as `getPath` however it stops at array elements.
 */
export var getScope = function (schemaElement) {
    if (!schemaElement.parent || isArrayElement(schemaElement.parent)) {
        return '';
    }
    return "".concat(getScope(schemaElement.parent), "/").concat(containsAs(schemaElement.parent).get(schemaElement));
};
export var toPrintableObject = function (debugSchema) {
    var _a;
    var clone = cloneDeep(debugSchema);
    var printableProps = {
        parent: (_a = debugSchema.parent) === null || _a === void 0 ? void 0 : _a.uuid,
        linkedUISchemaElements: debugSchema.linkedUISchemaElements
            ? Array.from(debugSchema.linkedUISchemaElements.values())
            : undefined,
    };
    switch (debugSchema.type) {
        case OBJECT:
            if (debugSchema.properties.size > 0) {
                printableProps.properties = Array.from(debugSchema.properties).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return { name: key, value: toPrintableObject(value) };
                });
            }
            break;
        case ARRAY:
            if (Array.isArray(debugSchema.items)) {
                printableProps.items = debugSchema.items.map(toPrintableObject);
            }
            else {
                printableProps.items = toPrintableObject(debugSchema.items);
            }
            break;
    }
    if (debugSchema.other) {
        printableProps.other = Array.from(debugSchema.other).map(function (_a) {
            var key = _a[0], value = _a[1];
            return { name: key, value: toPrintableObject(value) };
        });
    }
    return assign(clone, printableProps);
};
var isElementOfType = function (type) {
    return function (schemaElement) {
        return (schemaElement === null || schemaElement === void 0 ? void 0 : schemaElement.type) === type;
    };
};
export var isObjectElement = isElementOfType(OBJECT);
export var isArrayElement = isElementOfType(ARRAY);
export var isPrimitiveElement = isElementOfType(PRIMITIVE);
export var isOtherElement = isElementOfType(OTHER);
export var getLabel = function (schemaElement) {
    if (schemaElement.schema.title) {
        return schemaElement.schema.title;
    }
    if (isObjectElement(schemaElement.parent)) {
        for (var _i = 0, _a = Array.from(schemaElement.parent.properties.entries()); _i < _a.length; _i++) {
            var _b = _a[_i], prop = _b[0], element = _b[1];
            if (element === schemaElement) {
                return prop;
            }
        }
    }
    if (isArrayElement(schemaElement.parent) &&
        Array.isArray(schemaElement.parent.items)) {
        for (var i = 0; i < schemaElement.parent.items.length; i++) {
            if (schemaElement.parent.items[i] === schemaElement) {
                return "[".concat(i, "]");
            }
        }
    }
    return '<No label>';
};
var createNewElementForType = function (schema, type) {
    switch (type) {
        case OBJECT:
            var objectCopy = cloneDeep(omit(schema, ['properties']));
            return { type: type, schema: objectCopy, properties: new Map(), uuid: uuid() };
        case ARRAY:
            var arrayCopy = cloneDeep(omit(schema, ['items']));
            return { type: type, schema: arrayCopy, items: [], uuid: uuid() };
        case PRIMITIVE:
            return { type: type, schema: cloneDeep(schema), uuid: uuid() };
        default:
            return { type: OTHER, schema: cloneDeep(schema), uuid: uuid() };
    }
};
var createSingleElement = function (schema) {
    return createNewElementForType(schema, determineType(schema));
};
var getUndefined = function () { return undefined; };
export var buildSchemaTree = function (schema) {
    // workaround needed because of TS compiler issue
    // https://github.com/Microsoft/TypeScript/issues/11498
    var currentElement = getUndefined();
    traverse(schema, {
        cb: {
            pre: function (currentSchema, pointer, rootSchema, parentPointer, parentKeyword, parentSchema, indexOrProp) {
                var newElement = createSingleElement(currentSchema);
                newElement.parent = currentElement;
                var path = pointer.split('/');
                if (isObjectElement(currentElement) &&
                    path[path.length - 2] === 'properties') {
                    currentElement.properties.set("".concat(indexOrProp), newElement);
                }
                else if (isArrayElement(currentElement) &&
                    path[path.length - 2] === 'items') {
                    currentElement.items.push(newElement);
                }
                else if (isArrayElement(currentElement) &&
                    path[path.length - 1] === 'items') {
                    currentElement.items = newElement;
                }
                else if (currentElement) {
                    if (!currentElement.other) {
                        currentElement.other = new Map();
                    }
                    currentElement.other.set("".concat(indexOrProp), newElement);
                }
                currentElement = newElement;
            },
            post: function () {
                currentElement = (currentElement === null || currentElement === void 0 ? void 0 : currentElement.parent) || currentElement;
            },
        },
    });
    if (!currentElement) {
        return undefined;
    }
    return currentElement;
};
var determineType = function (schema) {
    if (!schema) {
        return OTHER;
    }
    if (schema.type) {
        switch (schema.type) {
            case 'object':
                return OBJECT;
            case 'array':
                return ARRAY;
            case 'number':
            case 'integer':
            case 'string':
            case 'boolean':
            case 'const':
                return PRIMITIVE;
            default:
                return OTHER;
        }
    }
    if (schema.properties) {
        return OBJECT;
    }
    if (schema.items) {
        return ARRAY;
    }
    if (schema.enum) {
        return PRIMITIVE;
    }
    return OTHER;
};
export var buildJsonSchema = function (element) {
    var result = cloneDeep(element.schema);
    switch (element.type) {
        case OBJECT:
            if (element.properties.size > 0) {
                result.properties = {};
                element.properties.forEach(function (propertyElement, propName) {
                    result.properties[propName] = buildJsonSchema(propertyElement);
                });
            }
            break;
        case ARRAY:
            if (Array.isArray(element.items)) {
                result.items = element.items.map(buildJsonSchema);
            }
            else {
                result.items = buildJsonSchema(element.items);
            }
            break;
    }
    return result;
};
/** Removes all linkedUiSchemaElements from the given schema */
export var cleanLinkedElements = function (schema) {
    var _a;
    if (!schema) {
        return schema;
    }
    delete schema.linkedUISchemaElements;
    switch (schema.type) {
        case OBJECT:
            if (schema.properties.size > 0) {
                schema.properties = Array.from(schema.properties).reduce(function (acc, _a) {
                    var key = _a[0], value = _a[1];
                    var cleanedElement = cleanLinkedElements(value);
                    if (cleanedElement) {
                        acc.set(key, cleanedElement);
                    }
                    return acc;
                }, new Map());
            }
            break;
        case ARRAY:
            if (Array.isArray(schema.items)) {
                schema.items = schema.items
                    .map(cleanLinkedElements)
                    .filter(function (item) { return item !== undefined; });
            }
            else {
                schema.items = (_a = cleanLinkedElements(schema.items)) !== null && _a !== void 0 ? _a : [];
            }
            break;
    }
    return schema;
};
/**
 * Returns the closest array which contains the given element
 */
export var getArrayContainer = function (element) {
    return getHierarchy(element).splice(1).find(isArrayElement);
};
export var generateEmptyData = function (schema, data) {
    if (data === void 0) { data = {}; }
    if (isObjectElement(schema)) {
        Array.from(schema.properties).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (isObjectElement(value)) {
                data[key] = generateEmptyData(value, {});
            }
        });
    }
    return data;
};
//# sourceMappingURL=schema.js.map