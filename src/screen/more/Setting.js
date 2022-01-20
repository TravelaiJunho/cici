////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, Modal, View} from "react-native";
import {connect} from "react-redux";
import {ListItem} from "react-native-elements";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import BaseStyle from "../../util/style/Base.style";
import s from "../_style/Setting.style";
import localize from "../../util/Localize";
import Icon from "../../util/Icon";
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";
import Screen from "../../util/type/Screen";
import Info from "../../util/Info"
import {DOWNLOAD_OPTION, ENGLISH, KOREAN, TRANSLATE_ENGLISH, TRANSLATE_KOREAN} from "../../util/Constants"
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import BaseText from "../../component/_base/BaseText";
import Loader from "../../component/loader/Loader";
import BackHeader from "../../component/header/BackHeader";
import SwitchToggleButton from "../../component/button/SwitchToggleButton";
import BaseButton from "../../component/_base/BaseButton";
// API
import {changeDownloadOption, changeLanguage} from "../../data/redux/action/Common";
import {getAlarmAllow, setAlarm, setAlarmCancel} from "../../data/http/Setting";
import {SwipeablePanel} from "rn-swipeable-panel";
import TranslateLanguage from "../../component/bottom_sheet/TranslateLanguage";
import {setTargetLanguage} from "../../data/redux/action/Translate";
import {getLanguageText} from "../../data/http/Translate";
import Common from "../../util/Common";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Setting extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Alert
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            // Alarm
            notificationOnOff: false,
            // Language
            showSelectLanguage: false,
            // Translate Language
            showTranslateLanguage: false,
        }
        this.setLanguage = Info.getLanguage();

        // ref
        this.bottomLanguage = null;
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        if(this.props.navigation.dangerouslyGetParent())
            this.props.navigation.dangerouslyGetParent().setOptions({tabBarVisible: false});
        this.init();
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['isLoading', 'isShowConfirm', 'showSelectLanguage', 'notificationOnOff', 'showTranslateLanguage'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) {this.setLanguage = this.props.language; return true};
        if (Common.shouldUpdate(this.props, nextProps, ['translateLanguage', 'downloadOption'])) return true;
    }
    ////////////////////
    // FUNCTION
    init = _ => {
        this.sendAlarmAllow();
    }

    setAlarm = isOn => {
        this.setState({notificationOnOff: isOn});
    }

    getErrorMessage = (code = 0) => {
        // switch (code) {
        //     default:
        return localize.error.failed;
        // }
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
            {
                id: 0,
                type: 'toggle',
                name: localize.more.preferences.notification_settings,
            },
            {
                id: 1,
                type: 'language',
                name: localize.more.preferences.language_setting,
            },
            {
                id: 2,
                type: 'downloadStateSetting',
                name: localize.more.preferences.download_setting,
                desc: this.props.downloadOption == DOWNLOAD_OPTION.WIFI_ONLY ? localize.more.preferences.download_setting_desc : localize.more.preferences.download_setting_desc2
            },
            {
                id: 3,
                type: 'translateLanguage',
                name: localize.more.preferences.translate_setting,
            },
            {
                id: 4,
                type: 'link',
                name: localize.more.terms_policies.title,
            },
            {
                id: 5,
                type: 'link',
                name: localize.more.version_info.title,
            }
        ]
    }

    onChangeNotification = () => {
        this.state.notificationOnOff ? this.sendSetAlarmCancel() : this.sendSetAlarm();
    }

    onChangeDownloadOption = () => {
        if(this.props.downloadOption == DOWNLOAD_OPTION.WIFI_ONLY) {
            this.props.changeDownloadOption(DOWNLOAD_OPTION.ALL)
        }else{
            this.props.changeDownloadOption(DOWNLOAD_OPTION.WIFI_ONLY)
        }
    }

    onMenu = (item) => {
        switch (item.id) {
            case 0: {
                this.onChangeNotification();
                break;
            }
            case 1: {
                this.setState({showSelectLanguage: true});
                break;
            }
            case 2: {
                this.onChangeDownloadOption();
                break;
            }
            case 3: {
                this.bottomLanguage && this.bottomLanguage.open(this.props.translateLanguage);
                break;
            }
            case 4: {
                this.props.navigation.navigate(Screen.STACK_MORE.TERMS_POLICIES);
                break;
            }
            case 5: {
                this.props.navigation.navigate(Screen.STACK_MORE.VERSION_INFO);
                break;
            }
        }
    }

    onSetLanguage = (lang) => {
        if (lang) this.props.changeLanguage(lang);
        this.setLanguage = lang
        this.setState({showSelectLanguage: false});
    }

    // API
    sendAlarmAllow = _ => {
        getAlarmAllow((success, code, message, data) => {
            if (success) this.setAlarm(data.allow);
        });
    }

    sendSetAlarm = _ => {
        setAlarm((success, code, message, data) => {
            if (success) this.setAlarm(true);
        });
    }

    sendSetAlarmCancel = _ => {
        setAlarmCancel((success, code, message, data) => {
            if (success) this.setAlarm(false);
        })
    }

    ////////////////////
    // RENDER
    renderLanguage = _ => {
        //if (!this.state.showSelectLanguage) return null;
        return (
            <Modal transparent
                   visible={this.state.showSelectLanguage}
                   onRequestClose={_ => this.setState({showSelectLanguage: false})}>
                {this.state.showSelectLanguage && <View style={s.mask}/>}
                <SwipeablePanel isActive={this.state.showSelectLanguage}
                                onlySmall={true}
                                noBackgroundOpacity={true}
                                style={[s.popEditContainer, {backgroundColor: "transparent"}]}
                                noBar={true}
                                showCloseButton={false}
                                fullWidth={true}
                                scrollViewProps={{scrollEnabled: false}}
                                onClose={() => {
                                    this.onSetLanguage(null)
                                }}>
                    <View style={s.popEditBtnTitle}/>
                    <View style={s.popEditBtnContainer}>
                        <View style={s.popEditBtnTitle}>
                            <BaseText
                                style={[FontStyle.Cnt13GrayCB]}>{localize.more.preferences.select_language}</BaseText>
                        </View>
                        <View style={s.line}/>
                        <BaseButton titleStyle={FontStyle.CntWhiteCN}
                                    buttonStyle={s.popEditBtn}
                                    title={KOREAN}
                                    onPress={_ => this.onSetLanguage(TRANSLATE_KOREAN)}/>
                        <View style={s.line}/>
                        <BaseButton titleStyle={FontStyle.CntWhiteCN}
                                    buttonStyle={s.popEditBtn}
                                    title={ENGLISH}
                                    onPress={_ => this.onSetLanguage(TRANSLATE_ENGLISH)}/>
                    </View>
                    <View style={s.popEditBtn}>
                        <BaseButton titleStyle={FontStyle.BtnGrayCB}
                                    buttonStyle={s.popEditBtn}
                                    title={localize.common.cancel}
                                    onPress={_ => this.setState({showSelectLanguage: false})}/>
                    </View>
                </SwipeablePanel>
            </Modal>)
    }

    renderLeftContent = (item) => {
        switch (item.type) {
            case 'link': {
                return <Icon.SignRight size={Layout.UISize(14)} color={colors.white}/>;
            }
            case 'language': {
                let language = this.setLanguage === TRANSLATE_KOREAN ? KOREAN : ENGLISH
                return <BaseText style={FontStyle.BtnOrangeCH}>{language}</BaseText>;
            }
            case 'downloadStateSetting': {
                return <SwitchToggleButton
                    duration={100}
                    containerStyle={{
                        width: 38,
                        height: 22,
                        borderRadius: 20,
                        backgroundColor: colors.orange,
                        padding: 3
                    }}
                    circleStyle={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        backgroundColor: colors.orange
                    }}
                    onPress={this.onChangeDownloadOption}
                    backgroundColorOn={colors.orange}
                    backgroundColorOff={colors.gray}
                    switchOn={this.props.downloadOption == DOWNLOAD_OPTION.WIFI_ONLY ? true : false}
                    circleColorOff={colors.white}
                    circleColorOn={colors.white}/>
            }
            case 'translateLanguage': {
                let language = getLanguageText(this.props.translateLanguage)
                return <BaseText style={FontStyle.BtnOrangeCH}>{language}</BaseText>;
            }
            case 'toggle': {
                return <SwitchToggleButton
                    duration={100}
                    containerStyle={{
                        width: 38,
                        height: 22,
                        borderRadius: 20,
                        backgroundColor: colors.orange,
                        padding: 3
                    }}
                    circleStyle={{
                        width: 18,
                        height: 18,
                        borderRadius: 9,
                        backgroundColor: colors.orange
                    }}
                    onPress={this.onChangeNotification}
                    backgroundColorOn={colors.orange}
                    backgroundColorOff={colors.gray}
                    switchOn={this.state.notificationOnOff}
                    circleColorOff={colors.white}
                    circleColorOn={colors.white}/>
            }
        }
    }

    renderItem = ({item, index}) => {
        if( item.type == 'downloadStateSetting' ) {
            return (
                <View>
                    <ListItem containerStyle={[s.listItemContainer, {alignItems:'flex-start', borderTopWidth: index == 0 ? 0 : 1}]}
                              onPress={() => {
                                  this.onMenu(item)
                              }}>
                        <ListItem.Content>
                            <ListItem.Title style={FontStyle.CntWhiteLN}>{item.name}</ListItem.Title>
                            <BaseText
                                numberOfLines={2}
                                style={[
                                    FontStyle.CntOffGrayLight,
                                    {
                                        marginTop: Layout.UISize(5),
                                        width:Layout.UISize(253)
                                    }
                                ]}>{item.desc}</BaseText>
                        </ListItem.Content>
                        {this.renderLeftContent(item)}
                    </ListItem>
                </View>
            )
        }
        return (
            <ListItem containerStyle={[s.listItemContainer, {borderTopWidth: index == 0 ? 0 : 1}]}
                      onPress={() => {
                          this.onMenu(item)
                      }}>
                <ListItem.Content>
                    <ListItem.Title style={FontStyle.CntWhiteLN}>{item.name}</ListItem.Title>
                </ListItem.Content>
                {this.renderLeftContent(item)}
            </ListItem>
        )
    }


    renderMenu = _ => {
        let list = this.getMenuList();
        return <FlatList showsVerticalScrollIndicator={false}
                         contentContainerStyle={s.menuContainer}
                         keyExtractor={(item, index) => index.toString()}
                         data={list}
                         renderItem={this.renderItem}/>
    }

    render() {
        const {isLoading, isShowConfirm, errorMessage, callback} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.preferences.title}
                            onBackPress={_ => this.props.navigation.pop()}/>
                {this.renderMenu()}
                {this.renderLanguage()}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
                {/* Translate Language */}
                <TranslateLanguage
                    ref={ref => this.bottomLanguage = ref}
                    onApplyCode = {(code)=>{
                        this.props.setTranslateLanguageCode(code);
                    }}
                />
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        language: state.common.get('language'),
        translateLanguage: state.translate.get('target'),
        downloadOption: state.common.get('downloadOption'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDownloadOption: option => {
            return dispatch(changeDownloadOption(option));
        },
        changeLanguage: lang => {
            return dispatch(changeLanguage(lang));
        },
        setTranslateLanguageCode: code => {
            return dispatch(setTargetLanguage(code))
        }
    };
};


////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
