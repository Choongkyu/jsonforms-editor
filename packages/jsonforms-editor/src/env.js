/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
export var env = function () {
    var _a = process.env, _b = _a.REACT_APP_DEBUG, DEBUG = _b === void 0 ? 'false' : _b, NODE_ENV = _a.NODE_ENV;
    return { NODE_ENV: NODE_ENV, DEBUG: DEBUG };
};
//# sourceMappingURL=env.js.map