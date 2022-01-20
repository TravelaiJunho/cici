////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {ScrollView, View} from "react-native";
import PropTypes from "prop-types";
import _ from 'lodash';
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
import s from './_style/BottomFilterForEvent.style';
import Layout from "../../util/Layout";
import localize from "../../util/Localize";
import {colors} from "../../util/Color";
import {WRITER_CODE_ME} from "../../util/type/Writer";
import Common from "../../util/Common";
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

class BottomFilterForEvent extends BaseComponent {

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
            writers: this.filterList(indexes, WRITER_CODE_ME),
            writerIndex: indexes
        });

    setTags = indexes =>
        this.setState({
            tags: this.filterList(indexes, this.props.tagList),
            tagIndex: indexes
        });

    getTagTitle = _ => {
        const {tagList} = this.props;
        if (!Common.checkListSize(tagList)) return [];
        return tagList.map(t => {
            return '#' + t.name;
        });
    }

    getTagCode = list => {
        if (!Common.checkListSize(list)) return [];
        return list.map(t => {
            return t.code;
        });
    }

    // Event
    open = _ => this.bs.open()
    close = _ => this.bs.close()
    onChange = _ => {
        const {writers, tags} = this.state;
        this.props.onChange && this.props.onChange(writers, this.getTagCode(tags));
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
        const WRITER_NAME = [localize.event.filter.writer_my_writing];
        return (
            <BaseRadiusBottomSheet ref={ref => this.bs = ref}
                                   height={Layout.UISize(411)} // 335 / 1 75
                                   title={localize.event.filter.text.filter_title}>
                <ScrollView style={{maxHeight: Layout.UISize(335)}}>
                    {/* Info */}
                    <View style={s.layout_info}>
                        {/* Writer */}
                        <BaseText style={[FontStyle.Cnt13GrayCB, s.text_writer]}>{localize.event.filter.writer_title}</BaseText>
                        <GroupMultiHorizontalButton titles={WRITER_NAME}
                                                    selectMultiIndex={writerChangeIndex}
                                                    onSelectMultiIndex={this.setWriters}/>
                        {/* Tag */}
                        <BaseText style={[FontStyle.Cnt13GrayCB, s.text_tag]}>{localize.event.filter.tag_title}</BaseText>
                        <GroupMultiVerticalButton titles={this.getTagTitle()}
                                                  selectMultiIndex={tagChangeIndex}
                                                  onSelectMultiIndex={this.setTags}/>
                    </View>
                </ScrollView>
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

BottomFilterForEvent.defaultProps = {
    onChange: (writers, tags) => {
    },
};

BottomFilterForEvent.propTypes = {
    tagList: PropTypes.array.isRequired,
    onChange: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BottomFilterForEvent;