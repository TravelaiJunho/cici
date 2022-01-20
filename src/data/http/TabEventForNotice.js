////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {_delete, get, post, postMultipart, put} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import Common from "../../util/Common";
import localize from "../../util/Localize";

////////////////////////////////////////
// Banner
const bannerNoticeEventForNotice = (listener) => {
    get(API.NOTICE_TAB_EVENT.NOTICE_BANNER, null, listener);
}

////////////////////////////////////////
// Detail
const detailNoticeEventForNotice = (id, listener) => {
    get(localize.formatString(API.NOTICE_TAB_EVENT.NOTICE_DETAIL, id), null, listener);
}

////////////////////////////////////////
// Post
const postPartEventForNotice = (id, content, selectTag, inputTags, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('event', id);
    form.append('content', content);
    form.append('static_hashtags', selectTag);
    form.append('hashtags', inputTags);
    form.append('video_link_url', link);
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Post
    postMultipart(API.NOTICE_TAB_EVENT.PART_POST, form, listener);
}

////////////////////////////////////////
// Save
// const saveNoticeEventForNotice = (id, content, selectTag, inputTags, deletes, images, link, listener) => {
//     // Form
//     let form = new FormData();
//     form.append('content', content);
//     form.append('static_hashtags', selectTag);
//     form.append('hashtags', inputTags);
//     form.append('video_link_url', link);
//     form.append('delete_images', deletes)
//     if (Common.checkListSize(images)) images.map(image => form.append('images', image));
//     // Put
//     putMultipart(localize.formatString(API.NOTICE_TAB_EVENT.PART_MODIFY, id), form, listener);
// }

////////////////////////////////////////
// Detail
const detailPartEventForNotice = (id, listener) => {
    get(localize.formatString(API.NOTICE_TAB_EVENT.PART_DETAIL, id), null, listener);
}

////////////////////////////////////////
// Like
// const like = (id, listener) => {
//     // Post
//     post(localize.formatString(API.NOTICE_TAB_EVENT.PART_LIKE, id), null, listener);
// }

////////////////////////////////////////
// Delete
const deleteItemPartEventForNotice = (id, listener) => {
    // Delete
    _delete(localize.formatString(API.NOTICE_TAB_EVENT.PART_DELETE, id), null, listener);
}

////////////////////////////////////////
// Declare
const declareItem = (id, reason, content, listener) => {
    // Post
    post(localize.formatString(API.NOTICE_TAB_EVENT.PART_DECLARE, id), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
// Comment Post
const postCommentPartEventForNotice = (id, comment, listener) => {
    // Post
    post(localize.formatString(API.NOTICE_TAB_EVENT.PART_COMMENT_POST, id), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Comment List
const getCommentListPartEventForNotice = (id, page = 1, listener) => {
    // Get
    get(localize.formatString(API.NOTICE_TAB_EVENT.PART_COMMENT_LIST, id), {
        page: page
    }, listener);
}

////////////////////////////////////////
// Delete Comment
const deleteCommentItemPartEventForNotice = (id, commentId, listener) => {
    // Delete
    _delete(localize.formatString(API.NOTICE_TAB_EVENT.PART_COMMENT_DELETE_ITEM, id, commentId), null, listener);
}

////////////////////////////////////////
// Save Comment
const saveCommentPartEventForNotice = (id, commentId, comment, listener) => {
    // Put
    put(localize.formatString(API.NOTICE_TAB_EVENT.PART_COMMENT_MODIFY_ITEM, id, commentId), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Declare Comment
const declareCommentPartEventForNotice = (id, commentId, reason, content, listener) => {
    // Post
    post(localize.formatString(API.NOTICE_TAB_EVENT.PART_COMMENT_DECLARE_ITEM, id, commentId), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
// Comment Count
const getCommentCount = (id, listener) => {
    // Get
    get(localize.formatString(API.NOTICE_TAB_EVENT.PART_COMMENT_COUNT, id), null, listener);
}

////////////////////////////////////////
export {
    bannerNoticeEventForNotice,
    detailNoticeEventForNotice,
    // Part
    postPartEventForNotice,
    detailPartEventForNotice,
    deleteItemPartEventForNotice,
    declareItem,
    // Comment
    postCommentPartEventForNotice,
    getCommentListPartEventForNotice,
    deleteCommentItemPartEventForNotice,
    saveCommentPartEventForNotice,
    declareCommentPartEventForNotice,
    getCommentCount,
}
