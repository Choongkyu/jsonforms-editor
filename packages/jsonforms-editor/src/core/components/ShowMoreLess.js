/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { Button, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
var Div = styled('div')(function (_a) {
    var theme = _a.theme;
    return "\n    padding-bottom: ".concat(theme.spacing(2), ";\n");
});
export var ShowMoreLess = function (_a) {
    var children = _a.children;
    var _b = useState(false), showMore = _b[0], setShowMore = _b[1];
    return (React.createElement(Div, null,
        React.createElement(Collapse, { in: showMore }, children),
        React.createElement(Button, { size: 'small', onClick: function () {
                setShowMore(function (oldState) { return !oldState; });
            } }, showMore ? 'Show Less' : 'Show More')));
};
//# sourceMappingURL=ShowMoreLess.js.map