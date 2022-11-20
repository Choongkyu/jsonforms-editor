var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { jsonSchemaDraft7, ruleSchema } from '../core/jsonschema';
/**
 * Register a new schema for the Json language, if it isn't already registered.
 * Schemas are identified by their uri and fileMatch rule, so that they don't
 * leak into unrelated Json editors.
 * @param editor
 *  The monaco editor
 * @param schemas
 *  Schemas to register
 */
export var addSchema = function (editor, schemas) {
    var registeredSchemas = editor.languages.json.jsonDefaults.diagnosticsOptions.schemas;
    if (registeredSchemas === undefined) {
        editor.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: __spreadArray([], schemas, true),
        });
    }
    else {
        var _loop_1 = function (schema) {
            var fileMatch = schema.fileMatch;
            var gridSchema = registeredSchemas.find(function (registeredSchema) {
                return registeredSchema.fileMatch === fileMatch &&
                    registeredSchema.uri === schema.uri;
            });
            if (!gridSchema) {
                registeredSchemas.push(__assign({}, schema));
            }
        };
        for (var _i = 0, schemas_1 = schemas; _i < schemas_1.length; _i++) {
            var schema = schemas_1[_i];
            _loop_1(schema);
        }
    }
};
/**
 * Configures the Monaco Editor to validate the input against JSON Schema Draft 7.
 */
export var configureJsonSchemaValidation = function (editor, modelUri) {
    /** Note that the Monaco Editor only supports JSON Schema Draft 7 itself,
     * so if we also want to support a later standard we still have to formalize
     * it in JSON Schema Draft 7*/
    addSchema(editor, [
        __assign(__assign({}, jsonSchemaDraft7), { fileMatch: [modelUri.toString()] }),
    ]);
};
/**
 * Configures the Monaco Editor to validate the input against the Rule UI Schema meta-schema.
 */
export var configureRuleSchemaValidation = function (editor, modelUri) {
    /** Note that the Monaco Editor only supports JSON Schema Draft 7 itself,
     * so if we also want to support a later standard we still have to formalize
     * it in JSON Schema Draft 7*/
    addSchema(editor, [
        __assign({}, jsonSchemaDraft7),
        __assign(__assign({}, ruleSchema), { fileMatch: [modelUri.toString()] }),
    ]);
};
export var getMonacoModelForUri = function (modelUri, initialValue) {
    var value = initialValue !== null && initialValue !== void 0 ? initialValue : '';
    var model = monaco.editor.getModel(modelUri);
    if (model) {
        model.setValue(value);
    }
    else {
        model = monaco.editor.createModel(value, 'json', modelUri);
    }
    return model;
};
//# sourceMappingURL=jsonSchemaValidation.js.map