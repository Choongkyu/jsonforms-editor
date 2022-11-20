var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { materialRenderers } from '@jsonforms/material-renderers';
import { DroppableArrayControlRegistration } from '../core/renderers/DroppableArrayControl';
import { DroppableCategorizationLayoutRegistration } from '../core/renderers/DroppableCategorizationLayout';
import { DroppableCategoryLayoutRegistration } from '../core/renderers/DroppableCategoryLayout';
import { DroppableElementRegistration } from '../core/renderers/DroppableElement';
import { DroppableGroupLayoutRegistration } from '../core/renderers/DroppableGroupLayout';
import { DroppableHorizontalLayoutRegistration, DroppableVerticalLayoutRegistration, } from '../core/renderers/DroppableLayout';
import { ReactMaterialPreview } from './components/preview';
export * from './components/EditorPanel';
export { EditorElement } from './components/EditorElement';
export var defaultEditorTabs = [
    { name: 'Preview', Component: ReactMaterialPreview },
];
export var defaultEditorRenderers = __spreadArray(__spreadArray([], materialRenderers, true), [
    DroppableHorizontalLayoutRegistration,
    DroppableVerticalLayoutRegistration,
    DroppableElementRegistration,
    DroppableGroupLayoutRegistration,
    DroppableCategoryLayoutRegistration,
    DroppableArrayControlRegistration,
    DroppableCategorizationLayoutRegistration,
], false);
//# sourceMappingURL=index.js.map