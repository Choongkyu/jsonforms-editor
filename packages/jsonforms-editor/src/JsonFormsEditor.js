/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import './JsonFormsEditor.css';
import 'react-reflex/styles.css';
import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import { CategorizationServiceImpl, } from './core/api/categorizationService';
import { DefaultPaletteService, } from './core/api/paletteService';
import { EmptySchemaService } from './core/api/schemaService';
import { Footer, Header, Layout } from './core/components';
import { EditorContextInstance } from './core/context';
import { Actions, editorReducer } from './core/model';
import { tryFindByUUID } from './core/util/schemasUtil';
import { defaultEditorRenderers, defaultEditorTabs, EditorPanel, } from './editor';
import { defaultPalettePanelTabs, PalettePanel, } from './palette-panel';
import { defaultPropertyRenderers, PropertiesPanel } from './properties';
import { PropertiesServiceImpl, } from './properties/propertiesService';
import { styled } from '@mui/system';
var defaultSchemaService = new EmptySchemaService();
var defaultPaletteService = new DefaultPaletteService();
var defaultPropertiesService = function (schemaProviders, schemaDecorators) { return new PropertiesServiceImpl(schemaProviders, schemaDecorators); };
var defaultCategorizationService = new CategorizationServiceImpl();
export var JsonFormsEditor = function (_a) {
    var _b = _a.schemaService, schemaService = _b === void 0 ? defaultSchemaService : _b, _c = _a.paletteService, paletteService = _c === void 0 ? defaultPaletteService : _c, _d = _a.categorizationService, categorizationService = _d === void 0 ? defaultCategorizationService : _d, _e = _a.propertiesServiceProvider, propertiesServiceProvider = _e === void 0 ? defaultPropertiesService : _e, schemaProviders = _a.schemaProviders, schemaDecorators = _a.schemaDecorators, _f = _a.editorRenderers, editorRenderers = _f === void 0 ? defaultEditorRenderers : _f, _g = _a.editorTabs, editorTabsProp = _g === void 0 ? defaultEditorTabs : _g, _h = _a.paletteTabs, paletteTabs = _h === void 0 ? defaultPalettePanelTabs : _h, _j = _a.propertyRenderers, propertyRenderers = _j === void 0 ? defaultPropertyRenderers : _j, _k = _a.header, header = _k === void 0 ? Header : _k, _l = _a.footer, footer = _l === void 0 ? Footer : _l;
    var _m = useReducer(editorReducer, {
        categorizationService: defaultCategorizationService,
    }), _o = _m[0], schema = _o.schema, uiSchema = _o.uiSchema, dispatch = _m[1];
    var _p = useState(undefined), selection = _p[0], setSelection = _p[1];
    var propertiesService = useState(propertiesServiceProvider(schemaProviders, schemaDecorators))[0];
    var editorTabs = editorTabsProp !== null && editorTabsProp !== void 0 ? editorTabsProp : undefined;
    var headerComponent = header !== null && header !== void 0 ? header : undefined;
    var footerComponent = footer !== null && footer !== void 0 ? footer : undefined;
    useEffect(function () {
        schemaService
            .getSchema()
            .then(function (schema) { return dispatch(Actions.setSchema(schema)); });
        schemaService
            .getUiSchema()
            .then(function (uiSchema) { return dispatch(Actions.setUiSchema(uiSchema)); });
    }, [schemaService]);
    useEffect(function () {
        setSelection(function (oldSelection) {
            if (!oldSelection) {
                return oldSelection;
            }
            var idInNewSchema = tryFindByUUID(uiSchema, oldSelection.uuid);
            if (!idInNewSchema) {
                // element does not exist anymore - clear old selection
                return undefined;
            }
            return oldSelection;
        });
    }, [uiSchema]);
    return (React.createElement(EditorContextInstance.Provider, { value: {
            schema: schema,
            uiSchema: uiSchema,
            dispatch: dispatch,
            selection: selection,
            setSelection: setSelection,
            categorizationService: categorizationService,
            schemaService: schemaService,
            paletteService: paletteService,
            propertiesService: propertiesService,
        } },
        React.createElement(DndProvider, { backend: Backend },
            React.createElement(JsonFormsEditorUi, { editorRenderers: editorRenderers, editorTabs: editorTabs, propertyRenderers: propertyRenderers, header: headerComponent, footer: footerComponent, paletteTabs: paletteTabs !== null && paletteTabs !== void 0 ? paletteTabs : undefined }))));
};
var Div = styled('div')(function (_a) {
    var theme = _a.theme;
    return "\n    min-height: 200px;\n    margin: ".concat(theme.spacing(0, 1, 0, 1), ";\n    height: 100%;\n");
});
var JsonFormsEditorUi = function (_a) {
    var editorTabs = _a.editorTabs, editorRenderers = _a.editorRenderers, propertyRenderers = _a.propertyRenderers, header = _a.header, footer = _a.footer, paletteTabs = _a.paletteTabs;
    return (React.createElement(Layout, { HeaderComponent: header, FooterComponent: footer },
        React.createElement(ReflexContainer, { orientation: 'vertical', style: {
                flex: '1',
                alignItems: 'stretch',
            } },
            React.createElement(ReflexElement, { minSize: 200, flex: 1 },
                React.createElement(Div, null,
                    React.createElement(PalettePanel, { paletteTabs: paletteTabs }))),
            React.createElement(ReflexSplitter, { propagate: true }),
            React.createElement(ReflexElement, { minSize: 200, flex: 2 },
                React.createElement(Div, { sx: { alignItems: 'stretch' } },
                    React.createElement(EditorPanel, { editorTabs: editorTabs, editorRenderers: editorRenderers }))),
            React.createElement(ReflexSplitter, { propagate: true }),
            React.createElement(ReflexElement, { minSize: 200, flex: 1 },
                React.createElement(Div, null,
                    React.createElement(PropertiesPanel, { propertyRenderers: propertyRenderers }))))));
};
//# sourceMappingURL=JsonFormsEditor.js.map