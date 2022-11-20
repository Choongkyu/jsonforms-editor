/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React from 'react';
import { CategorizationIcon, GroupIcon, HorizontalIcon, LabelIcon, VerticalIcon, } from '../icons';
import { createCategorization, createLabel, createLayout, } from '../util/generators/uiSchema';
var paletteElements = [
    {
        type: 'HorizontalLayout',
        label: 'Horizontal Layout',
        icon: React.createElement(HorizontalIcon, null),
        uiSchemaElementProvider: function () { return createLayout('HorizontalLayout'); },
    },
    {
        type: 'VerticalLayout',
        label: 'Vertical Layout',
        icon: React.createElement(VerticalIcon, null),
        uiSchemaElementProvider: function () { return createLayout('VerticalLayout'); },
    },
    {
        type: 'Group',
        label: 'Group',
        icon: React.createElement(GroupIcon, null),
        uiSchemaElementProvider: function () { return createLayout('Group'); },
    },
    {
        type: 'Label',
        label: 'Label',
        icon: React.createElement(LabelIcon, null),
        uiSchemaElementProvider: function () { return createLabel(); },
    },
    {
        type: 'Categorization',
        label: 'Categorization',
        icon: React.createElement(CategorizationIcon, null),
        uiSchemaElementProvider: function () { return createCategorization(); },
    },
];
var DefaultPaletteService = /** @class */ (function () {
    function DefaultPaletteService() {
        this.getPaletteElements = function () { return paletteElements; };
    }
    return DefaultPaletteService;
}());
export { DefaultPaletteService };
//# sourceMappingURL=paletteService.js.map