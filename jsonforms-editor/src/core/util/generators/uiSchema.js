import { v4 as uuid } from 'uuid';
import { getScope } from '../../model';
export var createControl = function (schemaElement) {
    return createControlWithScope("#".concat(getScope(schemaElement)));
};
export var createControlWithScope = function (scope) {
    return {
        type: 'Control',
        scope: scope,
        uuid: uuid(),
    };
};
export var createLayout = function (type) {
    return {
        type: type,
        elements: [],
        uuid: uuid(),
    };
};
export var createLabel = function (text) {
    return {
        type: 'Label',
        text: text,
        uuid: uuid(),
    };
};
export var createCategory = function (label) {
    return {
        type: 'Category',
        elements: [],
        label: label,
        uuid: uuid(),
    };
};
export var createCategorization = function (label) {
    return {
        type: 'Categorization',
        label: label,
        uuid: uuid(),
        elements: [],
    };
};
//# sourceMappingURL=uiSchema.js.map