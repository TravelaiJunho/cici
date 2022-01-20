////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import moment from "moment";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from '../_style/AlarmList.style';
import localize from "../../util/Localize";
import Icon from "../../util/Icon"
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
import {STATUS} from "../../data/redux/_base/ActionType";
import {callScreenByData} from "../../util/Notification";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import BaseText from "../../component/_base/BaseText";
import BackHeader from "../../component/header/BackHeader";
import Loader from "../../component/loader/Loader";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import RefreshState from "../../component/_common/refresh/RefreshState";
import RefreshFlatList from "../../component/_common/refresh/RefreshFlatList";
// API
import {getAlarmList, setRead, setReadAll} from "../../data/http/Alarm";
import {changeAlarm} from "../../data/redux/action/Badge";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class AlarmList extends BaseScreen {

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
            // List
            list: [],
            page: 1,
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.loadRefreshList();
    }

    ////////////////////
    // FUNCTION
    setShowLoading = isShow => {
        this.setState({isLoading: isShow});
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

    getErrorMessage = (code = 0) => {
        switch (code) {
            default:
                return localize.error.failed;
        }
    }

    createDateTimeFormat = date => {
        return Common.isEmpty(date) ? '' : moment(date).format(localize.format.date_time);
    }

    // List
    setList = (list, page = 1) => {
        this.setState({
            list: list,
            page: page
        });
    }

    getLastId = list => {
        if (!Common.checkListSize(list)) return '';
        const last = list[list.length - 1];
        if (Common.isEmpty(last.id)) return '';
        return last.id;
    }

    loadRefreshList = _ => this.sendList()

    loadMoreList = _ => {
        this.sendList(false, this.getLastId(this.state.list))
    }

    setStatusRefresh = status => {
        switch (status) {
            case STATUS.COMPLETE:
                this.list.endRefreshing(RefreshState.CanLoadMore);
                break;

            case STATUS.FAIL:
                this.list.endRefreshing(RefreshState.NoMoreData);
                break;
        }
    };

    // Event
    onRead = item => this.sendRead(item);

    onReadAll = _ => this.sendReadAll();

    // API
    sendList = (isRefresh = true, lastId = '', page = 1) => {
        this.setShowLoading(true);
        getAlarmList(lastId, page, (success, code, message, data) => {
            this.setShowLoading(false);
            if (success && data.results.length > 0) {
                this.setList(isRefresh ? data.results : this.state.list.concat(data.results), page);
                if (Common.isEmpty(data.next)) {
                    this.setStatusRefresh(STATUS.FAIL);
                } else {
                    this.setStatusRefresh(STATUS.COMPLETE);
                }
            } else {
                this.setStatusRefresh(STATUS.FAIL);
            }
        })
    }

    sendRead = item => {
        this.setShowLoading(true);
        setRead(item.id, (success, code, message, data) => {
            if (success) {
                // Read
                item.is_read = true;
                // Call Screen
                const {type, board_type, data_id} = item.data;
                callScreenByData(type, board_type, data_id);
                // Call Badge
                this.props.updateAlarm();
            }
            this.setShowLoading(false);
        });
    }

    sendReadAll = _ => {
        this.setShowLoading(true);
        setReadAll((success, code, message, data) => {
            if (success) {
                // Read All
                this.state.list.map(item => item.is_read = true);
                // Call Badge
                this.props.updateAlarm();
            }
            this.setShowLoading(false);
        });
    }

    ////////////////////
    // RENDER
    renderItemRead = _ =>
        <View style={s.layout_item_read}>
            <Icon.MailRead size={20} color={colors.white}/>
        </View>

    renderItemNotRead = _ =>
        <View style={s.layout_item_not_read}>
            <Icon.MailUnRead size={20} color={colors.white}/>
            <View style={s.layout_item_badge}/>
        </View>

    renderItem = ({item, index}) => {
        const {title, message, is_read, created_at} = item;
        return (
            <TouchableOpacity style={s.layout_item}
                              activeOpacity={1}
                              onPress={_ => this.onRead(item)}>
                {is_read ? this.renderItemRead() : this.renderItemNotRead()}
                <View style={s.layout_item_text}>
                    <BaseText style={FontStyle.Cnt13WhiteLT}>{`${title} ${message}`}</BaseText>
                    <BaseText style={[FontStyle.SubCntGrayLN, {marginTop: Layout.UISize(5)}]}>{this.createDateTimeFormat(created_at)}</BaseText>
                </View>
            </TouchableOpacity>);
    }

    render() {
        const {
            isLoading,
            isShowConfirm, errorMessage, callback,
            list
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.alarm.list_title}
                            rightTitle={localize.alarm.read_all}
                            onBackPress={_ => this.props.navigation.pop()}
                            onRightPress={_ => this.onReadAll()}/>
                {/* List */}
                <RefreshFlatList ref={ref => this.list = ref}
                                 style={{flex: 1}}
                                 data={list}
                                 extraData={this.state}
                                 keyExtractor={(item, index) => index.toString()}
                                 scrollEventThrottle={16}
                                 renderItem={this.renderItem}
                                 ItemSeparatorComponent={_ => <View style={s.border}/>}
                                 onHeaderRefresh={this.loadRefreshList}
                                 onFooterRefresh={this.loadMoreList}/>
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateAlarm: _ => {
            return dispatch(changeAlarm());
        },
    };
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(AlarmList);