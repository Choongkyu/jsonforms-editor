import { createControlWithScope, createLayout, } from '../util/generators/uiSchema';
import { getRoot } from '../util/schemasUtil';
import { buildEditorUiSchemaTree, containsControls, getDetailContainer, } from './uischema';
test('set uuids on single element', function () {
    var element = simpleControl();
    var enrichedElement = buildEditorUiSchemaTree(element);
    expect(enrichedElement).toHaveProperty('uuid');
});
test('set uuids on nested elements', function () {
    var layout = simpleLayout();
    var enrichedLayout = buildEditorUiSchemaTree(layout);
    expect(enrichedLayout).toHaveProperty('uuid');
    expect(enrichedLayout.elements[0]).toHaveProperty('uuid');
    expect(enrichedLayout.elements[1]).toHaveProperty('uuid');
});
test('set uuids on detail', function () {
    var controlWithDetail = simpleControl();
    controlWithDetail.options = { detail: simpleLayout() };
    var enrichedLayout = buildEditorUiSchemaTree(controlWithDetail);
    expect(enrichedLayout).toHaveProperty('uuid');
    expect(enrichedLayout.options.detail.elements[0]).toHaveProperty('uuid');
    expect(enrichedLayout.options.detail.elements[1]).toHaveProperty('uuid');
});
test('set parent on detail', function () {
    var controlWithDetail = simpleControl();
    controlWithDetail.options = { detail: simpleLayout() };
    var enrichedLayout = buildEditorUiSchemaTree(controlWithDetail);
    expect(getRoot(enrichedLayout.options.detail)).toBe(enrichedLayout);
    expect(getRoot(enrichedLayout.options.detail.elements[0])).toBe(enrichedLayout);
});
test('isInDetail', function () {
    var controlWithDetail = simpleControl();
    controlWithDetail.options = { detail: simpleLayout() };
    var enrichedControlWithDetail = buildEditorUiSchemaTree(controlWithDetail);
    expect(enrichedControlWithDetail).toBeDefined();
    expect(getDetailContainer(enrichedControlWithDetail)).toBeFalsy();
    expect(getDetailContainer(enrichedControlWithDetail.options.detail)).toBe(enrichedControlWithDetail);
    expect(getDetailContainer(enrichedControlWithDetail.options.detail.elements[0])).toBe(enrichedControlWithDetail);
});
test('containsControls', function () {
    expect(containsControls(simpleEditorControl())).toBeTruthy();
    var layout = simpleEditorLayout();
    expect(containsControls(layout)).toBeTruthy();
    layout.elements = [];
    expect(containsControls(layout)).toBeFalsy();
});
var simpleControl = function () { return ({
    type: 'Control',
    scope: '#',
}); };
var simpleLayout = function () { return ({
    type: 'VerticalLayout',
    elements: [simpleControl(), simpleControl()],
}); };
var simpleEditorControl = function () { return createControlWithScope('#'); };
var simpleEditorLayout = function () {
    var layout = createLayout('VerticalLayout');
    layout.elements = [simpleEditorControl(), simpleEditorControl()];
    return layout;
};
//# sourceMappingURL=uischema.test.js.map