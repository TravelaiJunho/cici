////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {_delete, get, post, postMultipart, put, putMultipart} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import Common from "../../util/Common";
import localize from "../../util/Localize";

////////////////////////////////////////
// Post
const postForToDaniel = (content, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('video_link_url', link);
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Post
    postMultipart(API.COMMUNITY_TAB_TO_DANIEL.POST, form, listener);
}

////////////////////////////////////////
// Save
const saveForToDaniel = (id, content, deletes, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('video_link_url', link);
    form.append('delete_images', deletes)
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Put
    putMultipart(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.MODIFY, id), form, listener);
}

////////////////////////////////////////
// Detail
const detailForToDaniel = (id, listener) => {
    get(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.DETAIL, id), null, listener);
}

////////////////////////////////////////
// Like
const like = (id, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.LIKE, id), null, listener);
}

////////////////////////////////////////
// Comment
const getCommentCount = (id, listener) => {
    // Get
    get(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.COMMENT_COUNT, id), null, listener);
}

////////////////////////////////////////
// Delete
const deleteItemForToDaniel = (id, listener) => {
    // Delete
    _delete(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.DELETE, id), null, listener);
}

////////////////////////////////////////
// Declare
const declareItem = (id, reason, content, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.DECLARE, id), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
// Comment
const postCommentForToDaniel = (id, comment, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.COMMENT_POST, id), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Comment List
const getCommentListForToDaniel = (id, page = 1, listener) => {
    // Get
    get(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.COMMENT_LIST, id), {
        page: page
    }, listener);
}

////////////////////////////////////////
// Delete Comment
const deleteCommentItemForToDaniel = (id, commentId, listener) => {
    // Delete
    _delete(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.COMMENT_DELETE_ITEM, id, commentId), null, listener);
}

////////////////////////////////////////
// Save Comment
const saveCommentForToDaniel = (id, commentId, comment, listener) => {
    // Put
    put(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.COMMENT_MODIFY_ITEM, id, commentId), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Declare Comment
const declareCommentForToDaniel = (id, commentId, reason, content, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TO_DANIEL.COMMENT_DECLARE_ITEM, id, commentId), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
export {
    postForToDaniel,
    saveForToDaniel,
    detailForToDaniel,
    like,
    getCommentCount,
    deleteItemForToDaniel,
    declareItem,
    // Comment
    postCommentForToDaniel,
    getCommentListForToDaniel,
    deleteCommentItemForToDaniel,
    saveCommentForToDaniel,
    declareCommentForToDaniel
}
