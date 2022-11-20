/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Grid, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';

import React from 'react';

import { useUiSchema } from '../../core/context';
import { useExportSchema } from '../../core/util/hooks';
import { EmptyEditor } from './EmptyEditor';

// export interface ThemeOptions {
//   shape?: ShapeOptions;
//   breakpoints?: BreakpointsOptions;
//   direction?: Direction;
//   mixins?: unknown;
//   palette?: Record<string, any>;
//   shadows?: unknown;
//   spacing?: SpacingOptions;
//   transitions?: unknown;
//   components?: Record<string, any>;
//   typography?: unknown;
//   zIndex?: Record<string, number>;
// }

// const theme = createTheme({
//   MuiFormControl: {
//     root: {
//       overflow: 'hidden',
//     },
//   },
// });

export interface EditorProps {
  editorRenderers: JsonFormsRendererRegistryEntry[];
}
export const Editor: React.FC<EditorProps> = ({ editorRenderers }) => {
  const schema = useExportSchema();
  const uiSchema = useUiSchema();
  return uiSchema ? (
    <Grid container>
      {/* <ThemeProvider theme={theme}> */}
      <JsonForms
        data={{}}
        schema={schema}
        uischema={uiSchema}
        renderers={editorRenderers}
        cells={materialCells}
      />
      {/* </ThemeProvider> */}
    </Grid>
  ) : (
    <EmptyEditor />
  );
};
