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
const postForTalkTalk = (content, selectTag, inputTags, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('static_hashtags', selectTag);
    form.append('hashtags', inputTags);
    form.append('video_link_url', link);
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Post
    postMultipart(API.COMMUNITY_TAB_TALK_TALK.POST, form, listener);
}

////////////////////////////////////////
// Save
const saveForTalkTalk = (id, content, selectTag, inputTags, deletes, images, link, listener) => {
    // Form
    let form = new FormData();
    form.append('content', content);
    form.append('static_hashtags', selectTag);
    form.append('hashtags', inputTags);
    form.append('video_link_url', link);
    form.append('delete_images', deletes)
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Put
    putMultipart(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.MODIFY, id), form, listener);
}

////////////////////////////////////////
// Detail
const detailForTalkTalk = (id, listener) => {
    get(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.DETAIL, id), null, listener);
}

////////////////////////////////////////
// Like
const like = (id, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.LIKE, id), null, listener);
}

////////////////////////////////////////
// Comment
const getCommentCount = (id, listener) => {
    // Get
    get(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.COMMENT_COUNT, id), null, listener);
}

////////////////////////////////////////
// Delete
const deleteItemForTalkTalk = (id, listener) => {
    // Delete
    _delete(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.DELETE, id), null, listener);
}

////////////////////////////////////////
// Declare
const declareItem = (id, reason, content, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.DECLARE, id), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
// Comment
const postCommentForTalkTalk = (id, comment, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.COMMENT_POST, id), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Comment List
const getCommentListForTalkTalk = (id, page = 1, listener) => {
    // Get
    get(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.COMMENT_LIST, id), {
        page: page
    }, listener);
}

////////////////////////////////////////
// Delete Comment
const deleteCommentItemForTalkTalk = (id, commentId, listener) => {
    // Delete
    _delete(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.COMMENT_DELETE_ITEM, id, commentId), null, listener);
}

////////////////////////////////////////
// Save Comment
const saveCommentForTalkTalk = (id, commentId, comment, listener) => {
    // Put
    put(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.COMMENT_MODIFY_ITEM, id, commentId), {
        comment: comment
    }, listener);
}

////////////////////////////////////////
// Declare Comment
const declareCommentForTalkTalk = (id, commentId, reason, content, listener) => {
    // Post
    post(localize.formatString(API.COMMUNITY_TAB_TALK_TALK.COMMENT_DECLARE_ITEM, id, commentId), {
        reason: reason,
        content: content
    }, listener);
}

////////////////////////////////////////
export {
    postForTalkTalk,
    saveForTalkTalk,
    detailForTalkTalk,
    like,
    getCommentCount,
    deleteItemForTalkTalk,
    declareItem,
    // Comment
    postCommentForTalkTalk,
    getCommentListForTalkTalk,
    deleteCommentItemForTalkTalk,
    saveCommentForTalkTalk,
    declareCommentForTalkTalk
}
