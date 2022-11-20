/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Button, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
export interface ShowMoreLessProps {
  children: React.ReactNode;
}

const Div = styled('div')(({ theme }) => ({ paddingBottom: theme.spacing(2) }));

export const ShowMoreLess: React.FC<ShowMoreLessProps> = ({ children }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Div>
      <Collapse in={showMore}>{children}</Collapse>
      <Button
        size='small'
        onClick={() => {
          setShowMore((oldState) => !oldState);
        }}
      >
        {showMore ? 'Show Less' : 'Show More'}
      </Button>
    </Div>
  );
};
