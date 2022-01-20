////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import moment from 'moment'
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import BaseStyle from "../../../util/style/Base.style";
import s from "../../_style/MembershipInfo.style"
import localize from "../../../util/Localize";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import Icon from "../../../util/Icon";
import Screen from "../../../util/type/Screen";
import {getGradeType, GRADE} from "../../../util/type/User";
import Common from '@util/Common';
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
import BaseText from "../../../component/_base/BaseText";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import CircleBorderImage from "../../../component/image/CircleBorderImage";
// API
import {getProfile} from "../../../data/redux/action/User";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class MembershipInfo extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: false});
    }

    ////////////////////
    // FUNCTION
    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                isShowConfirmCancel: false,
                callback: callback,
                errorMessage: message
            });
        }
    }

    getMemberSet = type => {
        let color = colors.grayLight;
        let groupColor = [colors.grayLight, colors.grayLight, colors.grayLight];
        let grade = localize.common.member_associate;
        switch (getGradeType(type)) {
            case GRADE.REGULAR:
                color = colors.yellow;
                groupColor = [colors.yellow, colors.yellow, colors.yellow];
                grade = localize.common.member_regular;
                break;

            case GRADE.HONORS:
                color = colors.orange;
                groupColor = [colors.mango, colors.orange, colors.pinkyPurple];
                grade = localize.common.member_honors;
                break;

            case GRADE.ARTIST:
                color = colors.purple;
                groupColor = [colors.purple, colors.purple, colors.purple];
                grade = localize.common.member_artist;
                break;

            case GRADE.OPERATOR:
                color = colors.mint;
                groupColor = [colors.mint, colors.mint, colors.mint];
                grade = localize.common.member_operator;
                break;

            case GRADE.SUPPORTERS:
                color = colors.skyblue;
                groupColor = [colors.skyblue, colors.skyblue, colors.skyblue];
                grade = localize.common.member_supporters;
                break;
        }
        return {grade: grade, color: color, groupColor: groupColor}
    }

    // Event
    onApply = _ => {
        this.props.navigation.navigate(Screen.STACK_MORE.REGULAR_MEMBER_APPLY);
    };

    ////////////////////
    // RENDER
    renderGradeButton = _ => {
        const {profile} = this.props;
        if (Common.isEmpty(profile)) return null;
        let status = profile.levelup_request_status;
        let text = '';
        if (Common.isEmpty(status) || Common.isEmpty(status.latest_request_data)) {
            text = localize.more.membershipinfo.regularmember_apply;
        } else {
            switch (status.latest_request_data.status) {
                case 'P':
                case 'R': {
                    text = localize.more.membershipinfo.application_status;
                    break;
                }
            }
        }
        return (
            <View>
                <View style={s.line}/>
                <TouchableOpacity style={s.group_apply_list}
                                  onPress={this.onApply}>
                    <BaseText style={FontStyle.CntWhiteLN}>{text}</BaseText>
                    <Icon.SignRight size={Layout.UISize(14)}
                                    color={colors.white}/>
                </TouchableOpacity>
            </View>);
    }

    renderGradeState = _ => {
        const {profile} = this.props;
        if (Common.isEmpty(profile)) return null;
        let status = profile.levelup_request_status;
        let iconColor = colors.mint;
        let fontStyle = FontStyle.Btn13MintLN;
        let text = '';
        if (Common.isEmpty(status) || Common.isEmpty(status.latest_request_data)) {
            text = localize.more.membershipinfo.regularmember_apply;
        } else {
            switch (status.latest_request_data.status) {
                case 'P': {
                    text = localize.more.membershipinfo.regularmember_applying;
                    break;
                }
                case 'R': {
                    iconColor = colors.orange;
                    fontStyle = FontStyle.Btn13OrangeLN;
                    text = localize.more.membershipinfo.regularmember_reject;
                    break;
                }
            }
        }
        return (
            <TouchableOpacity style={s.group_apply}
                              onPress={this.onApply}>
                <BaseText style={[fontStyle, {marginRight: Layout.UISize(5)}]}>{text}</BaseText>
                <Icon.SignRight size={Layout.UISize(10)}
                                color={iconColor}/>
            </TouchableOpacity>);
    }

    renderTop = _ => {
        const {profile} = this.props;
        if (Common.isEmpty(profile)) return null;
        if (Common.isEmpty(profile.group)) return null;
        const {id, update_at} = profile.group;
        let memberSet = this.getMemberSet(id)
        let date = moment(update_at);
        let gradeUp_date = date.format(localize.format.date);
        return (
            <View>
                <View style={s.top_container}>
                    <CircleBorderImage size={90}
                                       gradeSize={20}
                                       gradeRight={15}
                                       borderWidth={2}
                                       userGrade={id}
                                       source={profile.image_url}/>
                    <View style={s.topInfo}>
                        <LinearGradient style={s.group}
                                        colors={memberSet.groupColor}>
                            <View style={s.group_inner}>
                                <BaseText style={[FontStyle.Member13FullCB, {color: memberSet.color}]}>{memberSet.grade}</BaseText>
                            </View>
                        </LinearGradient>
                        <View style={{marginLeft: Layout.UISize(3)}}>
                            <BaseText style={[FontStyle.HeadlineCntWhiteCH, {marginBottom: Layout.UISize(10), textAlign: "left"}]}>
                                {this.props.profile.nickname}
                            </BaseText>
                            {getGradeType(id) === GRADE.ASSOCIATE
                                ? this.renderGradeState()
                                : <BaseText style={[FontStyle.SubCntGrayDkLB]}>{localize.more.membershipinfo.grade_up}: {gradeUp_date}</BaseText>}
                        </View>
                    </View>
                </View>
                <View style={s.line}/>
            </View>);
    }

    renderMenu = _ => {
        const {profile} = this.props;
        if (Common.isEmpty(profile)) return null;
        if (Common.isEmpty(profile.group)) return null;
        const {id} = profile.group;
        return (<View>
            <TouchableOpacity style={s.menu_container}
                              onPress={() => {
                                  this.props.navigation.navigate(Screen.STACK_MORE.MEMBERSHIP_GUID);
                              }}>
                <BaseText style={FontStyle.CntWhiteLN}>{localize.more.membershipinfo.membership_systeminfo}</BaseText>
                <Icon.SignRight size={Layout.UISize(14)}
                                color={colors.white}/>
            </TouchableOpacity>
            {getGradeType(id) === GRADE.ASSOCIATE && this.renderGradeButton()}
        </View>);
    }

    render() {
        const {isLoading, isShowConfirm, errorMessage, callback} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.rating_information}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/**/}
                {this.renderTop()}
                {/**/}
                {this.renderMenu()}
                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        profile: state.user.get('profile'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeProfile: _ => {
            return dispatch(getProfile());
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(MembershipInfo);
