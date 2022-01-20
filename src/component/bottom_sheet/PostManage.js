////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from "./_style/PostManage.style";
import localize from '../../util/Localize';
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseNormalBottomSheet from "./_base/BaseNormalBottomSheet";
import BaseText from "../_base/BaseText";
import BaseTouchableButton from "../button/_base/BaseTouchableButton";
import CircleBorderImage from "../image/CircleBorderImage";
import ConfirmCancelAlert from "../alert/_base/ConfirmCancelAlert";
import ConfirmAlert from "../alert/_base/ConfirmAlert";
// API
import {deleteItemForTalkTalk} from '../../data/http/TabTalkTalk';
import {deleteItemForFromDaniel} from '../../data/http/TabFromDaniel';
import {deleteItemForToDaniel} from '../../data/http/TabToDaniel';
import {deleteItemForTalk} from '../../data/http/TabTalk';
import {deleteItemPartEventForNotice} from '../../data/http/TabEventForNotice';
import {deleteItemPartEventForMemberShip} from '../../data/http/TabEventForMemberShip';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class PostManage extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            isShowConfirm: false,
            isShowConfirmCancel: false,
        };
    }

    ////////////////////
    // FUNCTION
    setShowConfirm = isShow => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({isShowConfirm: isShow});
        }
    }

    setShowConfirmCancel = isShow => {
        if (this.state.isShowConfirmCancel !== isShow) {
            this.setState({isShowConfirmCancel: isShow});
        }
    }

    // Event
    open = _ => this.bs.open();
    close = _ => this.bs.close();

    onModify = _ => {
        this.props.onModify && this.props.onModify();
        this.close();
    }

    onDelete = _ => {
        this.props.onDelete && this.props.onDelete();
        this.close();
    }

    onCopy = _ => {
        this.props.onCopy && this.props.onCopy();
        this.close();
    }

    ////////////
    // API
    onResultDelete = (success, code, message, data) => {
        if (success) {
            this.setShowConfirm(true);
        } else {
            Common.debug(message);
        }
    }

    deleteById = _ => {
        const {type, id} = this.props;
        if (Common.isEmpty(type)) return;
        switch (type) {
            case Screen.STACK_COMMUNITY.TAB_TALK_TALK:
                return deleteItemForTalkTalk(id, this.onResultDelete);
            case Screen.STACK_COMMUNITY.TAB_FROM_DANIEL:
                return deleteItemForFromDaniel(id, this.onResultDelete);
            case Screen.STACK_COMMUNITY.TAB_TO_DANIEL:
                return deleteItemForToDaniel(id, this.onResultDelete);
            case Screen.STACK_MEMBERSHIP.TAB_TALK:
                return deleteItemForTalk(id, this.onResultDelete);
            case Screen.STACK_NOTICE.TAB_EVENT:
                return deleteItemPartEventForNotice(id, this.onResultDelete);
            case Screen.STACK_MEMBERSHIP.TAB_EVENT:
                return deleteItemPartEventForMemberShip(id, this.onResultDelete);
        }
    }

    ////////////////////
    // RENDER
    render() {
        const {name, url, grade, isEvent} = this.props;
        const {isShowConfirm, isShowConfirmCancel} = this.state;
        return (
            <BaseNormalBottomSheet ref={ref => this.bs = ref}
                                   height={Layout.UISize(isEvent ? 280 : 331)} // 204 + 51 / 20 / 55
                                   containerColor={'transparent'}>
                <View style={s.container}>
                    {/* Contents */}
                    <View style={s.layout_contents}>
                        <View style={s.layout_contents_avatar}>
                            {/* Avatar */}
                            <CircleBorderImage size={32}
                                               gradeSize={14}
                                               borderWidth={2}
                                               userGrade={grade}
                                               source={url}/>
                            {/* Name */}
                            <BaseText style={[FontStyle.Cnt13GrayCB, {marginTop: Layout.UISize(8)}]}>{name}</BaseText>
                        </View>
                        {!isEvent &&
                        <View>
                            {/* Border */}
                            <View style={s.border}/>
                            {/* Button */}
                            <TouchableOpacity style={s.layout_contents_button}
                                              onPress={this.onModify}>
                                <BaseText style={FontStyle.CntWhiteCN}>{localize.common.modify}</BaseText>
                            </TouchableOpacity>
                        </View>}
                        {/* Border */}
                        <View style={s.border}/>
                        {/* Button */}
                        <TouchableOpacity style={s.layout_contents_button}
                                          onPress={this.onCopy}>
                            <BaseText style={FontStyle.CntWhiteCN}>{localize.common.copy_text}</BaseText>
                        </TouchableOpacity>
                        {/* Border */}
                        <View style={s.border}/>
                        {/* Button */}
                        <TouchableOpacity style={s.layout_contents_button}
                                          onPress={_ => this.setShowConfirmCancel(true)}>
                            <BaseText style={FontStyle.CntWhiteCN}>{localize.common.delete}</BaseText>
                        </TouchableOpacity>
                    </View>
                    {/* Bottom */}
                    <View style={s.layout_bottom}>
                        <BaseTouchableButton onPress={this.close}
                                             buttonStyle={{backgroundColor: colors.grayDark}}
                                             title={localize.common.cancel}/>
                    </View>
                </View>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  this.setShowConfirm(false);
                                  this.onDelete();
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{localize.success.post.delete}</BaseText>
                </ConfirmAlert>

                <ConfirmCancelAlert isVisible={isShowConfirmCancel}
                                    onConfirm={_ => {
                                        this.deleteById();
                                        this.setShowConfirmCancel(false)
                                    }}
                                    onCancel={_ => this.setShowConfirmCancel(false)}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{localize.post.text.delete}</BaseText>
                </ConfirmCancelAlert>
            </BaseNormalBottomSheet>);
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

PostManage.defaultProps = {
    isEvent: false,
    onModify: _ => {
    },
    onDelete: _ => {
    },
    onCopy: _ => {
    },
};

PostManage.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
    isEvent: PropTypes.bool,
    onModify: PropTypes.func,
    onDelete: PropTypes.func,
    onCopy: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default PostManage;
