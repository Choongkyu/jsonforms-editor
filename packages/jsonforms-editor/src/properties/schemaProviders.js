import { NOT_APPLICABLE, } from './propertiesService';
export var propertySchemaProvider = {
    tester: function (uiElement) {
        if (uiElement) {
            // default schema provider
            return 1;
        }
        return NOT_APPLICABLE;
    },
    getPropertiesSchemas: function () { return ({
        schema: {
            type: 'object',
            properties: {},
        },
        uiSchema: {
            type: 'VerticalLayout',
            elements: [],
        },
    }); },
};
export var defaultSchemaProviders = [propertySchemaProvider];
//# sourceMappingURL=schemaProviders.js.map