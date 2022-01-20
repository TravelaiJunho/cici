////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";

////////////////////////
// Reducer
////////////////////////
import Common from './reducer/Common';
import Badge from './reducer/Badge';
import New from './reducer/New';
// User
import User from './reducer/User';
// Home
import Home from "./reducer/Home";
// Community
import Community from './reducer/Community';
import TabTalkTalk from './reducer/TabTalkTalk';
import TabFromDaniel from './reducer/TabFromDaniel';
import TabToDaniel from './reducer/TabToDaniel';
// Notice
import TabNoticeForNotice from './reducer/TabNoticeForNotice';
import TabMediaForNotice from './reducer/TabMediaForNotice';
import TabEventForNotice from "./reducer/TabEventForNotice";
// MemberShip
import MemberShip from './reducer/MemberShip';
import TabNoticeForMemberShip from './reducer/TabNoticeForMemberShip';
import TabMediaForMemberShip from './reducer/TabMediaForMemberShip';
import TabTalk from './reducer/TabTalk';
import TabEventForMemberShip from "./reducer/TabEventForMemberShip";
// Service
import Inquire from "./reducer/Inquire";
import Suggest from "./reducer/Suggest";
// My Post
import MyPost from "./reducer/MyPost";
// Translate
import Translate from "./reducer/Translate";
//GOODS
import {GoodsList} from "./reducer/Goods"
// Wifi State
import WifiState from "./reducer/WifiState"
////////////////////////////////////////
// FUNCTION
////////////////////////////////////////

const rootReducer = combineReducers({
    common: Common,
    badge: Badge,
    new: New,
    user: User,
    // Home
    home: Home,
    // Community
    community: Community,
    tab_talk_talk: TabTalkTalk,
    tab_from_daniel: TabFromDaniel,
    tab_to_daniel: TabToDaniel,
    // Notice
    tab_notice_for_notice: TabNoticeForNotice,
    tab_media_for_notice: TabMediaForNotice,
    tab_event_for_notice: TabEventForNotice,
    // MemberShip
    membership: MemberShip,
    tab_notice_for_membership: TabNoticeForMemberShip,
    tab_media_for_membership: TabMediaForMemberShip,
    tab_talk: TabTalk,
    tab_event_for_membership: TabEventForMemberShip,
    // Service
    inquire: Inquire,
    suggest: Suggest,
    // My Post
    my_post: MyPost,
    // Translate
    translate: Translate,
    // Goods
    goods: GoodsList,
    //WifiState
    wifi: WifiState,
});

////////////////////////////////////////
export default createStore(rootReducer, applyMiddleware(thunk));
