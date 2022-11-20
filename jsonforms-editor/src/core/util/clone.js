/**
 * ---------------------------------------------------------------------
 * Copyright (c) 2021 EclipseSource Munich
 * Licensed under MIT
 * https://github.com/eclipsesource/jsonforms-editor/blob/master/LICENSE
 * ---------------------------------------------------------------------
 */
import { cloneDeep } from 'lodash';
// Error imports needed for declaration generation (declaration:true in tsconfig)
import { findByUUID, isUUIDError } from './schemasUtil';
/**
 * Clones the whole root tree, matches the element by UUID in the new tree and returns a handle to it.
 * Returns an error when the clone process didn't work or the cloned root, if no uuid was provided.
 */
export var cloneTree = function (root, uuid) {
    var clonedRoot = cloneDeep(root);
    return uuid ? findByUUID(clonedRoot, uuid) : clonedRoot;
};
export var withCloneTree = function (rootTree, elementUUID, fallback, process) {
    var clonedElement = cloneTree(rootTree, elementUUID);
    if (isUUIDError(clonedElement)) {
        console.error('An error occured when cloning element with UUID', elementUUID);
        // Do nothing
        return fallback;
    }
    return process(clonedElement);
};
/**
 * Convenience wrapper to clone two trees at the same time.
 */
export var withCloneTrees = function (rootTree1, uuid1, rootTree2, uuid2, fallback, process) {
    return withCloneTree(rootTree1, uuid1, fallback, function (clonedElement1) {
        return withCloneTree(rootTree2, uuid2, fallback, function (clonedElement2) {
            return process(clonedElement1, clonedElement2);
        });
    });
};
//# sourceMappingURL=clone.js.map