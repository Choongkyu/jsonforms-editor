import { buildSchemaTree, getChildren } from '../model';
import { buildEditorUiSchemaTree } from '../model/uischema';
import { linkSchemas } from './schemasUtil';
describe('build and link ui schema', function () {
    test('buildAndLinkUISchema should not fail for undefined parameters', function () {
        var state = linkSchemas(undefined, undefined);
        expect(state).toBeDefined();
        expect(state.schema).toBeUndefined();
        expect(state.uiSchema).toBeUndefined();
    });
    test('schema and ui schema should be linked for control', function () {
        var _a, _b;
        var _c = linkSchemas(buildSchemaTree({
            type: 'object',
            properties: {
                name: { type: 'string' },
            },
        }), buildEditorUiSchemaTree({
            type: 'Control',
            scope: '#/properties/name',
        })), schema = _c.schema, uiSchema = _c.uiSchema;
        expect(schema).toBeDefined();
        var nameProperty = getChildren(schema)[0];
        expect(nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.uuid).toBeDefined();
        expect(uiSchema).toBeDefined();
        expect(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.uuid).toBeDefined();
        expect(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.linkedSchemaElement).toBe(nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.uuid);
        expect((_a = nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.linkedUISchemaElements) === null || _a === void 0 ? void 0 : _a.size).toBe(1);
        expect((_b = nameProperty === null || nameProperty === void 0 ? void 0 : nameProperty.linkedUISchemaElements) === null || _b === void 0 ? void 0 : _b.values().next().value).toBe(uiSchema === null || uiSchema === void 0 ? void 0 : uiSchema.uuid);
    });
});
//# sourceMappingURL=schemasUtil.test.js.map