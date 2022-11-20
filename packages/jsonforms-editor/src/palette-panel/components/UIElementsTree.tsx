/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useDrag } from 'react-dnd';

import { PaletteElement } from '../../core/api/paletteService';
import { DndItems } from '../../core/dnd';
import { EditorUISchemaElement } from '../../core/model/uischema';
import { StyledTreeItem, StyledTreeView } from './Tree';

interface UiSchemaTreeItemProps {
  uiSchemaElementProvider: () => EditorUISchemaElement;
  type: string;
  label: string;
  icon?: React.ReactNode;
}

const UiSchemaTreeItem: React.FC<UiSchemaTreeItemProps> = ({
  uiSchemaElementProvider,
  type,
  label,
  icon,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: DndItems.newUISchemaElement(uiSchemaElementProvider()),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    type: 'div',
  });
  return (
    <div ref={drag} data-cy={`${type}-source`}>
      <StyledTreeItem
        key={type}
        nodeId={type}
        label={label}
        icon={icon}
        isDraggingNow={isDragging}
      ></StyledTreeItem>
    </div>
  );
};

interface UIElementsTreeProps {
  elements: PaletteElement[];
}

const Div = styled('div')(({ theme }) => ({ marginBottom: theme.spacing(1) }));

export const UIElementsTree: React.FC<UIElementsTreeProps> = ({ elements }) => {
  return (
    <Div>
      <Typography variant='h6' color='inherit' noWrap>
        Layouts & Other
      </Typography>
      <StyledTreeView defaultExpanded={['']}>
        {elements.map(({ type, label, icon, uiSchemaElementProvider }) => (
          <UiSchemaTreeItem
            key={`treeitem-${type}`}
            type={type}
            label={label}
            icon={icon}
            uiSchemaElementProvider={uiSchemaElementProvider}
          />
        ))}
      </StyledTreeView>
    </Div>
  );
};
