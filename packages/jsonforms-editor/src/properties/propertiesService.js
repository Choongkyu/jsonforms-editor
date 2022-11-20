import { maxBy } from 'lodash';
/**
 * Constant that indicates that a tester is not capable of handling
 * an EditorUISchemaElement.
 */
export var NOT_APPLICABLE = -1;
var PropertiesServiceImpl = /** @class */ (function () {
    function PropertiesServiceImpl(schemaProviders, schemaDecorators) {
        var _this = this;
        this.schemaProviders = schemaProviders;
        this.schemaDecorators = schemaDecorators;
        this.getProperties = function (uiElement, schemaElement) {
            var provider = maxBy(_this.schemaProviders, function (p) { return p.tester(uiElement); });
            if (!provider || provider.tester(uiElement) === NOT_APPLICABLE) {
                return undefined;
            }
            var elementSchemas = provider.getPropertiesSchemas(uiElement, schemaElement);
            if (!elementSchemas) {
                return undefined;
            }
            var decoratedSchemas = _this.schemaDecorators.reduce(function (schemas, decorator) { return decorator(schemas, uiElement, schemaElement); }, elementSchemas);
            return decoratedSchemas;
        };
    }
    return PropertiesServiceImpl;
}());
export { PropertiesServiceImpl };
//# sourceMappingURL=propertiesService.js.map