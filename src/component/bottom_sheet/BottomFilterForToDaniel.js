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
import s from './_style/BottomFilterForToDaniel.style';
import Layout from "../../util/Layout";
import localize from "../../util/Localize";
import {colors} from "../../util/Color";
import {WRITER_CODE_ME} from "../../util/type/Writer";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";
import BaseTouchableButton from "../button/_base/BaseTouchableButton";
import BaseRadiusBottomSheet from "./_base/BaseRadiusBottomSheet";
import GroupMultiHorizontalButton from "../button/GroupMultiHorizontalButton";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BottomFilterForToDaniel extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            // Writer
            writer: [],
            writerIndex: [],
            writerChangeIndex: [], // Change
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

    // Event
    open = _ => this.bs.open()
    close = _ => this.bs.close()
    onChange = _ => {
        this.props.onChange && this.props.onChange(this.state.writers);
        this.close();
        // Set Change Index
        const {writerIndex} = this.state;
        this.setState({writerChangeIndex: writerIndex});
    }

    render() {
        const {writerChangeIndex} = this.state;
        const WRITER_NAME_ME = [localize.community.filter.writer_my_writing]
        return (
            <BaseRadiusBottomSheet ref={ref => this.bs = ref}
                                   height={Layout.UISize(181)} // 105 / 1 75
                                   title={localize.community.filter.text.filter_title}>
                {/* Info */}
                <View style={s.layout_info}>
                    {/* Writer */}
                    <BaseText style={[FontStyle.Cnt13GrayCB, s.text_title]}>{localize.community.filter.writer_title}</BaseText>
                    <GroupMultiHorizontalButton titles={WRITER_NAME_ME}
                                                selectMultiIndex={writerChangeIndex}
                                                onSelectMultiIndex={this.setWriters}/>
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

BottomFilterForToDaniel.defaultProps = {
    onChange: (writers) => {
    },
};

BottomFilterForToDaniel.propTypes = {
    onChange: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BottomFilterForToDaniel;