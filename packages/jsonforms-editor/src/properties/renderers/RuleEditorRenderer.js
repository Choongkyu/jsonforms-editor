/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { rankWith, scopeEndsWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormHelperText, Grid, Typography, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useCallback, useMemo, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { ShowMoreLess } from '../../core/components';
import { configureRuleSchemaValidation, getMonacoModelForUri, } from '../../text-editor/jsonSchemaValidation';
var invalidJsonMessage = 'Not a valid rule JSON.';
var ruleDescription = 'Define conditions and effects that can dynamically control features of the UI based on data.';
var ruleExample = (React.createElement("div", null,
    React.createElement("h3", null, "Example"),
    React.createElement("p", null,
        "A rule that hides the UI Element it is contained in, when the value of the control with the scope ",
        React.createElement("b", null, "'#/properties/name'"),
        " is ",
        React.createElement("b", null, "'foo'"),
        ":"),
    React.createElement("pre", null, JSON.stringify({
        effect: 'HIDE',
        condition: {
            type: 'LEAF',
            scope: '#/properties/name',
            expectedValue: 'foo',
        },
    }, null, 2)),
    React.createElement("p", null,
        "Visit the",
        '  ',
        React.createElement("a", { href: 'https://jsonforms.io/docs/uischema/rules' }, "JSON Forms documentation"),
        ' ',
        "for more info.")));
var isValidRule = function (rule) {
    return !rule || (rule.effect && rule.condition);
};
var RuleEditor = function (props) {
    var data = props.data, path = props.path, handleChange = props.handleChange, errors = props.errors;
    var _a = useState(false), invalidJson = _a[0], setInvalidJson = _a[1];
    var modelUri = Uri.parse('json://core/specification/rules.json');
    var configureEditor = useCallback(function (editor) {
        configureRuleSchemaValidation(editor, modelUri);
    }, [modelUri]);
    var model = useMemo(function () { return getMonacoModelForUri(modelUri, JSON.stringify(data, null, 2)); }, [data, modelUri]);
    var setModel = useCallback(function (editor) {
        if (!model.isDisposed()) {
            editor.setModel(model);
        }
    }, [model]);
    var onSubmitRule = useCallback(function () {
        try {
            var value = model.getValue();
            var rule = value ? JSON.parse(value) : undefined;
            if (isValidRule(rule)) {
                setInvalidJson(false);
                handleChange(path, rule);
            }
            else {
                setInvalidJson(true);
            }
        }
        catch (error) {
            setInvalidJson(true);
        }
    }, [handleChange, model, path]);
    var isValid = errors.length === 0 && !invalidJson;
    return (React.createElement(Accordion, { defaultExpanded: !!data },
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
            React.createElement(Typography, null, "Rule")),
        React.createElement(AccordionDetails, null,
            React.createElement("div", { style: {
                    width: '100%',
                } },
                React.createElement(FormHelperText, { error: false }, ruleDescription),
                React.createElement(ShowMoreLess, null,
                    React.createElement(FormHelperText, { error: false }, ruleExample)),
                React.createElement(MonacoEditor, { language: 'json', editorWillMount: configureEditor, editorDidMount: setModel, height: 200, options: {
                        formatOnPaste: true,
                        formatOnType: true,
                        automaticLayout: true,
                    } }),
                React.createElement(Grid, { container: true, direction: 'row', spacing: 2, alignItems: 'center' },
                    React.createElement(Grid, { item: true },
                        React.createElement(Button, { variant: 'contained', onClick: onSubmitRule }, "Apply")),
                    React.createElement(Grid, { item: true },
                        React.createElement(FormHelperText, { error: true, hidden: isValid }, errors.length !== 0 ? errors : invalidJsonMessage)))))));
};
var RuleEditorRenderer = RuleEditor;
export var RuleEditorRendererRegistration = {
    tester: rankWith(100, scopeEndsWith('rule')),
    renderer: withJsonFormsControlProps(RuleEditorRenderer),
};
//# sourceMappingURL=RuleEditorRenderer.js.map