import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { TabContent } from '../../core/components';
import { Editor } from './Editor';
var Top = styled('div')(function () { return "\n        height: '100%',\n        display: 'grid',\n        gridTemplateColumns: '1fr',\n        gridTemplateRows: 'auto 1fr ',\n"; });
export var EditorPanel = function (_a) {
    var editorTabs = _a.editorTabs, editorRenderers = _a.editorRenderers;
    var _b = useState(0), selectedTab = _b[0], setSelectedTab = _b[1];
    var handleTabChange = function (event, newValue) {
        setSelectedTab(newValue);
    };
    return (React.createElement(Top, null,
        React.createElement(Tabs, { value: selectedTab, onChange: handleTabChange },
            React.createElement(Tab, { label: 'Editor' }),
            editorTabs
                ? editorTabs.map(function (tab) { return (React.createElement(Tab, { key: "tab-".concat(tab.name), label: tab.name })); })
                : null),
        React.createElement(TabContent, { index: 0, currentIndex: selectedTab },
            React.createElement(Editor, { editorRenderers: editorRenderers })),
        editorTabs
            ? editorTabs.map(function (tab, index) { return (React.createElement(TabContent, { key: "content-".concat(index + 1), index: index + 1, currentIndex: selectedTab },
                React.createElement(tab.Component, null))); })
            : null));
};
//# sourceMappingURL=EditorPanel.js.map