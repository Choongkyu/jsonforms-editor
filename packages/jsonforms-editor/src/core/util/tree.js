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
 * Returns an array starting with the current element followed by its parents
 */
export var getHierarchy = function (element) { return (!element ? [] : __spreadArray([element], getHierarchy(element.parent), true)); };
//# sourceMappingURL=tree.js.map