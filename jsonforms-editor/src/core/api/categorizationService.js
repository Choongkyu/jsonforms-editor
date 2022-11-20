/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CategorizationServiceImpl = /** @class */ (function () {
    function CategorizationServiceImpl() {
        var _this = this;
        this.parentUuids = new Map();
        this.selectedTabs = new Map();
        this.getTabSelection = function (categorization) { return _this.selectedTabs.get(categorization.uuid); };
        this.setTabSelection = function (categorization, selection) {
            _this.selectedTabs.set(categorization.uuid, selection);
            if (!_this.parentUuids.has(categorization.uuid)) {
                // capture element parents that are Categorization or Category
                _this.parentUuids.set(categorization.uuid, _this.getParentCategoryIds(categorization.parent));
            }
        };
        this.clearTabSelections = function () {
            _this.selectedTabs.clear();
            _this.parentUuids.clear();
        };
        this.removeElement = function (element) {
            // no need to hold the memory for Map entry in this case
            _this.selectedTabs.delete(element.uuid);
            _this.parentUuids.delete(element.uuid);
            _this.parentUuids.forEach(function (parents, uuid, map) {
                if (parents.includes(element.uuid)) {
                    map.delete(uuid);
                    _this.selectedTabs.delete(uuid);
                }
            });
        };
        this.getParentCategoryIds = function (categorization) {
            if (categorization === undefined) {
                return [];
            }
            if (categorization.type === 'Categorization' ||
                categorization.type === 'Category') {
                return __spreadArray([
                    categorization.uuid
                ], _this.getParentCategoryIds(categorization.parent), true);
            }
            else {
                return _this.getParentCategoryIds(categorization.parent);
            }
        };
    }
    return CategorizationServiceImpl;
}());
export { CategorizationServiceImpl };
//# sourceMappingURL=categorizationService.js.map