////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, TouchableOpacity, View} from "react-native";
import {ListItem} from "react-native-elements";
import {connect} from "react-redux";
import Clipboard from '@react-native-clipboard/clipboard';
////////////////////
// Local
import FontStyle from "../../../util/style/Font.style";
import BaseStyle from "../../../util/style/Base.style";
import s from "../../_style/More.style";
import localize from "../../../util/Localize";
import Icon from "../../../util/Icon";
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";
import Screen from "../../../util/type/Screen";
import {getGradeType, GRADE} from "../../../util/type/User";
import {INFO_EMAIL} from "../../../util/Constants";
import Common from '@util/Common';
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BaseText from "../../../component/_base/BaseText";
import Loader from "../../../component/loader/Loader";
import BackHeader from "../../../component/header/BackHeader";
import ConfirmAlert from "../../../component/alert/_base/ConfirmAlert";
// API
import {getProfile} from "../../../data/redux/action/User";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class ServiceCenter extends BaseScreen {

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

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
    }

    ////////////////////
    // FUNCTION
    getErrorMessage = (code = 0) => {
        switch (code) {
            default:
                return localize.error.failed;
        }
    }

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
    getMenuList = _ => {
        return [
            {id: 0, name: localize.more.service_center.faq},
            {id: 1, name: localize.more.inquire.title},
            {id: 2, name: localize.more.suggest.title},
            {id: 3, name: localize.more.withdrawal.title},
        ]
    }

    selectMenu = item => {
        const {profile} = this.props;
        switch (item.id) {
            case 0: {
                this.props.navigation.navigate(Screen.STACK_MORE.FAQ);
                break;
            }
            case 1: {
                this.props.navigation.navigate(Screen.STACK_MORE.INQUIRE);
                break;
            }
            case 2: {
                switch (getGradeType(profile.group.id)) {
                    case GRADE.NORMAL:
                    case GRADE.ASSOCIATE: {
                        this.setShowConfirm(true, localize.grade.text_access)
                        return;
                    }
                }
                this.props.navigation.navigate(Screen.STACK_MORE.SUGGEST);
                break;
            }
            case 3: {
                this.props.navigation.navigate(Screen.STACK_MORE.WITHDRAWAL);
                break;
            }
        }
    }

    copyEmail = _ => {
        Clipboard.setString(INFO_EMAIL);
        this.setShowConfirm(true, localize.success.clipboard.email);
    }

    ////////////////////
    // RENDER
    renderItem = ({item, index}) =>
        <ListItem containerStyle={[s.listItemContainer, {borderTopWidth: index == 0 ? 0 : 1}]}
                  onPress={() => {
                      this.selectMenu(item)
                  }}>
            <ListItem.Content>
                <ListItem.Title style={FontStyle.CntWhiteLN}>{item.name}</ListItem.Title>
            </ListItem.Content>
            <Icon.SignRight size={Layout.UISize(14)} color={colors.white}/>
        </ListItem>

    renderMenu = _ => {
        let list = this.getMenuList();
        return (
            <FlatList contentContainerStyle={s.menuContainer}
                      data={list}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this.renderItem}
                      showsVerticalScrollIndicator={false}/>)
    }

    render() {
        const {
            isLoading, isShowConfirm, errorMessage, callback,
        } = this.state;

        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.service_center.title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {/*menu*/}
                {this.renderMenu()}

                {/* Help */}
                <View style={s.layout_help}>
                    <BaseText style={FontStyle.CntTitleWhiteCH}>{localize.more.service_center.text.need_help}</BaseText>
                    <View style={s.layout_help_mail}>
                        <Icon.MailUnRead size={16} color={colors.white}/>
                        <BaseText style={[FontStyle.CntWhiteLN, {flex: 1, marginLeft: Layout.UISize(10)}]}>{INFO_EMAIL}</BaseText>
                        <TouchableOpacity style={{marginLeft: Layout.UISize(10)}}
                                          onPress={this.copyEmail}>
                            <BaseText style={FontStyle.Btn13MintRN}>{localize.common.copy}</BaseText>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>
        );
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////
const mapStateToProps = (state) => {
    return {
        profile: state.user.get('profile'),
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeProfile: _ => {
            return dispatch(getProfile());
        },
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCenter);
