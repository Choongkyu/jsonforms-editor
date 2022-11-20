import { materialCells } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { isEqual, omit } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, usePropertiesService, useSchema, useSelection, useUiSchema, } from '../../core/context';
import { Actions } from '../../core/model';
import { tryFindByUUID } from '../../core/util/schemasUtil';
export var Properties = function (_a) {
    var propertyRenderers = _a.propertyRenderers;
    var selection = useSelection()[0];
    var uiSchema = useUiSchema();
    var schema = useSchema();
    var dispatch = useDispatch();
    var uiElement = useMemo(function () { return tryFindByUUID(uiSchema, selection === null || selection === void 0 ? void 0 : selection.uuid); }, [selection, uiSchema]);
    var data = useMemo(function () {
        return omit(uiElement, [
            'uuid',
            'parent',
            'elements',
            'linkedSchemaElement',
            'options.detail',
        ]);
    }, [uiElement]);
    var updateProperties = useCallback(function (_a) {
        var updatedProperties = _a.data;
        if (uiElement && !isEqual(data, updatedProperties)) {
            dispatch(Actions.updateUISchemaElement(uiElement.uuid, updatedProperties));
        }
    }, [data, dispatch, uiElement]);
    var propertiesService = usePropertiesService();
    var _b = useState(), properties = _b[0], setProperties = _b[1];
    useEffect(function () {
        if (!uiElement) {
            return;
        }
        var linkedSchemaUUID = uiElement.linkedSchemaElement;
        var elementSchema = linkedSchemaUUID && schema
            ? tryFindByUUID(schema, linkedSchemaUUID)
            : undefined;
        setProperties(propertiesService.getProperties(uiElement, elementSchema));
    }, [propertiesService, schema, uiElement]);
    if (!selection)
        return React.createElement(NoSelection, null);
    return properties ? (React.createElement(JsonForms, { data: data, schema: properties.schema, uischema: properties.uiSchema, onChange: updateProperties, renderers: propertyRenderers, cells: materialCells })) : (React.createElement(NoProperties, null));
};
var NoSelection = function () { return React.createElement("div", null, "No selection"); };
var NoProperties = function () { return (React.createElement("div", null, "Selected element does not have any configurable properties.")); };
//# sourceMappingURL=Properties.js.map