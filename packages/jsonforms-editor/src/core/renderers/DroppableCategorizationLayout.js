/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { isCategorization, rankWith, } from '@jsonforms/core';
import { JsonFormsDispatch, withJsonFormsLayoutProps } from '@jsonforms/react';
import { AppBar, Card, CardContent, CardHeader, Tab, Tabs, } from '@mui/material';
import { PlusOne, Tab as TabIcon } from '@mui/icons-material';
import { findIndex } from 'lodash';
import React, { useMemo, useState } from 'react';
import { useCategorizationService, useSelection } from '../../core/context';
import { createCategory } from '../util/generators/uiSchema';
import { DroppableElementRegistration } from './DroppableElement';
var DroppableCategorizationLayout = function (props) {
    var uischema = props.uischema, schema = props.schema, path = props.path, renderers = props.renderers, cells = props.cells;
    // ignoring the first selection from the tuple since it is not used
    var _a = useSelection(), setSelection = _a[1];
    var categorizationService = useCategorizationService();
    var categories = uischema.elements;
    var defaultIndex = findIndex(categories, function (cat) { var _a; return cat.uuid === ((_a = categorizationService.getTabSelection(uischema)) === null || _a === void 0 ? void 0 : _a.uuid); });
    var _b = useState(defaultIndex === -1 ? undefined : defaultIndex), currentIndex = _b[0], setCurrentIndex = _b[1];
    var indicatorColor = categories.length === 0 ? 'primary' : 'secondary';
    var setIndex = function (value, event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        if (value < categories.length) {
            var selectedUuid = categories[value].uuid;
            categorizationService.setTabSelection(uischema, {
                uuid: selectedUuid,
            });
            setSelection({ uuid: selectedUuid });
            setCurrentIndex(value);
        }
    };
    // DroppableControl removed itself before dispatching to us, we need
    // to re-add it for our children
    var renderersToUse = useMemo(function () {
        return renderers && __spreadArray(__spreadArray([], renderers, true), [DroppableElementRegistration], false);
    }, [renderers]);
    var handleChange = function (event, value) {
        if (typeof value === 'number') {
            setIndex(value, event);
        }
    };
    var addTab = function (event) {
        var tab = createCategory('New Tab ' + (categories.length + 1));
        tab.parent = uischema;
        categories.push(tab);
        setIndex(categories.length - 1, event);
    };
    if (currentIndex !== undefined) {
        // in case we have tab that was deleted then we will use the memorized index to determine the previous tab that we are going to select automatically
        if (categories.length === 0) {
            // reset the index since we do not have anything to select
            setCurrentIndex(undefined);
        }
        else if (currentIndex > categories.length - 1) {
            // check if currentIndex is out of bound because of delete
            setIndex(categories.length - 1);
        }
        else if (currentIndex !== defaultIndex) {
            // check if current index is out of sync with the service
            setIndex(currentIndex);
        }
    }
    return (React.createElement(Card, null,
        React.createElement(CardHeader, { component: function () { return (React.createElement(AppBar, { position: 'static' },
                React.createElement(Tabs, { indicatorColor: indicatorColor, value: currentIndex === undefined ? false : currentIndex, onChange: handleChange, variant: 'scrollable' },
                    categories.map(function (e, idx) { return (React.createElement(Tab, { key: idx, label: e.label })); }),
                    React.createElement(Tab, { key: categories.length, icon: React.createElement("span", null,
                            React.createElement(TabIcon, { fontSize: 'small' }),
                            React.createElement(PlusOne, null)), onClick: addTab })))); } }),
        React.createElement(CardContent, null, categories.length > 0 && currentIndex !== undefined ? (React.createElement(JsonFormsDispatch, { schema: schema, uischema: categories[currentIndex], path: path, renderers: renderersToUse, cells: cells })) : (categories.length === 0 && (React.createElement("span", null,
            'No Category. Use ',
            React.createElement(TabIcon, { fontSize: 'small' }),
            React.createElement(PlusOne, null),
            ' to add a new tab.'))))));
};
export var DroppableCategorizationLayoutRegistration = {
    tester: rankWith(40, isCategorization),
    renderer: withJsonFormsLayoutProps(DroppableCategorizationLayout),
};
//# sourceMappingURL=DroppableCategorizationLayout.js.map