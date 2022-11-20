/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */

import { Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDrag } from 'react-dnd';

import { OkCancelDialog } from '../../core/components/OkCancelDialog';
import { useDispatch, useSchema, useSelection } from '../../core/context';
import { DndItems } from '../../core/dnd';
import { SchemaIcon, UISchemaIcon } from '../../core/icons';
import { Actions } from '../../core/model';
import {
  EditorUISchemaElement,
  getUISchemaPath,
  hasChildren,
} from '../../core/model/uischema';
import { isEditorControl, tryFindByUUID } from '../../core/util/schemasUtil';

export interface EditorElementProps {
  wrappedElement: EditorUISchemaElement;
  elementIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const EditorElement: React.FC<EditorElementProps> = ({
  wrappedElement,
  elementIcon,
  children,
}) => {
  const schema = useSchema();
  const [selection, setSelection] = useSelection();
  const dispatch = useDispatch();
  const [openConfirmRemoveDialog, setOpenConfirmRemoveDialog] =
    React.useState(false);
  const elementSchema = tryFindByUUID(
    schema,
    wrappedElement.linkedSchemaElement
  );
  const [{ isDragging }, drag] = useDrag({
    type: 'moveUISchemaElement',
    item: DndItems.moveUISchemaElement(wrappedElement, elementSchema),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const uiPath = getUISchemaPath(wrappedElement);
  const isSelected = selection?.uuid === wrappedElement.uuid;
  const ruleEffect = wrappedElement.rule?.effect.toLocaleUpperCase();

  const icon =
    elementIcon ??
    (elementSchema ? (
      <SchemaIcon type={elementSchema.type} />
    ) : (
      <UISchemaIcon type={wrappedElement.type} />
    ));
  return (
    <Grid
      item
      data-cy={`editorElement-${uiPath}`}
      sx={{
        border: isSelected ? '1px solid #a9a9a9' : '1px solid #d3d3d3',
        padding: (theme) => theme.spacing(1),
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isSelected ? 'rgba(63, 81, 181, 0.08)' : '#fafafa',
        width: '100%',
        alignSelf: 'baseline',
        minWidth: 'fit-content',
      }}
      ref={drag}
      onClick={(event) => {
        event.stopPropagation();
        const newSelection = { uuid: wrappedElement.uuid };
        setSelection(newSelection);
      }}
    >
      <Grid
        item
        container
        direction='row'
        wrap='nowrap'
        sx={{
          '&:hover $elementControls': {
            opacity: 1,
          },
        }}
        data-cy={`editorElement-${uiPath}-header`}
      >
        <Grid item container alignItems='center' xs>
          {icon}
          {ruleEffect ? (
            <Grid
              item
              container
              direction='row'
              alignItems='center'
              wrap='nowrap'
              xs
            >
              <Typography
                variant='subtitle2'
                sx={{
                  fontWeight: 'bolder',
                  color: (theme) => theme.palette.text.primary,
                  marginRight: (theme) => theme.spacing(0.5),
                  marginLeft: (theme) => theme.spacing(1),
                }}
              >
                {'R'}
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  fontStyle: 'italic',
                  color: (theme) => theme.palette.text.secondary,
                }}
              >{`(${ruleEffect})`}</Typography>
            </Grid>
          ) : null}
          {isEditorControl(wrappedElement) && (
            <Grid
              item
              container
              direction='row'
              alignItems='center'
              wrap='nowrap'
              xs
            >
              <Typography
                variant='caption'
                sx={{
                  fontStyle: 'italic',
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                {wrappedElement.scope}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          container
          sx={{
            opacity: 0,
          }}
          justifyContent='flex-end'
          alignItems='center'
          xs
        >
          <IconButton
            data-cy={`editorElement-${uiPath}-removeButton`}
            size='small'
            onClick={() => {
              hasChildren(wrappedElement)
                ? setOpenConfirmRemoveDialog(true)
                : dispatch(Actions.removeUiSchemaElement(wrappedElement.uuid));
            }}
          >
            <DeleteIcon />
          </IconButton>

          <OkCancelDialog
            open={openConfirmRemoveDialog}
            text={'Remove element and all its contents from the UI Schema?'}
            onOk={() => {
              dispatch(Actions.removeUiSchemaElement(wrappedElement.uuid));
              setOpenConfirmRemoveDialog(false);
            }}
            onCancel={() => setOpenConfirmRemoveDialog(false)}
          />
        </Grid>
      </Grid>
      {children}
    </Grid>
  );
};
