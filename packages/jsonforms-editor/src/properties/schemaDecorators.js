import { assign } from 'lodash';
export var multilineStringOptionDecorator = function (schemas, uiElement, schemaElement) {
    if ((schemaElement === null || schemaElement === void 0 ? void 0 : schemaElement.schema.type) === 'string' &&
        !(schemaElement === null || schemaElement === void 0 ? void 0 : schemaElement.schema.format) &&
        uiElement.type === 'Control') {
        addSchemaOptionsProperty(schemas.schema, {
            multi: { type: 'boolean' },
        });
        schemas.uiSchema.elements.push(createPropertyControl('#/properties/options/properties/multi'));
    }
    return schemas;
};
export var labelUIElementDecorator = function (schemas, uiElement) {
    if ((uiElement === null || uiElement === void 0 ? void 0 : uiElement.type) === 'Label') {
        assign(schemas.schema.properties, { text: { type: 'string' } });
        schemas.uiSchema.elements.push(createPropertyControl('#/properties/text'));
    }
    return schemas;
};
export var ruleDecorator = function (schemas) {
    assign(schemas.schema.properties, {
        rule: {
            type: 'object',
        },
    });
    schemas.uiSchema.elements.push(createPropertyControl('#/properties/rule'));
    return schemas;
};
export var labelDecorator = function (schemas, uiElement) {
    if (['Group', 'Control', 'Categorization', 'Category'].includes(uiElement === null || uiElement === void 0 ? void 0 : uiElement.type)) {
        if (!schemas.schema.properties) {
            schemas.schema.properties = {};
        }
        assign(schemas.schema.properties, { label: { type: 'string' } });
        schemas.uiSchema.elements.push(createPropertyControl('#/properties/label'));
    }
    return schemas;
};
export var addSchemaOptionsProperty = function (schema, newOption) {
    if (!schema.properties) {
        schema.properties = {};
    }
    if (!schema.properties.options) {
        schema.properties.options = {
            type: 'object',
            properties: {},
        };
    }
    assign(schema.properties.options.properties, newOption);
};
export var createPropertyControl = function (controlScope) { return ({
    type: 'Control',
    scope: controlScope,
}); };
export var defaultSchemaDecorators = [
    labelDecorator,
    multilineStringOptionDecorator,
    labelUIElementDecorator,
    ruleDecorator,
];
//# sourceMappingURL=schemaDecorators.js.map