////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get, postMultipart} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";
import Common from "../../util/Common";
import localize from "../../util/Localize";

////////////////////////////////////////
// Post
const post = (title, question, images, listener) => {
    // Form
    let form = new FormData();
    form.append('title', title);
    form.append('question', question);
    if (Common.checkListSize(images)) images.map(image => form.append('images', image));
    // Post
    postMultipart(API.INQUIRE.POST, form, listener);
}

////////////////////////////////////////
// Detail
const detail = (id, listener) => {
    get(localize.formatString(API.INQUIRE.DETAIL, id), null, listener);
}

////////////////////////////////////////
export {
    post, detail,
}
