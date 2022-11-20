var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSchema, useUiSchema } from '../context';
import { buildJsonSchema } from '../model';
import { buildUiSchema } from '../model/uischema';
var doBuildJsonSchema = function (schema) {
    return schema ? buildJsonSchema(schema) : schema;
};
var doBuildUiSchema = function (uiSchema) {
    return uiSchema ? buildUiSchema(uiSchema) : undefined;
};
/**
 * Json Schema for export
 */
export var useExportSchema = function () {
    var schema = useSchema();
    return useTransform(schema, doBuildJsonSchema);
};
/**
 * Ui Schema for export
 */
export var useExportUiSchema = function () {
    var uiSchema = useUiSchema();
    return useTransform(uiSchema, doBuildUiSchema);
};
/**
 * Transforms the given element whenever it changes.
 */
export var useTransform = function (element, transform) {
    var _a = useState(transform(element)), transformedElement = _a[0], setTransformedElement = _a[1];
    useEffectAfterInit(function () { return setTransformedElement(transform(element)); }, [element, transform]);
    return transformedElement;
};
/**
 * Hook similar to `useEffect` with the difference that the effect
 * is only executed from the second call onwards.
 */
var useEffectAfterInit = function (effect, dependencies) {
    var firstExecution = useRef(true);
    useEffect(function () {
        if (firstExecution.current) {
            firstExecution.current = false;
            return;
        }
        effect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, __spreadArray([], dependencies, true));
};
/** Force a rerender */
export var useUpdate = function () {
    var _a = useState(0), setCount = _a[1];
    var update = useCallback(function () {
        setCount(function (count) { return count + 1; });
    }, []);
    return update;
};
/** Executes the callback and forces a rerender whenever the callback changes */
export var useEffectWithUpdate = function (effectCallback) {
    var update = useUpdate();
    useEffect(function () {
        effectCallback();
        update();
    }, [effectCallback, update]);
};
//# sourceMappingURL=hooks.js.map