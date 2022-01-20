////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";

////////////////////////////////////////

const content = (content_type, listener) => {
    // level_info
    // terms
    // privacy
    get(`${API.CONTENT}${content_type}/`, null, listener);
}

const contentLevelInfo = (listener) => {
    content('level_info', listener)
}

const contentTerms = (listener) => {
    content('terms', listener)
}

const contentPrivacy = (listener) => {
    content('privacy', listener)
}

const contentFaq = (ordering, category, lastId = '', page = 1, listener) => {
    get(API.CONTENT_FAQ, {
        category: category,
        // page: page,
        lastId: lastId,
    }, listener);
}

const contentFaqCategories = (listener) => {
    get(API.CONTENT_FAQ_CATEGORIES, null, listener)
}
////////////////////////////////////////
export {
    contentLevelInfo, contentTerms, contentPrivacy,
    contentFaq, contentFaqCategories,
}
