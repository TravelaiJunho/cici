////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Keyboard, KeyboardAvoidingView, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import {connect} from "react-redux";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from '../_style/Comment.style';
import localize from "../../util/Localize";
import {colors} from "../../util/Color";
import Screen from "../../util/type/Screen";
import RefreshState from "../../component/_common/refresh/RefreshState";
import {STATUS} from "../../data/redux/_base/ActionType";
import {getGradeType, GRADE} from "../../util/type/User";
import Layout from "../../util/Layout";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import BaseText from "../../component/_base/BaseText";
import BaseTextInput from "../../component/_base/BaseTextInput";
import BackHeader from "../../component/header/BackHeader";
import RefreshFlatList from "../../component/_common/refresh/RefreshFlatList";
import CommentItem from "../../component/item/CommentItem";
import CircleBorderImage from "../../component/image/CircleBorderImage";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// API
import {getCommentListForTalkTalk, postCommentForTalkTalk, saveCommentForTalkTalk} from '../../data/http/TabTalkTalk';
import {getCommentListForFromDaniel, postCommentForFromDaniel, saveCommentForFromDaniel} from '../../data/http/TabFromDaniel';
import {getCommentListForToDaniel, postCommentForToDaniel, saveCommentForToDaniel} from '../../data/http/TabToDaniel';
import {getCommentListForTalk, postCommentForTalk, saveCommentForTalk} from '../../data/http/TabTalk';
import {getCommentListPartEventForNotice, postCommentPartEventForNotice, saveCommentPartEventForNotice} from '../../data/http/TabEventForNotice';
import {getCommentListPartEventForMemberShip, postCommentPartEventForMemberShip, saveCommentPartEventForMemberShip} from '../../data/http/TabEventForMemberShip';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Comment extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowConfirm: false,
            errorMessage: '',
            // List
            list: [],
            page: 1,
            // Text
            isEditable: this.getPostStatus(),
            commentText: '',
            // Modify
            isModify: false,
            modifySelectItem: null,
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        super.componentDidMount();
        this.loadRefreshList();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        // Feed Refresh
        if (!Common.isEmpty(this.props.route.params)) {
            this.props.route.params.onRefresh && this.props.route.params.onRefresh()
        }
    }

    ////////////////////
    // FUNCTION
    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                errorMessage: message,
            });
        }
    }

    setCommentText = text => this.setState({commentText: text});

    resetCommentText = _ => {
        Keyboard.dismiss();
        this.setModifyComment(false);
    }

    setModifyComment = (isModify, item = null) => {
        this.setState({
            isModify: isModify,
            modifySelectItem: item,
            commentText: Common.isEmpty(item) ? '' : item.comment
        });
    }

    getPostStatus = _ => {
        const {type} = this.props.route.params;
        if (Common.isEmpty(type)) return false;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return true;
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return true;
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                const {profile} = this.props;
                if (!Common.isEmpty(profile) &&
                    !Common.isEmpty(profile.group) &&
                    getGradeType(profile.group.id) === GRADE.ARTIST) {
                    return true;
                }
                return false;
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return true;
            case Screen.STACK_NOTICE.TAB_EVENT:
                return true;
            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return true;
        }
        return false;
    }

    // List
    setList = (list, page = 1) => {
        this.setState({
            list: list,
            page: page
        });
    }

    loadRefreshList = _ => this.getCommentList()

    loadMoreList = _ => this.getCommentList(false, this.state.page + 1)

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

    ////////////
    // Event
    onModify = item => this.setModifyComment(true, item);

    ////////////
    // API
    onResultCommentList = (success, data, isRefresh, page) => {
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
    }

    onResultComment = (success, code, message, data) => {
        if (success) {
            this.resetCommentText();
            this.loadRefreshList();
        } else {
            Common.debug(message);
        }
    }

    onResultModify = (success, code, message, data) => {
        if (success) {
            this.resetCommentText();
            this.loadRefreshList();
        }
        this.setShowConfirm(true, message);
    }

    getCommentList = (isRefresh = true, page = 1) => {
        const {type, id} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return getCommentListForTalkTalk(id, page, (success, code, message, data) => this.onResultCommentList(success, data, isRefresh, page));
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return getCommentListForFromDaniel(id, page, (success, code, message, data) => this.onResultCommentList(success, data, isRefresh, page));
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return getCommentListForToDaniel(id, page, (success, code, message, data) => this.onResultCommentList(success, data, isRefresh, page));
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return getCommentListForTalk(id, page, (success, code, message, data) => this.onResultCommentList(success, data, isRefresh, page));
            case Screen.STACK_NOTICE.TAB_EVENT:
                return getCommentListPartEventForNotice(id, page, (success, code, message, data) => this.onResultCommentList(success, data, isRefresh, page));
            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return getCommentListPartEventForMemberShip(id, page, (success, code, message, data) => this.onResultCommentList(success, data, isRefresh, page));
        }
    }

    sendComment = _ => {
        const {commentText} = this.state;
        if (Common.isEmpty(commentText)) return;
        const {type, id} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return postCommentForTalkTalk(id, commentText, this.onResultComment);
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return postCommentForFromDaniel(id, commentText, this.onResultComment);

            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                const {profile} = this.props;
                if (!Common.isEmpty(profile) && !Common.isEmpty(profile.group)) {
                    if (getGradeType(profile.group.id) === GRADE.ARTIST) {
                        return postCommentForToDaniel(id, commentText, this.onResultComment);
                    }
                    //
                }
                return;

            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return postCommentForTalk(id, commentText, this.onResultComment);
            case Screen.STACK_NOTICE.TAB_EVENT:
                return postCommentPartEventForNotice(id, commentText, this.onResultComment);
            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return postCommentPartEventForMemberShip(id, commentText, this.onResultComment);
        }
    }

    modifyComment = _ => {
        const {modifySelectItem, commentText} = this.state;
        if (Common.isEmpty(commentText)) {
            this.setShowConfirm(true, localize.comment.text.input_message);
            return;
        }
        const {type, id} = this.props.route.params;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return saveCommentForTalkTalk(id, modifySelectItem.id, commentText, this.onResultModify);
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return saveCommentForFromDaniel(id, modifySelectItem.id, commentText, this.onResultModify);
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return saveCommentForToDaniel(id, modifySelectItem.id, commentText, this.onResultModify);
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return saveCommentForTalk(id, modifySelectItem.id, commentText, this.onResultModify);
            case Screen.STACK_NOTICE.TAB_EVENT:
                return saveCommentPartEventForNotice(id, modifySelectItem.id, commentText, this.onResultModify);
            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return saveCommentPartEventForMemberShip(id, modifySelectItem.id, commentText, this.onResultModify);
        }
    }

    ////////////////////
    // RENDER
    renderDeleteItem = _ =>
        <View style={s.layout_item_delete}>
            <BaseText style={FontStyle.CntGrayDkLN}>{localize.comment.text.already_delete}</BaseText>
        </View>

    renderItem = ({item, index}) => {
        const {type, id} = this.props.route.params;
        if (Common.isEmpty(item.is_deleted) ? false : item.is_deleted) {
            return this.renderDeleteItem();
        }
        if (Common.isEmpty(item.is_disabled) ? false : item.is_disabled) {
            return this.renderDeleteItem();
        }
        return <CommentItem type={type}
                            id={id}
                            item={item}
                            onModify={this.onModify}
                            onRefresh={this.loadRefreshList}/>;
    }

    renderPost = _ => {
        const {profile} = this.props;
        const {isEditable, commentText, isModify} = this.state;
        return (
            <View>
                {/* Border */}
                <View style={s.border}/>
                {/* Input */}
                <View style={s.layout_post}>
                    {/* Avatar */}
                    <View style={{justifyContent: "flex-end"}}>
                        <CircleBorderImage size={40}
                                           isUseBorder={false}
                                           source={profile.image_url}/>
                    </View>
                    {/* Input */}
                    <View style={s.layout_input_post}>
                        <View style={s.layout_input_inner}>
                            <BaseTextInput style={[FontStyle.Cnt13WhiteLN, s.input_post]}
                                           multiline={true}
                                           placeholder={localize.comment.hint}
                                           placeholderTextColor={colors.grayLight}
                                           onChangeText={this.setCommentText}
                                           editable={isEditable}
                                           value={commentText}/>
                        </View>
                        <TouchableOpacity style={s.layout_post_button}
                                          onPress={isModify ? this.modifyComment : this.sendComment}>
                            <BaseText style={FontStyle.Btn13MintRN}>{isModify ? localize.common.save : localize.common.post}</BaseText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>);
    }

    render() {
        const {isShowConfirm, errorMessage, list} = this.state;
        return (
            <KeyboardAvoidingView style={s.container}
                                  behavior={"padding"}
                                  enabled={Common.checkIOS()}
                                  keyboardVerticalOffset={Layout.getStatusBarHeight(true, false)}>
                {/* Header */}
                <BackHeader title={localize.comment.title}
                            skipAndroidStatusBar={false}
                            onBackPress={_ => this.props.navigation.pop()}/>
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
                {/* Post */}
                {this.renderPost()}

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => this.setShowConfirm(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </KeyboardAvoidingView>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

Comment.defaultProps = {
    onConfirm: item => {
    }
};

Comment.propTypes = {
    onConfirm: PropTypes.func,
};

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        profile: state.user.get('profile'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
