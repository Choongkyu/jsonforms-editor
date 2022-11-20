/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
//  */
import { Collapse } from '@mui/material';

import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { animated, useSpring } from 'react-spring'; // web.cjs is required for IE 11 support
import { styled } from '@mui/system';

const PaletteTransitionComponent = (props: TransitionProps) => {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
      filter: 'blur(0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
      filter: 'blur(0)',
    },
  });
  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
};

export const StyledTreeView = styled(TreeView)({ flexGrow: 1, maxWidth: 400 });

export const StyledTreeItem = styled(
  ({ isDraggingNow, ...props }: TreeItemProps & { isDraggingNow: boolean }) => (
    <TreeItem {...props} TransitionComponent={PaletteTransitionComponent} />
  )
)(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    borderLeft: `1px dashed fade(text.primary, 0.4)`,
  },
}));
