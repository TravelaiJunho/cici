////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {get} from "../_base/BaseAxios";
import API from '../_base/API';
//import type {OnServerListener} from "../_base/OnServerListener";

////////////////////////////////////////

const Index = (page, listener) => {
    get(API.INDEX, {page:page}, listener);
}

const IndexDaniel = (listener) => {
    get(API.INDEX_DANIEL, null, listener);
}

const IndexDanielList = (listener) => {
    get(API.INDEX_DANIEL_LIST, null, listener);
}

const IndexDanielDiscography = (page, listener) => {
    get(API.INDEX_DANIEL_DISCOGRAPHY, {page:page}, listener);
}

const IndexDiscoraphyDetail = (id, listener) =>{
    get(`${API.INDEX_DISCORAPHY_DETAIL}${id}`, null, listener);
}

const IndexWeAreDanity = (listener) => {
    get(`${API.INDEX_WE_ARE_DANITY}`, null, listener);
}

////////////////////////////////////////
export {
    Index,
    IndexDaniel,
    IndexDanielDiscography, IndexDiscoraphyDetail, IndexDanielList, IndexWeAreDanity
}
