////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, TouchableOpacity, View} from "react-native";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import BaseStyle from "../../util/style/Base.style";
import s from "./../_style/KangDaniel.style"
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";
import localize from "../../util/Localize";
import Screen from "../../util/type/Screen";
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import BaseText from "../../component/_base/BaseText";
import Loader from "../../component/loader/Loader";
import BackHeader from "../../component/header/BackHeader";
import BaseImage from "../../component/_base/BaseImage";
// API
import {IndexDaniel} from "../../data/http/Index";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class KangDaniel extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            //
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            //
            menuList: null,
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
        IndexDaniel((success, code, message, data) => {
            // console.warn(success, code, message, data)
            if (success) {
                let list = [data.daniel, data.discography, data.we_are_danity];
                this.setState({menuList: list});
            }
        })
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
                confirmCallback: callback,
                errorMessage: message
            });
        }
    }

    ////////////////////
    // RENDER
    renderMenu = ({item, index}) => {
        let type = 'daniel'
        switch (index) {
            case 0: {
                type = 'daniel';
                break;
            }
            case 1: {
                type = 'discography';
                break;
            }
            case 2: {
                type = 'we_are_danity';
                break;
            }
        }

        return (
            <TouchableOpacity activeOpacity={1}
                              style={s.menu_container}
                              onPress={() => {
                                  this.setState({isLoading: true})
                                  item.is_new = false;
                                  this.props.navigation.navigate(Screen.STACK_HOME.KANGDANIEL_MEDIA, {type: type});
                                  this.setState({isLoading: false})
                              }}>
                <BaseImage source={{uri: item.image_url}}
                           style={{
                               width: '100%',
                               height: '100%'
                           }}/>
                { item.is_new &&
                <View style={{
                    position: 'absolute',
                    top: Layout.UISize(10),
                    right: Layout.UISize(10),
                    width: Layout.UISize(34),
                    height: Layout.UISize(16),
                    borderRadius: Layout.UISize(4),
                    backgroundColor: colors.orange,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <BaseText style={FontStyle.CaptionWhiteCH}>NEW</BaseText>
                </View>}
            </TouchableOpacity>
        )
    }

    render() {
        const {isLoading, isShowConfirm, errorMessage, callback, menuList} = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.kangdaniel.title}
                            onBackPress={_ => this.props.navigation.pop()}/>

                <FlatList showsVerticalScrollIndicator={false}
                          contentContainerStyle={s.list_container}
                          keyExtractor={(item, index) => index.toString()}
                          data={menuList}
                          renderItem={this.renderMenu}
                          ListFooterComponent={() => {
                              return <View style={{height: Layout.UISize(20)}}/>
                          }}/>

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
// EXPORT
////////////////////////////////////////

export default KangDaniel;
