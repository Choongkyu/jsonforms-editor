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
import { materialRenderers } from '@jsonforms/material-renderers';
import { RuleEditorRendererRegistration } from './renderers/RuleEditorRenderer';
export { PropertiesPanel } from './components/PropertiesPanel';
export * from './schemaDecorators';
export * from './schemaProviders';
export * from './propertiesService';
export var defaultPropertyRenderers = __spreadArray(__spreadArray([], materialRenderers, true), [
    RuleEditorRendererRegistration,
], false);
//# sourceMappingURL=index.js.map