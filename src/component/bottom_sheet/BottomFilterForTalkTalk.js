////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {View} from "react-native";
import PropTypes from "prop-types";
import _ from 'lodash';
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from './_style/BottomFilterForTalkTalk.style';
import Layout from "../../util/Layout";
import localize from "../../util/Localize";
import {colors} from "../../util/Color";
import {WRITER_CODE_ALL} from "../../util/type/Writer";
import {TAG_CODE} from "../../util/type/Tag";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import BaseTouchableButton from "../button/_base/BaseTouchableButton";
import BaseRadiusBottomSheet from "./_base/BaseRadiusBottomSheet";
import GroupMultiHorizontalButton from "../button/GroupMultiHorizontalButton";
import GroupMultiVerticalButton from "../button/GroupMultiVerticalButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BottomFilterForTalkTalk extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            // Writer
            writer: [],
            writerIndex: [],
            writerChangeIndex: [], // Change
            // Tag
            tag: [],
            tagIndex: [],
            tagChangeIndex: [], // Change
        }
    }

    ////////////////////
    // FUNCTION

    // Filter
    filterList = (indexes, list) => {
        let f = [];
        _.forEach(indexes, value => f.push(list[value]));
        return f;
    }

    setWriters = indexes =>
        this.setState({
            writers: this.filterList(indexes, WRITER_CODE_ALL),
            writerIndex: indexes
        });

    setTags = indexes =>
        this.setState({
            tags: this.filterList(indexes, TAG_CODE),
            tagIndex: indexes
        });

    // Event
    open = _ => this.bs.open()
    close = _ => this.bs.close()
    onChange = _ => {
        this.props.onChange && this.props.onChange(this.state.writers, this.state.tags);
        this.close();
        // Set Change Index
        const {writerIndex, tagIndex} = this.state;
        this.setState({
            writerChangeIndex: writerIndex,
            tagChangeIndex: tagIndex
        });
    }

    render() {
        const {writerChangeIndex, tagChangeIndex} = this.state;
        const WRITER_NAME_ALL = [
            localize.community.filter.writer_my_writing,
            localize.community.filter.writer_daniel,
        ];
        const TAG_NAME = [
            localize.community.filter.tag_free_talk,
            localize.community.filter.tag_cert_review,
            localize.community.filter.tag_share_info,
        ];
        return (
            <BaseRadiusBottomSheet ref={ref => this.bs = ref}
                                   height={Layout.UISize(376)} // 300 / 1 75
                                   title={localize.community.filter.text.filter_title}>
                {/* Info */}
                <View style={s.layout_info}>
                    {/* Writer */}
                    <BaseText style={[FontStyle.Cnt13GrayCB, s.text_title]}>{localize.community.filter.writer_title}</BaseText>
                    <GroupMultiHorizontalButton titles={WRITER_NAME_ALL}
                                                selectMultiIndex={writerChangeIndex}
                                                onSelectMultiIndex={this.setWriters}/>
                    {/* Tag */}
                    <BaseText style={[FontStyle.Cnt13GrayCB, s.text_title]}>{localize.community.filter.tag_title}</BaseText>
                    <View style={{height: Layout.UISize(140)}}>
                        <GroupMultiVerticalButton titles={TAG_NAME}
                                                  selectMultiIndex={tagChangeIndex}
                                                  onSelectMultiIndex={this.setTags}/>
                    </View>
                </View>
                {/* Bottom */}
                <View style={s.layout_border}/>
                <View style={s.layout_two_button}>
                    <BaseTouchableButton title={localize.common.cancel}
                                         buttonStyle={{backgroundColor: colors.gray}}
                                         onPress={this.close}/>
                    <BaseTouchableButton title={localize.common.change}
                                         buttonStyle={{marginLeft: Layout.UISize(10)}}
                                         onPress={this.onChange}/>
                </View>
            </BaseRadiusBottomSheet>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BottomFilterForTalkTalk.defaultProps = {
    onChange: (writers, tags) => {
    },
};

BottomFilterForTalkTalk.propTypes = {
    onChange: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BottomFilterForTalkTalk;