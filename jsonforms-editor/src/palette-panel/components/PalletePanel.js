/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { TabContent } from '../../core/components';
import { usePaletteService, useSchema } from '../../core/context';
import { JsonSchemaPanel } from './JsonSchemaPanel';
import { SchemaTreeView } from './SchemaTree';
import { UIElementsTree } from './UIElementsTree';
import { UISchemaPanel } from './UISchemaPanel';
var Top = styled('div')("\n    height: 100%;\n    display: flex;\n    flexDirection: column;\n    ");
export var defaultPalettePanelTabs = [
    {
        name: 'JSON Schema',
        Component: React.createElement(JsonSchemaPanel, null),
    },
    { name: 'UI Schema', Component: React.createElement(UISchemaPanel, null) },
];
export var PalettePanel = function (_a) {
    var paletteTabs = _a.paletteTabs;
    var _b = useState(0), selectedTab = _b[0], setSelectedTab = _b[1];
    var handleTabChange = function (event, newValue) {
        setSelectedTab(newValue);
    };
    var schema = useSchema();
    var paletteService = usePaletteService();
    return (React.createElement(Top, null,
        React.createElement(Tabs, { value: selectedTab, onChange: handleTabChange, variant: 'scrollable' },
            React.createElement(Tab, { label: 'Palette', "data-cy": 'palette-tab' }),
            paletteTabs
                ? paletteTabs.map(function (tab) { return (React.createElement(Tab, { key: "tab-".concat(tab.name), label: tab.name, "data-cy": "tab-".concat(tab.name) })); })
                : null),
        React.createElement(TabContent, { index: 0, currentIndex: selectedTab },
            React.createElement(UIElementsTree, { elements: paletteService.getPaletteElements() }),
            React.createElement(SchemaTreeView, { schema: schema })),
        paletteTabs
            ? paletteTabs.map(function (tab, index) { return (React.createElement(TabContent, { key: "tab-content-".concat(index + 1), index: index + 1, currentIndex: selectedTab }, tab.Component)); })
            : null));
};
//# sourceMappingURL=PalletePanel.js.map