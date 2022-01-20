////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get, post, postMultipart, _delete, put, putMultipart} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import Common from "../../util/Common";
import localize from "../../util/Localize";

////////////////////////////////////////
// Post
const postForFromDaniel = (content, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('video_link_url', link);
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Post
    postMultipart(API.COMMUNITY_TAB_FROM_DANIEL.POST, form, listener);
}

////////////////////////////////////////
// Save
const saveForFromDaniel = (id, content, deletes, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('video_link_url', link);
    form.append('delete_images', deletes)
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Put
    putMultipart(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.MODIFY, id), form, listener);
}

////////////////////////////////////////
// Detail
const detailForFromDaniel = (id, listener) => {
    get(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.DETAIL, id), null, listener);
}

////////////////////////////////////////
// Like
const like = (id, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.LIKE, id), null, listener);
}

////////////////////////////////////////
// Comment
const getCommentCount = (id, listener) => {
    // Get
    get(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.COMMENT_COUNT, id), null, listener);
}

////////////////////////////////////////
// Delete
const deleteItemForFromDaniel = (id, listener) => {
    // Delete
    _delete(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.DELETE, id), null, listener);
}

////////////////////////////////////////
// Declare
const declareItem = (id, reason, content, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.DECLARE, id), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
// Comment
const postCommentForFromDaniel = (id, comment, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.COMMENT_POST, id), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Comment List
const getCommentListForFromDaniel = (id, page = 1, listener) => {
    // Get
    get(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.COMMENT_LIST, id), {
        page: page
    }, listener);
}

////////////////////////////////////////
// Delete Comment
const deleteCommentItemForFromDaniel = (id, commentId, listener) => {
    // Delete
    _delete(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.COMMENT_DELETE_ITEM, id, commentId), null, listener);
}

////////////////////////////////////////
// Save Comment
const saveCommentForFromDaniel = (id, commentId, comment, listener) => {
    // Put
    put(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.COMMENT_MODIFY_ITEM, id, commentId), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Declare Comment
const declareCommentForFromDaniel = (id, commentId, reason, content, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_FROM_DANIEL.COMMENT_DECLARE_ITEM, id, commentId), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
export {
    postForFromDaniel,
    saveForFromDaniel,
    detailForFromDaniel,
    like,
    getCommentCount,
    deleteItemForFromDaniel,
    declareItem,
    // Comment
    postCommentForFromDaniel,
    getCommentListForFromDaniel,
    deleteCommentItemForFromDaniel,
    saveCommentForFromDaniel,
    declareCommentForFromDaniel
}
