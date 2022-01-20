////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import moment from "moment";
import Clipboard from "@react-native-clipboard/clipboard";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from "./_style/CommentItem.style";
import Icon from "../../util/Icon";
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
import localize from "../../util/Localize";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import AttributeText from "../text/AttributeText";
import CircleBorderImage from "../image/CircleBorderImage";
import CommentManage from "../bottom_sheet/CommentManage";
import PostDeclare from "../bottom_sheet/PostDeclare";
import BottomDeclare from "../bottom_sheet/BottomDeclare";
import ConfirmAlert from "../alert/_base/ConfirmAlert";
// API
import {declareCommentForTalkTalk} from "../../data/http/TabTalkTalk";
import {declareCommentForFromDaniel} from "../../data/http/TabFromDaniel";
import {declareCommentForToDaniel} from "../../data/http/TabToDaniel";
import {declareCommentForTalk} from "../../data/http/TabTalk";
import {declareCommentPartEventForNotice} from "../../data/http/TabEventForNotice";
import {declareCommentPartEventForMemberShip} from "../../data/http/TabEventForMemberShip";
import baseStyle from "../../screen/_style/Base.style";
import TranslateButton from "../button/TranslateButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class CommentItem extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowConfirm: false,
            confirmMessage: '',
            autoTrans: false,
        };
    }

    ////////////////////
    // FUNCTION
    setShowConfirm = (isShow, message = '') => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                confirmMessage: message
            });
        }
    }

    createDateTimeFormat = date => {
        return Common.isEmpty(date) ? '' : moment(date).format(localize.format.date_time);
    }

    getReasonTitleByList = list => {
        return list.map(v => {
            return v.reason;
        });
    }

    ////////////
    // Event
    onMore = _ => {
        const {item, profile} = this.props;
        if (!Common.isEmpty(item.user) && !Common.isEmpty(item.user.id) && !Common.isEmpty(profile.id)) {
            if (item.user.id === profile.id) {
                this.commentManage.open();
            } else {
                this.postDeclare.open();
            }
        }
    }

    onModify = _ => this.props.onModify && this.props.onModify(this.props.item);

    onRefresh = _ => this.props.onRefresh && this.props.onRefresh();

    onDeclare = (index, reason) => {
        if (index > -1) {
            this.sendDeclare(this.props.reasonList[index].id, null);
        } else {
            // Etc
            this.sendDeclare('', reason);
        }
    }

    onCopy = _ => {
        const {item} = this.props;
        if (Common.isEmpty(item) || Common.isEmpty(item.comment)) return;
        Clipboard.setString(item.comment);
        this.setShowConfirm(true, localize.success.clipboard.post_contents);
    }

    onEnableTranslate = enabled => {
        this.setState({
            autoTrans:enabled
        })
    }

    ////////////
    // API
    onResultDeclare = (success, code, message, data) => {
        this.setShowConfirm(true, message);
        this.bottomDeclare.close();
        // this.onRefresh();
    }

    sendDeclare = (reason, content) => {
        const {type, id, item} = this.props;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return declareCommentForTalkTalk(id, item.id, reason, content, this.onResultDeclare);
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return declareCommentForFromDaniel(id, item.id, reason, content, this.onResultDeclare);
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return declareCommentForToDaniel(id, item.id, reason, content, this.onResultDeclare);
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return declareCommentForTalk(id, item.id, reason, content, this.onResultDeclare);
            case Screen.STACK_NOTICE.TAB_EVENT:
                return declareCommentPartEventForNotice(id, item.id, reason, content, this.onResultDeclare);
            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return declareCommentPartEventForMemberShip(id, item.id, reason, content, this.onResultDeclare);
        }
    }

    ////////////////////
    // RENDER
    render() {
        const {type, id, item, reasonList} = this.props;
        const {user, comment, created_at} = item;
        const {isShowConfirm, confirmMessage} = this.state;
        return (
            <View style={s.layout_item}>
                <View style={{marginTop: Layout.UISize(2)}}>
                    {/* Avatar */}
                    <CircleBorderImage size={20}
                                       gradeSize={12}
                                       borderWidth={1}
                                       userGrade={user.group_id}
                                       source={Common.isEmpty(user.image_url) ? null : user.image_url}/>
                </View>
                {/* Contents */}
                <View style={s.layout_item_contents}>
                    <View style={s.layout_item_contents_top}>
                        {/* Name */}
                        <BaseText style={[FontStyle.CntTitleWhiteLH, s.text_name]}>{user.nickname}</BaseText>
                        {/* More */}
                        <TouchableOpacity onPress={this.onMore}>
                            <Icon.MoreVerticalOn size={20}
                                                 color={colors.white}/>
                        </TouchableOpacity>
                    </View>
                    {/* Comment */}
                    <View style={{marginTop: Layout.UISize(5)}}><AttributeText text={comment} autoTranslate={this.state.autoTrans}/></View>
                    {/* Date */}
                    <View style={s.DateRow}>
                        <BaseText style={[FontStyle.SubCntGrayLN]}>{this.createDateTimeFormat(created_at)}</BaseText>
                        <View style={baseStyle.subShapeCircle}/>
                        <TranslateButton useIcon={false} enabled={this.state.autoTrans} onEnabled={this.onEnableTranslate} />
                    </View>

                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => this.setShowConfirm(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{confirmMessage}</BaseText>
                </ConfirmAlert>

                {/* Manage */}
                <CommentManage ref={ref => this.commentManage = ref}
                               type={type}
                               id={id}
                               commentId={item.id}
                               name={user.nickname}
                               url={Common.isEmpty(user.image_url) ? '' : user.image_url}
                               grade={user.group_id}
                               onModify={this.onModify}
                               onDelete={this.onRefresh}
                               onCopy={this.onCopy}/>

                {/* Declare */}
                <PostDeclare ref={ref => this.postDeclare = ref}
                             name={user.nickname}
                             url={Common.isEmpty(user.image_url) ? '' : user.image_url}
                             grade={user.group_id}
                             onDeclare={_ => this.bottomDeclare.open()}
                             onCopy={this.onCopy}/>
                <BottomDeclare ref={ref => this.bottomDeclare = ref}
                               titles={this.getReasonTitleByList(reasonList)}
                               onDeclare={this.onDeclare}/>
            </View>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

CommentItem.defaultProps = {
    onModify: item => {
    },
    onRefresh: _ => {
    },
};

CommentItem.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    item: PropTypes.any.isRequired,
    onModify: PropTypes.func,
    onRefresh: PropTypes.func
};

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        profile: state.user.get('profile'),
        reasonList: state.common.get('reportReasonList'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CommentItem));
