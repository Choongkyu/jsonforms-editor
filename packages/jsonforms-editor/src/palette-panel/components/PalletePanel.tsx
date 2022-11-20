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
import { SchemaElement } from '../../core/model';
import { JsonSchemaPanel } from './JsonSchemaPanel';
import { SchemaTreeView } from './SchemaTree';
import { UIElementsTree } from './UIElementsTree';
import { UISchemaPanel } from './UISchemaPanel';

const Top = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export interface PaletteTab {
  name: string;
  Component: React.ReactElement;
}

export interface PalettePanelProps {
  paletteTabs?: PaletteTab[];
}

export const defaultPalettePanelTabs: PaletteTab[] = [
  {
    name: 'JSON Schema',
    Component: <JsonSchemaPanel />,
  },
  { name: 'UI Schema', Component: <UISchemaPanel /> },
];

export const PalettePanel: React.FC<PalettePanelProps> = ({ paletteTabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };
  const schema: SchemaElement | undefined = useSchema();
  const paletteService = usePaletteService();
  return (
    <Top>
      <Tabs value={selectedTab} onChange={handleTabChange} variant='scrollable'>
        <Tab label='Palette' data-cy='palette-tab' />
        {paletteTabs
          ? paletteTabs.map((tab) => (
              <Tab
                key={`tab-${tab.name}`}
                label={tab.name}
                data-cy={`tab-${tab.name}`}
              />
            ))
          : null}
      </Tabs>
      <TabContent index={0} currentIndex={selectedTab}>
        <UIElementsTree elements={paletteService.getPaletteElements()} />
        <SchemaTreeView schema={schema} />
      </TabContent>
      {paletteTabs
        ? paletteTabs.map((tab, index) => (
            <TabContent
              key={`tab-content-${index + 1}`}
              index={index + 1}
              currentIndex={selectedTab}
            >
              {tab.Component}
            </TabContent>
          ))
        : null}
    </Top>
  );
};
