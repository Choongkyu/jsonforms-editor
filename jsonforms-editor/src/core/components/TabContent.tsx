/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { styled } from '@mui/system';
import React from 'react';
export interface TabContentProps {
  children?: React.ReactNode;
  index: number;
  currentIndex: number;
}

const Div = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 1, 0, 1),
  height: '100%',
  overflow: 'auto',
}));

export const TabContent: React.FC<TabContentProps> = (
  props: TabContentProps
) => {
  const { children, index, currentIndex, ...other } = props;
  return (
    <Div hidden={currentIndex !== index} {...other}>
      {currentIndex === index && children}
    </Div>
  );
};
