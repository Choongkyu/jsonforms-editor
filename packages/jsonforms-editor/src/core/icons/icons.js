/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { styled } from '@mui/material';
import CropFreeIcon from '@mui/icons-material/CropFree';
import Height from '@mui/icons-material/Height';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TabIcon from '@mui/icons-material/Tab';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import React from 'react';
import { ARRAY, OBJECT, PRIMITIVE } from '../model';
export var VerticalIcon = Height;
export var HorizontalIcon = styled(Height)({
    transform: 'rotate(90deg)',
});
export var GroupIcon = CropFreeIcon;
export var CategorizationIcon = TabIcon;
export var CategoryIcon = CropFreeIcon;
export var LabelIcon = TextFieldsIcon;
export var ControlIcon = InsertLinkIcon;
export var ObjectIcon = ListAltIcon;
export var ArrayIcon = QueueOutlinedIcon;
export var PrimitiveIcon = LabelOutlinedIcon;
export var OtherIcon = RadioButtonUncheckedIcon;
export var getIconForSchemaType = function (type) {
    switch (type) {
        case OBJECT:
            return ObjectIcon;
        case ARRAY:
            return ArrayIcon;
        case PRIMITIVE:
            return PrimitiveIcon;
        default:
            return OtherIcon;
    }
};
export var getIconForUISchemaType = function (type) {
    switch (type) {
        case 'HorizontalLayout':
            return HorizontalIcon;
        case 'VerticalLayout':
            return VerticalIcon;
        case 'Group':
            return GroupIcon;
        case 'Category':
            return CategoryIcon;
        case 'Categorization':
            return CategorizationIcon;
        case 'Control':
            return ControlIcon;
        case 'Label':
            return LabelIcon;
        default:
            return OtherIcon;
    }
};
export var UISchemaIcon = function (_a) {
    var type = _a.type;
    return React.createElement(getIconForUISchemaType(type), {});
};
export var SchemaIcon = function (_a) {
    var type = _a.type;
    return React.createElement(getIconForSchemaType(type), {});
};
//# sourceMappingURL=icons.js.map