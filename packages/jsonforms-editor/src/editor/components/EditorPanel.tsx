/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';

import { TabContent } from '../../core/components';
import { Editor } from './Editor';

export interface EditorTab {
  name: string;
  Component: React.ComponentType;
}

const Top = styled('div')(() => ({
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr',
}));

interface EditorPanelProps {
  editorTabs?: EditorTab[];
  editorRenderers: JsonFormsRendererRegistryEntry[];
}
export const EditorPanel: React.FC<EditorPanelProps> = ({
  editorTabs,
  editorRenderers,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  return (
    <Top>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label='Editor' />
        {editorTabs
          ? editorTabs.map((tab) => (
              <Tab key={`tab-${tab.name}`} label={tab.name} />
            ))
          : null}
      </Tabs>
      <TabContent index={0} currentIndex={selectedTab}>
        <Editor editorRenderers={editorRenderers} />
      </TabContent>
      {editorTabs
        ? editorTabs.map((tab, index) => (
            <TabContent
              key={`content-${index + 1}`}
              index={index + 1}
              currentIndex={selectedTab}
            >
              <tab.Component />
            </TabContent>
          ))
        : null}
    </Top>
  );
};
