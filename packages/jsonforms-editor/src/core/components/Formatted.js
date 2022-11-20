/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import React from 'react';
export var FormattedJson = function (object) {
    return React.createElement("pre", null, JSON.stringify(object, null, 2));
};
//# sourceMappingURL=Formatted.js.map