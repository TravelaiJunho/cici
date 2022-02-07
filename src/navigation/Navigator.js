////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
////////////////////
// Local
import { navRef } from "./RootNavigation";
import { colors } from "../util/Color";
import Screen from "../util/type/Screen";
import Common from "../util/Common";
// Component
import TabBottomBar from "../component/tab/TabBottomBar";
import TabCommunityBar from "../component/tab/TabCommunityBar";
import TabNoticeBar from "../component/tab/TabNoticeBar";
import TabMemberShipBar from "../component/tab/TabMemberShipBar";

////////////////////
// Screen
////////////////////
// Auth
import Login from "../screen/auth/Login";
import Join from "../screen/auth/Join";
import Authentication from "../screen/auth/Authentication";
import ResetPassword from "../screen/auth/ResetPassword";
import ChangePassword from "../screen/auth/ChangePassword";
////////////
// Activity
import Comment from "../screen/activity/Comment";
import AlarmList from "../screen/activity/AlarmList";
// Post
import Post from "../screen/activity/post/Post";
import PostEvent from "../screen/activity/post/PostEvent";
import PostInquire from "../screen/activity/post/PostInquire";
import PostSuggest from "../screen/activity/post/PostSuggest";
// Detail
import PostDetail2 from "../screen/activity/detail/PostDetail2";
import NoticeDetail from "../screen/activity/detail/NoticeDetail";
import InquireDetail from "../screen/activity/detail/InquireDetail";
import SuggestDetail from "../screen/activity/detail/SuggestDetail";
import BannerDetail from "../screen/activity/detail/BannerDetail";
import EventDetail from "../screen/activity/detail/EventDetail";
// Media
import MediaImage from "../screen/activity/media/MediaImage";
import MediaWallpaper from "../screen/activity/media/MediaWallpaper";
import MediaVideo from "../screen/activity/media/MediaVideo";
import MediaYoutube from "../screen/activity/media/MediaYoutube";
import MediaAudio from "../screen/activity/media/MediaAudio";
////////////
// Home
//import Home from "../screen/home/Home";
import KangDaniel from "../screen/home/KangDaniel";
import KangDanielMedia from "../screen/home/KangDanielMedia";
// HOME CICI
import Home from "../screen_cici/home/Home";

////////////
// Community
import Community from "../screen/community/Community";
import TabTalkTalk from "../screen/community/TabTalkTalk";
import TabFromDaniel from "../screen/community/TabFromDaniel";
import TabToDaniel from "../screen/community/TabToDaniel";
////////////
// Notice
import Notice from "../screen/notice/Notice";
import TabNoticeForNotice from "../screen/notice/TabNotice";
import TabSchedule from "../screen/notice/TabSchedule";
import TabEventForNotice from "../screen/notice/TabEvent";
import TabMediaForNotice from "../screen/notice/TabMedia";
import TabGoodsForNotice from "../screen/notice/TabGoods";
////////////
// MemberShip
import MemberShip from "../screen/membership/MemberShip";
import TabNoticeForMemberShip from "../screen/membership/TabNotice";
import TabMediaForMemberShip from "../screen/membership/TabMedia";
import TabTalk from "../screen/membership/TabTalk";
import TabEventForMemberShip from "../screen/membership/TabEvent";
////////////
// More
import More from "../screen/more/More";
import MyPost from "../screen/more/MyPost";
import Profile from "../screen/more/Profile";
// Member
import MembershipGuide from "../screen/more/member/MembershipGuide";
import MembershipInfo from "../screen/more/member/MembershipInfo";
import RegularMemberApply from "../screen/more/member/RegularMemberApply";
// Service
import ServiceCenter from "../screen/more/service/ServiceCenter";
import Faq from "../screen/more/service/Faq";
import Inquire from "../screen/more/service/Inquire";
import InquireList from "../screen/more/service/InquireList";
import Suggest from "../screen/more/service/Suggest";
import SuggestList from "../screen/more/service/SuggestList";
// Setting
import Setting from "../screen/more/Setting";
import TermsPolicies from "../screen/more/TermsPolicies";
import VersionInfo from "../screen/more/VersionInfo";
// Test
import TestPageScreen from "../screen/tester/TestPageScreen";
import MediaViewer from "../screen/activity/Viewer/MediaViewer";
import ImageViewer from "../screen/activity/Viewer/ImageViewer";
import Withdrawal from "../screen/more/service/withdrawal";
import GoodsDetail from "../screen/activity/detail/GoodsDetail";
import PostVote from "../screen/activity/post/PostVote";
import PostPublicBroadCasting from "../screen/activity/post/PostPublicBroadCasting";

////////////////////////////////////////
// FUNCTION
////////////////////////////////////////

// const setTabBarVisible = (navigation, route) => {
//     // ["",""].includes(getFocusedRouteNameFromRoute(route))
//     if (!Common.isEmpty(route.state)) {
//         if (route.state.index > 0) {
//             navigation.setOptions({tabBarVisible: false})
//         } else {
//             navigation.setOptions({tabBarVisible: true})
//         }
//     }
// }

const createScreen = (
  navigator,
  component,
  name,
  title = null,
  gestureEnabled = true,
  headerShown = false
) => (
  <navigator.Screen
    name={name}
    component={component}
    options={{
      tabBarLabel: title,
      headerShown: headerShown,
      gestureEnabled: gestureEnabled,
    }}
  />
);

const createTabScreen = (
  navigator,
  component,
  name,
  title = null,
  onScroll = null,
  onTabFocus = null
) => (
  <navigator.Screen
    name={name}
    component={component}
    options={{ tabBarLabel: title }}
    initialParams={{
      onScroll: onScroll,
      onTabFocus: onTabFocus,
    }}
  />
);

////////////////////////////////////////
// STACK NAVIGATOR
////////////////////////////////////////

const AuthStack = (_) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator initialRouteName={Screen.STACK_LOGIN.LOGIN}>
      {createScreen(Navigator, Login, Screen.STACK_LOGIN.LOGIN)}
      {createScreen(Navigator, Join, Screen.STACK_LOGIN.JOIN)}
      {createScreen(
        Navigator,
        Authentication,
        Screen.STACK_LOGIN.AUTHENTICATION
      )}
      {createScreen(
        Navigator,
        ResetPassword,
        Screen.STACK_LOGIN.RESET_PASSWORD
      )}
      {createScreen(
        Navigator,
        ChangePassword,
        Screen.STACK_LOGIN.CHANGE_PASSWORD
      )}
    </Navigator.Navigator>
  );
};

const HomeStack = (_) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator initialRouteName={Screen.STACK_HOME.HOME}>
      {createScreen(Navigator, Home, Screen.STACK_HOME.HOME)}
      {createScreen(Navigator, KangDaniel, Screen.STACK_HOME.KANGDANIEL)}
      {createScreen(
        Navigator,
        KangDanielMedia,
        Screen.STACK_HOME.KANGDANIEL_MEDIA
      )}
      {createScreen(Navigator, MyPage, screen.STACK_HOME.MYPAGE)}
    </Navigator.Navigator>
  );
};

const MoreStack = (_) => {
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator initialRouteName={Screen.STACK_MORE.MORE}>
      {createScreen(Navigator, More, Screen.STACK_MORE.MORE)}
      {createScreen(Navigator, MyPost, Screen.STACK_MORE.MY_POST)}
      {createScreen(Navigator, Profile, Screen.STACK_MORE.PROFILE)}
      {/* Password */}
      {createScreen(Navigator, ResetPassword, Screen.STACK_MORE.RESET_PASSWORD)}
      {createScreen(
        Navigator,
        ChangePassword,
        Screen.STACK_MORE.CHANGE_PASSWORD
      )}
      {/* Member */}
      {createScreen(
        Navigator,
        MembershipGuide,
        Screen.STACK_MORE.MEMBERSHIP_GUID
      )}
      {createScreen(
        Navigator,
        MembershipInfo,
        Screen.STACK_MORE.MEMBERSHIP_INFO
      )}
      {createScreen(
        Navigator,
        RegularMemberApply,
        Screen.STACK_MORE.REGULAR_MEMBER_APPLY
      )}
      {/* Service */}
      {createScreen(Navigator, ServiceCenter, Screen.STACK_MORE.SERVICE_CENTER)}
      {createScreen(Navigator, Faq, Screen.STACK_MORE.FAQ)}
      {createScreen(Navigator, Inquire, Screen.STACK_MORE.INQUIRE)}
      {createScreen(Navigator, InquireList, Screen.STACK_MORE.INQUIRE_LIST)}
      {createScreen(Navigator, Suggest, Screen.STACK_MORE.SUGGEST)}
      {createScreen(Navigator, SuggestList, Screen.STACK_MORE.SUGGEST_LIST)}
      {createScreen(Navigator, Withdrawal, Screen.STACK_MORE.WITHDRAWAL)}
      {/* Setting */}
      {createScreen(Navigator, Setting, Screen.STACK_MORE.SETTING)}
      {createScreen(Navigator, VersionInfo, Screen.STACK_MORE.VERSION_INFO)}
    </Navigator.Navigator>
  );
};

// const Setting = createStackNavigator();
// const SettingStack = ({navigation, route}) => {
//     setTabBarVisible(navigation, route);
//     return (
//         <Setting.Navigator>
//             {createScreen(Setting, Setting, "Setting")}
//         </Setting.Navigator>
//     );
// }

////////////////////////////////////////
// TAB NAVIGATOR
////////////////////////////////////////

export const CommunityTabNavigator = ({
  onScroll = null,
  onTabFocus = null,
}) => {
  const Navigator = createMaterialTopTabNavigator();
  return (
    <Navigator.Navigator
      backBehavior={"none"}
      swipeEnabled={Common.checkIOS()}
      tabBar={(props) => <TabCommunityBar {...props} isFix={true} />}
    >
      {createTabScreen(
        Navigator,
        TabTalkTalk,
        Screen.STACK_COMMUNITY.TAB_TALK_TALK,
        "Talk Talk",
        onScroll,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabFromDaniel,
        Screen.STACK_COMMUNITY.TAB_FROM_DANIEL,
        "From Daniel",
        onScroll,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabToDaniel,
        Screen.STACK_COMMUNITY.TAB_TO_DANIEL,
        "To Daniel",
        onScroll,
        onTabFocus
      )}
    </Navigator.Navigator>
  );
};

export const NoticeTabNavigator = ({ onTabFocus = null, useHeader = true }) => {
  const Navigator = createMaterialTopTabNavigator();
  return (
    <Navigator.Navigator
      backBehavior={"history"}
      pressOpacity={1}
      swipeEnabled={Common.checkIOS()}
      tabBar={(props) => (
        <TabNoticeBar {...props} isFix={false} useHeader={useHeader} />
      )}
    >
      {createTabScreen(
        Navigator,
        TabNoticeForNotice,
        Screen.STACK_NOTICE.TAB_NOTICE,
        "Notice",
        null,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabSchedule,
        Screen.STACK_NOTICE.TAB_SCHEDULE,
        "Schedule",
        null,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabEventForNotice,
        Screen.STACK_NOTICE.TAB_EVENT,
        "Event",
        null,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabMediaForNotice,
        Screen.STACK_NOTICE.TAB_MEDIA,
        "Media",
        null,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabGoodsForNotice,
        Screen.STACK_NOTICE.TAB_GOODS,
        "Goods",
        null,
        onTabFocus
      )}
    </Navigator.Navigator>
  );
};

export const MemberShipTabNavigator = ({
  onScroll = null,
  onTabFocus = null,
  useHeader = true,
}) => {
  const Navigator = createMaterialTopTabNavigator();
  return (
    <Navigator.Navigator
      backBehavior={"none"}
      swipeEnabled={Common.checkIOS()}
      tabBar={(props) => (
        <TabMemberShipBar {...props} isFix={true} useHeader={useHeader} />
      )}
    >
      {createTabScreen(
        Navigator,
        TabNoticeForMemberShip,
        Screen.STACK_MEMBERSHIP.TAB_NOTICE,
        "Notice",
        null,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabMediaForMemberShip,
        Screen.STACK_MEMBERSHIP.TAB_MEDIA,
        "Media",
        null,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabTalk,
        Screen.STACK_MEMBERSHIP.TAB_TALK,
        "Talk",
        null,
        onTabFocus
      )}
      {createTabScreen(
        Navigator,
        TabEventForMemberShip,
        Screen.STACK_MEMBERSHIP.TAB_EVENT,
        "Event",
        null,
        onTabFocus
      )}
    </Navigator.Navigator>
  );
};

const BottomTabNavigator = (_) => {
  const Navigator = createBottomTabNavigator();
  return (
    <Navigator.Navigator
      backBehavior={"none"}
      tabBar={(props) => <TabBottomBar {...props} />}
    >
      {createScreen(Navigator, HomeStack, Screen.TAB_BOTTOM.HOME, "Home")}
      {createScreen(
        Navigator,
        Community,
        Screen.TAB_BOTTOM.COMMUNITY,
        "Community"
      )}
      {createScreen(Navigator, Notice, Screen.TAB_BOTTOM.NOTICE, "Notice")}
      {createScreen(
        Navigator,
        MemberShip,
        Screen.TAB_BOTTOM.MEMBERSHIP,
        "Membership"
      )}
      {createScreen(Navigator, MoreStack, Screen.TAB_BOTTOM.MORE, "More+")}
    </Navigator.Navigator>
  );
};

////////////////////////////////////////
// NAVIGATOR
////////////////////////////////////////

export const Navigator = ({ isLogin }) => {
  const Navigator = createStackNavigator();
  return (
    <NavigationContainer
      ref={navRef}
      theme={{
        dark: false,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          card: colors.background,
          border: colors.grayDark,
        },
      }}
    >
      <Navigator.Navigator>
        {/* {isLogin
                    ? createScreen(Navigator, AuthStack, Screen.SCREEN.LOGIN)
                    : createScreen(Navigator, BottomTabNavigator, Screen.SCREEN.HOME)} */}
        {createScreen(Navigator, BottomTabNavigator, Screen.SCREEN.HOME)}
        {/* Post */}
        {createScreen(Navigator, Post, Screen.SCREEN_ACTIVITY.POST)}
        {/*{createScreen(Navigator, PostDetail, Screen.SCREEN_ACTIVITY.POST_DETAIL)}*/}
        {createScreen(
          Navigator,
          PostDetail2,
          Screen.SCREEN_ACTIVITY.POST_DETAIL2
        )}
        {/* Comment */}
        {createScreen(Navigator, Comment, Screen.SCREEN_ACTIVITY.COMMENT)}
        {/* Notice */}
        {createScreen(
          Navigator,
          NoticeDetail,
          Screen.SCREEN_ACTIVITY.NOTICE_DETAIL
        )}
        {/* Media  */}
        {createScreen(
          Navigator,
          MediaImage,
          Screen.SCREEN_ACTIVITY.MEDIA_IMAGE,
          null,
          false
        )}
        {createScreen(
          Navigator,
          MediaWallpaper,
          Screen.SCREEN_ACTIVITY.MEDIA_WALLPAPER,
          null,
          false
        )}
        {createScreen(
          Navigator,
          MediaVideo,
          Screen.SCREEN_ACTIVITY.MEDIA_VIDEO,
          null,
          false
        )}
        {createScreen(
          Navigator,
          MediaYoutube,
          Screen.SCREEN_ACTIVITY.MEDIA_YOUTUBE,
          null,
          false
        )}
        {createScreen(
          Navigator,
          MediaAudio,
          Screen.SCREEN_ACTIVITY.MEDIA_AUDIO,
          null,
          false
        )}
        {/* Alarm List */}
        {createScreen(Navigator, AlarmList, Screen.SCREEN_ACTIVITY.ALARM_LIST)}
        {/* Member */}
        {createScreen(
          Navigator,
          RegularMemberApply,
          Screen.STACK_MORE.REQUEST_MEMBER
        )}
        {/* Terms */}
        {createScreen(
          Navigator,
          TermsPolicies,
          Screen.STACK_MORE.TERMS_POLICIES
        )}
        {/* Service */}
        {createScreen(
          Navigator,
          PostInquire,
          Screen.SCREEN_ACTIVITY.POST_INQUIRE
        )}
        {createScreen(
          Navigator,
          PostSuggest,
          Screen.SCREEN_ACTIVITY.POST_SUGGEST
        )}
        {createScreen(
          Navigator,
          InquireDetail,
          Screen.SCREEN_ACTIVITY.INQUIRE_DETAIL
        )}
        {createScreen(
          Navigator,
          SuggestDetail,
          Screen.SCREEN_ACTIVITY.SUGGEST_DETAIL
        )}
        {/* Banner */}
        {createScreen(
          Navigator,
          BannerDetail,
          Screen.SCREEN_ACTIVITY.BANNER_DETAIL
        )}
        {/* Event */}
        {createScreen(
          Navigator,
          EventDetail,
          Screen.SCREEN_ACTIVITY.EVENT_DETAIL
        )}
        {createScreen(Navigator, PostEvent, Screen.SCREEN_ACTIVITY.POST_EVENT)}
        {/* Setting */}
        {createScreen(Navigator, Setting, Screen.SCREEN_ACTIVITY.SETTING)}
        {/* Viewer*/}
        {createScreen(
          Navigator,
          MediaViewer,
          Screen.SCREEN_ACTIVITY.MEDIA_VIEWER
        )}
        {createScreen(
          Navigator,
          ImageViewer,
          Screen.SCREEN_ACTIVITY.IMAGE_VIEWER
        )}
        {/* Goods */}
        {createScreen(
          Navigator,
          GoodsDetail,
          Screen.SCREEN_ACTIVITY.GOODS_DETAIL
        )}
        {/* Vote */}
        {createScreen(Navigator, PostVote, Screen.SCREEN_ACTIVITY.POST_VOTE)}
        {/* Public BroadCasting */}
        {createScreen(
          Navigator,
          PostPublicBroadCasting,
          Screen.SCREEN_ACTIVITY.POST_PUBLIC_BROADCAST
        )}
        {/* Dev */}
        {createScreen(
          Navigator,
          TestPageScreen,
          Screen.SCREEN_ACTIVITY.TEST_PAGE
        )}
        {createScreen(
          Navigator,
          AuthStack,
          Screen.SCREEN.LOGIN_RE,
          null,
          false
        )}
      </Navigator.Navigator>
    </NavigationContainer>
  );
};

////////////////////////////////////////
