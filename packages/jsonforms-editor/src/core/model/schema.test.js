/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { buildSchemaTree, getArrayContainer, getChildren, } from './schema';
test('set uuids on single element', function () {
    var element = simplePrimitive();
    var enrichedElement = buildSchemaTree(element);
    expect(enrichedElement).toHaveProperty('uuid');
});
test('set uuids on nested elements', function () {
    var object = simpleObject();
    var enrichedObject = buildSchemaTree(object);
    expect(enrichedObject).toHaveProperty('uuid');
    var children = getChildren(enrichedObject);
    expect(children.length).toBe(2);
    children.forEach(function (child) {
        expect(child).toHaveProperty('uuid');
    });
});
test('getArrayContainer', function () {
    var array = simpleArray();
    array.items.properties.nestedArray = simpleArray();
    var enrichedArray = buildSchemaTree(array);
    expect(enrichedArray).toBeTruthy();
    expect(getArrayContainer(enrichedArray)).toBeFalsy();
    var arrayChildren = getChildren(enrichedArray);
    expect(arrayChildren.length).toBe(1);
    var object = arrayChildren[0];
    expect(getArrayContainer(object)).toBe(enrichedArray);
    var objectChildren = getChildren(object);
    expect(objectChildren.length).toBe(3);
    objectChildren.forEach(function (child) {
        expect(getArrayContainer(child)).toBe(enrichedArray);
    });
    var nestedArray = objectChildren[2];
    var nestedArrayChildren = getChildren(nestedArray);
    expect(nestedArrayChildren.length).toBe(1);
    var nestedArrayObject = nestedArrayChildren[0];
    expect(getArrayContainer(nestedArrayObject)).toBe(nestedArray);
    getChildren(nestedArrayObject).forEach(function (child) {
        expect(getArrayContainer(child)).toBe(nestedArray);
    });
});
var simplePrimitive = function () { return ({
    type: 'string',
}); };
var simpleObject = function () { return ({
    type: 'object',
    properties: {
        name: simplePrimitive(),
        surname: simplePrimitive(),
    },
}); };
var simpleArray = function () { return ({
    type: 'array',
    items: simpleObject(),
}); };
//# sourceMappingURL=schema.test.js.map