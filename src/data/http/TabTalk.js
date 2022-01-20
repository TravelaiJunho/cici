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
const postForTalk = (content, selectTag, inputTags, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('static_hashtags', selectTag);
    form.append('hashtags', inputTags);
    form.append('video_link_url', link);
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Post
    postMultipart(API.MEMBERSHIP_TAB_TALK.POST, form, listener);
}

////////////////////////////////////////
// Save
const saveForTalk = (id, content, selectTag, inputTags, deletes, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('static_hashtags', selectTag);
    form.append('hashtags', inputTags);
    form.append('video_link_url', link);
    form.append('delete_images', deletes)
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Put
    putMultipart(localize.formatString(API.MEMBERSHIP_TAB_TALK.MODIFY, id), form, listener);
}

////////////////////////////////////////
// Detail
const detailForTalk = (id, listener) => {
    get(localize.formatString(API.MEMBERSHIP_TAB_TALK.DETAIL, id), null, listener);
}

////////////////////////////////////////
// Like
const like = (id, listener) => {
    // Post
    post(localize.formatString(API.MEMBERSHIP_TAB_TALK.LIKE, id), null, listener);
}

////////////////////////////////////////
// Comment
const getCommentCount = (id, listener) => {
    // Get
    get(localize.formatString(API.MEMBERSHIP_TAB_TALK.COMMENT_COUNT, id), null, listener);
}

////////////////////////////////////////
// Delete
const deleteItemForTalk = (id, listener) => {
    // Delete
    _delete(localize.formatString(API.MEMBERSHIP_TAB_TALK.DELETE, id), null, listener);
}

////////////////////////////////////////
// Declare
const declareItem = (id, reason, content, listener) => {
    // Post
    post(localize.formatString(API.MEMBERSHIP_TAB_TALK.DECLARE, id), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
// Comment
const postCommentForTalk = (id, comment, listener) => {
    // Post
    post(localize.formatString(API.MEMBERSHIP_TAB_TALK.COMMENT_POST, id), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Comment List
const getCommentListForTalk = (id, page = 1, listener) => {
    // Get
    get(localize.formatString(API.MEMBERSHIP_TAB_TALK.COMMENT_LIST, id), {
        page: page
    }, listener);
}

////////////////////////////////////////
// Delete Comment
const deleteCommentItemForTalk = (id, commentId, listener) => {
    // Delete
    _delete(localize.formatString(API.MEMBERSHIP_TAB_TALK.COMMENT_DELETE_ITEM, id, commentId), null, listener);
}

////////////////////////////////////////
// Save Comment
const saveCommentForTalk = (id, commentId, comment, listener) => {
    // Put
    put(localize.formatString(API.MEMBERSHIP_TAB_TALK.COMMENT_MODIFY_ITEM, id, commentId), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Declare Comment
const declareCommentForTalk = (id, commentId, reason, content, listener) => {
    // Post
    post(localize.formatString(API.MEMBERSHIP_TAB_TALK.COMMENT_DECLARE_ITEM, id, commentId), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
export {
    postForTalk,
    saveForTalk,
    detailForTalk,
    like,
    getCommentCount,
    deleteItemForTalk,
    declareItem,
    // Comment
    postCommentForTalk,
    getCommentListForTalk,
    deleteCommentItemForTalk,
    saveCommentForTalk,
    declareCommentForTalk
}
