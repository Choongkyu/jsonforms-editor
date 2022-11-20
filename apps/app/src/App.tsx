/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React from 'react';
import {
  defaultSchemaDecorators,
  defaultSchemaProviders,
  JsonFormsEditor,
  ReactMaterialPreview,
} from '@jsonforms/editor';

import { AngularMaterialPreview } from './components/AngularMaterialPreview';
import { Footer } from './components/Footer';
import { ExampleSchemaService } from './core/schemaService';

const schemaService = new ExampleSchemaService();
export const App = () => (
  <JsonFormsEditor
    schemaService={schemaService}
    schemaProviders={defaultSchemaProviders}
    schemaDecorators={defaultSchemaDecorators}
    editorTabs={[
      { name: 'Preview (React)', Component: ReactMaterialPreview },
      { name: 'Preview (Angular)', Component: AngularMaterialPreview },
    ]}
    footer={Footer}
  />
);
