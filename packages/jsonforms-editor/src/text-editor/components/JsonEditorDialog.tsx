/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useMemo } from 'react';
import MonacoEditor from 'react-monaco-editor';

import {
  configureJsonSchemaValidation,
  EditorApi,
  getMonacoModelForUri,
  TextType,
} from '../jsonSchemaValidation';
import { DialogContent, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

interface JsonEditorDialogProps {
  open: boolean;
  title: string;
  initialContent: any;
  type: TextType;
  onApply: (newContent: any) => void;
  onCancel: () => void;
}

export const JsonEditorDialog: React.FC<JsonEditorDialogProps> = ({
  open,
  title,
  initialContent,
  type,
  onApply,
  onCancel,
}) => {
  const modelUri = Uri.parse('json://core/specification/schema.json');

  const configureEditor = useCallback(
    (editor: EditorApi) => {
      if (type === 'JSON Schema') {
        configureJsonSchemaValidation(editor, modelUri);
      }
    },
    [type, modelUri]
  );

  const model = useMemo(
    () => getMonacoModelForUri(modelUri, initialContent),
    [initialContent, modelUri]
  );

  const setModel = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor) => {
      if (!model.isDisposed()) {
        editor.setModel(model);
      }
    },
    [model]
  );

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      TransitionComponent={Transition}
      sx={{
        paper: {
          height: '100%', // 'MonacoEditor' uses height to grow
          minHeight: '95vh',
          maxHeight: '95vh',
        },
      }}
      maxWidth='lg'
      fullWidth
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            onClick={onCancel}
            aria-label='cancel'
            data-cy='cancel'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' color='inherit' noWrap>
            {title} Text Edit
          </Typography>
          <Button
            variant='contained'
            onClick={() => onApply(model.getValue())}
            data-cy='apply'
          >
            Apply
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          overflow: 'hidden',
          marginTop: (theme) => theme.spacing(2),
          flex: 1,
        }}
      >
        <MonacoEditor
          language='json'
          editorDidMount={(editor) => {
            setModel(editor);
            editor.focus();
          }}
          editorWillMount={configureEditor}
        />
      </DialogContent>
    </Dialog>
  );
};
