////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import {connect} from "react-redux";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from '../../util/style/Font.style';
import s from './_style/TabBottomBar.style';
import {colors} from '../../util/Color';
import Icon from '../../util/Icon';
import Screen from '../../util/type/Screen';
import {getGradeType, GRADE} from "../../util/type/User";
import localize from "../../util/Localize";
import Common from '../../util/Common';
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import ConfirmCancelAlert from "../alert/_base/ConfirmCancelAlert";
import {changeBottomBadge} from "../../data/redux/action/Badge";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabBottomBar extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowConfirmCancel: false,
            message: '',
            cancelCallback: null,
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.props.updateBottomBadge();
    }

    ////////////////////
    // FUNCTION
    setShowConfirmCancel = (isShow, message = '', cancelCallback = null) => {
        if (this.state.isShowConfirmCancel !== isShow) {
            this.setState({
                isShowConfirmCancel: isShow,
                message: message,
                cancelCallback: cancelCallback
            });
        }
    };

    getIcon = (name, isFocused) => {
        switch (name) {
            case Screen.TAB_BOTTOM.HOME:
                return isFocused
                    ? <Icon.HomeOn size={20} color={colors.white}/>
                    : <Icon.HomeOff size={20} color={colors.white}/>;
            case Screen.TAB_BOTTOM.COMMUNITY:
                return isFocused
                    ? <Icon.CommunityOn size={20} color={colors.white}/>
                    : <Icon.CommunityOff size={20} color={colors.white}/>;
            case Screen.TAB_BOTTOM.NOTICE:
                return isFocused
                    ? <Icon.NoticeOn size={20} color={colors.white}/>
                    : <Icon.NoticeOff size={20} color={colors.white}/>;
            case Screen.TAB_BOTTOM.MEMBERSHIP:
                return isFocused
                    ? <Icon.MemberShipOn size={20} color={colors.white}/>
                    : <Icon.MemberShipOff size={20} color={colors.white}/>;
            case Screen.TAB_BOTTOM.MORE:
                return isFocused
                    ? <Icon.MoreOn size={20} color={colors.white}/>
                    : <Icon.MoreOff size={20} color={colors.white}/>;
            default:
                return null;
        }
    }

    getLabel = (route, options) => {
        if (Common.isEmpty(options.tabBarLabel)) {
            if (Common.isEmpty(options.title)) {
                // return route.name
                return getFocusedRouteNameFromRoute(route)
            } else {
                return options.title
            }
        } else {
            return options.tabBarLabel
        }
    }

    checkGradeUnderAssociate = group => {
        if (Common.isEmpty(group)) return false;
        switch (getGradeType(group.id)) {
            case GRADE.NORMAL:
            case GRADE.ASSOCIATE:
                return false;
            default:
                return true;
        }
    }

    checkGradeUnderRegular = group => {
        if (Common.isEmpty(group)) return false;
        switch (getGradeType(group.id)) {
            case GRADE.NORMAL:
            case GRADE.ASSOCIATE:
            case GRADE.REGULAR:
                return false;
            default:
                return true;
        }
    }

    // Badge
    getBadgeState = (name) => {
        switch (name) {
            case Screen.TAB_BOTTOM.HOME:
                return this.props.badgeHome;
            case Screen.TAB_BOTTOM.COMMUNITY:
                return this.props.badgeCommunity;
            case Screen.TAB_BOTTOM.NOTICE:
                return this.props.badgeNotice;
            case Screen.TAB_BOTTOM.MEMBERSHIP:
                return this.props.badgeMemberShip;
            case Screen.TAB_BOTTOM.MORE:
                return this.props.badgeMore;
            default:
                return false;
        }
    }

    // Event
    onPress = (route, navigation, isFocused) => {
        let press = false;
        const {profile} = this.props;
        if (!Common.isEmpty(profile)) {
            switch (route.name) {
                case Screen.TAB_BOTTOM.HOME:
                case Screen.TAB_BOTTOM.NOTICE:
                case Screen.TAB_BOTTOM.MORE:
                    press = true
                    break;

                case Screen.TAB_BOTTOM.COMMUNITY:
                    press = this.checkGradeUnderAssociate(profile.group);
                    if (!press) {
                        this.setShowConfirmCancel(true, localize.grade.text_access, _ => {
                            ////////////////////
                            // Navigation Issue
                            // this.props.navigation.navigate(Screen.TAB_BOTTOM.MORE, {screen: Screen.STACK_MORE.MEMBERSHIP_GUID});
                            this.props.navigation.navigate(Screen.TAB_BOTTOM.MORE)
                            setTimeout(_ => this.props.navigation.navigate(Screen.STACK_MORE.MEMBERSHIP_GUID), 100);
                        });
                    }
                    break;

                case Screen.TAB_BOTTOM.MEMBERSHIP:
                    press = this.checkGradeUnderRegular(profile.group);
                    if (!press) {
                        this.setShowConfirmCancel(true, localize.grade.text_honors_access, _ => {
                            ////////////////////
                            // Navigation Issue
                            // this.props.navigation.navigate(Screen.TAB_BOTTOM.MORE, {screen: Screen.STACK_MORE.MEMBERSHIP_GUID});
                            this.props.navigation.navigate(Screen.TAB_BOTTOM.MORE)
                            setTimeout(_ => this.props.navigation.navigate(Screen.STACK_MORE.MEMBERSHIP_GUID), 100);
                        });
                    }
                    break;
            }
        }
        if (press) {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        }
        this.props.updateBottomBadge();
    }

    onLongPress = (route, navigation) => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    }

    ////////////////////
    // RENDER
    renderTab = (route, navigation, options, isFocused) => {
        return (
            <TouchableOpacity style={s.tab_layout}
                              key={route.key}
                              onPress={_ => this.onPress(route, navigation, isFocused)}
                              //onLongPress={_ => this.onLongPress(route, navigation)}
                              testID={options.tabBarTestID}
                              accessibilityRole={"button"}
                              accessibilityState={isFocused ? {selected: true} : {}}
                              accessibilityLabel={options.tabBarAccessibilityLabel}>
                <View style={s.tab_contents_layout}>
                    {/* Icon */}
                    {this.getIcon(route.name, isFocused)}
                    {/* Title */}
                    <BaseText style={[s.tab_text_title, isFocused ? FontStyle.TabOnWhiteCB : FontStyle.TabOffWhiteCT]}>
                        {this.getLabel(route, options)}
                    </BaseText>
                </View>

                {/* Badge */}
                {this.getBadgeState(route.name) &&
                <View style={s.badge_contents_layout}>
                    <View style={s.badge_top_area}>
                        <View style={BaseStyle.badge_text}>
                            <BaseText style={FontStyle.CaptionWhiteCH}>N</BaseText>
                        </View>
                    </View>
                </View>}
            </TouchableOpacity>)
    }

    render() {
        const {state, descriptors, navigation} = this.props;
        const focusedOptions = descriptors[state.routes[state.index].key].options;
        if (focusedOptions.tabBarVisible === false) return null;
        const {isShowConfirmCancel, message, cancelCallback} = this.state;
        return (
            <View style={s.container}>
                {/* Divider */}
                <View style={s.divider_horizontal}/>
                {/* Tabs */}
                <View style={s.tab_container}>
                    {state.routes.map((route, index) =>
                        this.renderTab(
                            route,
                            navigation,
                            descriptors[route.key].options,
                            state.index === index)
                    )}
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                <ConfirmCancelAlert isVisible={isShowConfirmCancel}
                                    buttonConfirm={localize.common.ok}
                                    onConfirm={_ => this.setShowConfirmCancel(false)}
                                    buttonCancel={localize.common.detail}
                                    onCancel={_ => {
                                        cancelCallback && cancelCallback();
                                        this.setShowConfirmCancel(false)
                                    }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{message}</BaseText>
                </ConfirmCancelAlert>
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        badgeHome: state.badge.get('tab_bottom_home'),
        badgeCommunity: state.badge.get('tab_bottom_community'),
        badgeNotice: state.badge.get('tab_bottom_notice'),
        badgeMemberShip: state.badge.get('tab_bottom_membership'),
        badgeMore: state.badge.get('tab_bottom_more'),
        // Profile
        profile: state.user.get('profile'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateBottomBadge: _ => {
            return dispatch(changeBottomBadge());
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabBottomBar);
