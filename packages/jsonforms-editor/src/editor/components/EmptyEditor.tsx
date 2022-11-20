/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Typography } from '@mui/material';
import React from 'react';
import { useDrop } from 'react-dnd';

import { useDispatch } from '../../core/context';
import { NewUISchemaElement, NEW_UI_SCHEMA_ELEMENT } from '../../core/dnd';
import { Actions } from '../../core/model';
import { styled } from '@mui/system';

export const EmptyEditor: React.FC = () => {
  const dispatch = useDispatch();
  const [{ isOver, uiSchemaElement }, drop] = useDrop({
    accept: NEW_UI_SCHEMA_ELEMENT,
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      uiSchemaElement: mon.getItem<NewUISchemaElement>()?.uiSchemaElement,
    }),
    drop: (): any => {
      dispatch(Actions.setUiSchema(uiSchemaElement));
    },
  });
  const Top = styled('div')(() => ({
    padding: 10,
    fontSize: isOver ? '1.1em' : '1em',
    border: isOver ? '1px solid #D3D3D3' : 'none',
    height: '100%',
  }));
  return (
    <Top ref={drop}>
      <Typography data-cy={`nolayout-drop`}>
        Drag and drop an element from the Palette to begin.
      </Typography>
    </Top>
  );
};
