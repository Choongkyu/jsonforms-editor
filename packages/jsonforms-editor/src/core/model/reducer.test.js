import { createControlWithScope, createLayout, } from '../util/generators/uiSchema';
import { linkSchemas } from '../util/schemasUtil';
import { Actions } from './actions';
import { combinedReducer } from './reducer';
import { buildSchemaTree, getChildren, } from './schema';
import { buildEditorUiSchemaTree, } from './uischema';
describe('add detail action', function () {
    var buildState = function () {
        var state = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
                toys: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            height: { type: 'number' },
                        },
                    },
                },
            },
        }), buildEditorUiSchemaTree({
            type: 'VerticalLayout',
            elements: [
                { type: 'Control', scope: '#/properties/toys' },
            ],
        }));
        var schema = state.schema;
        var uiSchema = state.uiSchema;
        expect(schema).toBeDefined();
        expect(uiSchema).toBeDefined();
        schema.properties.get('toys').linkedUISchemaElements = new Set(uiSchema.elements[0].uuid);
        uiSchema.elements[0].linkedSchemaElement =
            schema.properties.get('toys').uuid;
        return { schema: schema, uiSchema: uiSchema };
    };
    test('add non-scoped ui schema element as detail', function () {
        var _a = buildState(), schema = _a.schema, uiSchema = _a.uiSchema;
        var newDetail = createLayout('HorizontalLayout');
        var addDetailAction = Actions.addDetail(uiSchema.elements[0].uuid, newDetail);
        var newUiSchema = combinedReducer({ schema: schema, uiSchema: uiSchema }, addDetailAction).uiSchema;
        expect(newUiSchema.elements[0].options.detail).toStrictEqual(newDetail);
    });
    test('add scoped ui schema element as detail', function () {
        var _a = buildState(), schema = _a.schema, uiSchema = _a.uiSchema;
        var newDetail = createControlWithScope('#/properties/height');
        newDetail.linkedSchemaElement = schema.properties.get('toys')
            .items.properties.get('height').uuid;
        var addDetailAction = Actions.addDetail(uiSchema.elements[0].uuid, newDetail);
        var _b = combinedReducer({ schema: schema, uiSchema: uiSchema }, addDetailAction), newSchema = _b.schema, newUiSchema = _b.uiSchema;
        expect(newUiSchema.elements[0].options.detail).toStrictEqual(newDetail);
        expect(newSchema.properties.get('toys')
            .items.properties
            .get('height')
            .linkedUISchemaElements.has(newDetail.uuid)).toBeTruthy();
    });
});
describe('SET_SCHEMA action', function () {
    test('schema elements are linked after SET_SCHEMA', function () {
        var _a;
        var initialState = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'Control',
            scope: '#/properties/name',
        }));
        var setSchemaAction = Actions.setSchema({
            type: 'object',
            properties: {
                name: { type: 'string', default: 'foo' },
            },
        });
        var _b = combinedReducer(initialState, setSchemaAction), schema = _b.schema, uiSchema = _b.uiSchema;
        var nameProperty = getChildren(schema)[0];
        expect(nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.uuid).toBeDefined();
        expect(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.linkedSchemaElement).toStrictEqual(nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.uuid);
        expect((_a = nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.linkedUISchemaElements) === null || _a === void 0 ? void 0 : _a.values().next().value).toStrictEqual(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.uuid);
    });
    test('no unmatched UUIDs left in UI Schema after SET_SCHEMA', function () {
        var initialState = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'Control',
            scope: '#/properties/name',
        }));
        var setSchemaAction = Actions.setSchema(undefined);
        var _a = combinedReducer(initialState, setSchemaAction), schema = _a.schema, uiSchema = _a.uiSchema;
        expect(schema).toBeUndefined();
        expect(uiSchema).toBeDefined();
        expect(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.linkedSchemaElement).toBeUndefined();
    });
    test('no unmatched UUIDs left behind in schema after SET_SCHEMA', function () {
        var initialState = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'Control',
            scope: '#/properties/name',
        }));
        var setSchemaAction = Actions.setSchema({
            type: 'object',
            properties: {
                foo: { type: 'string' },
            },
        });
        // we rename the 'name' property -> no linked UI elements should exist
        var schema = combinedReducer(initialState, setSchemaAction).schema;
        var schemaChildren = getChildren(schema);
        expect(schemaChildren.length).toBe(1);
        expect(schemaChildren[0].linkedUISchemaElements).toBeUndefined();
    });
});
describe('REMOVE_UISCHEMA_ELEMENT action', function () {
    test('UIElements with broken links to SchemaElements should be removable', function () {
        //SETUP
        var brokenState = combinedReducer(linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'VerticalLayout',
            elements: [
                { type: 'Control', scope: '#/properties/name' },
            ],
        })), Actions.setSchema({
            type: 'object',
            properties: {},
        }));
        var brokenControl = brokenState.uiSchema.elements[0];
        var removeBrokenElementAction = Actions.removeUiSchemaElement(brokenControl.uuid);
        // REMOVE BROKEN CONTROL
        var updatedSchema = combinedReducer(brokenState, removeBrokenElementAction).uiSchema;
        expect(updatedSchema.elements).toBeDefined();
        expect(updatedSchema.elements.length).toBe(0);
    });
});
describe('SET_UISCHEMA action', function () {
    test('schema elements are linked after SET_UISCHEMA', function () {
        var _a;
        var initialState = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'Control',
            scope: '#/properties/name',
        }));
        var setUiSchemaAction = Actions.setUiSchema({
            type: 'VerticalLayout',
            elements: [
                { type: 'Control', scope: '#/properties/name' },
            ],
        });
        var _b = combinedReducer(initialState, setUiSchemaAction), schema = _b.schema, uiSchema = _b.uiSchema;
        var nameProperty = getChildren(schema)[0];
        expect(nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.uuid).toBeDefined();
        var nameControl = uiSchema.elements[0];
        expect(nameControl === null || nameControl === void 0 ? void 0 : nameControl.uuid).toBeDefined();
        expect(nameControl === null || nameControl === void 0 ? void 0 : nameControl.linkedSchemaElement).toStrictEqual(nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.uuid);
        expect((_a = nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.linkedUISchemaElements) === null || _a === void 0 ? void 0 : _a.values().next().value).toStrictEqual(nameControl === null || nameControl === void 0 ? void 0 : nameControl.uuid);
    });
    test('no unmatched UUIDs left in schema after SET_UISCHEMA', function () {
        var initialState = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'Control',
            scope: '#/properties/name',
        }));
        var setUiSchemaAction = Actions.setUiSchema(undefined);
        var _a = combinedReducer(initialState, setUiSchemaAction), schema = _a.schema, uiSchema = _a.uiSchema;
        expect(uiSchema).toBeUndefined();
        expect(schema).toBeDefined();
        expect(schema === null || schema === void 0 ? void 0 : schema.linkedUISchemaElements).toBeUndefined();
    });
    test('no unmatched UUIDs left behind in schema after SET_UISCHEMA', function () {
        var initialState = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
                foo: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'Control',
            scope: '#/properties/name',
        }));
        var setUiSchemaAction = Actions.setUiSchema({
            type: 'Control',
            scope: '#/properties/foo',
        });
        var schema = combinedReducer(initialState, setUiSchemaAction).schema;
        var schemaChildren = getChildren(schema);
        expect(schemaChildren[0].linkedUISchemaElements).toBeUndefined();
        expect(schemaChildren[1].linkedUISchemaElements).toBeDefined();
    });
});
//# sourceMappingURL=reducer.test.js.map