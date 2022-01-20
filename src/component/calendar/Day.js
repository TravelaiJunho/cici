////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import moment from "moment";
////////////////////
// Local
import FontStyle from '../../util/style/Font.style';
import s from './_style/Day.style';
import Common from "../../util/Common";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Day extends BaseComponent {

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps) {
        return Common.shouldUpdate(this.props, nextProps, ['children', 'state', 'markingType', 'marking', 'onPress', 'date']);
    }

    ////////////////////
    // FUNCTION
    isDisabled = _ => {
        return this.props.state === 'disabled';
    }

    isSunday = _ => {
        const {dateString} = this.props.date;
        return moment(dateString).weekday() === 0;
    }

    getBackgroundStyle = _ => {
        const {selected} = this.props.marking;
        const style = [s.layout_background];
        if (selected) style.push(s.layout_background_select);
        return style;
    }

    getTextStyle = _ => {
        const {selected} = this.props.marking;
        if (!selected && this.isSunday()) {
            return this.isDisabled() ? [FontStyle.Cnt13DayRedCN, {opacity: 0.4}] : FontStyle.Cnt13DayRedCN;
        } else {
            return this.isDisabled() ? FontStyle.Cnt13GrayDkCN : FontStyle.Cnt13WhiteCN;
        }
    }

    // Event
    onPress = _ => {
        const {onPress, date} = this.props;
        onPress && onPress(date);
    }

    ////////////////////
    // RENDER
    renderMarking() {
        const {marked} = this.props.marking;
        return marked ? <View style={s.layout_marking}/> : null;
    }

    renderText = _ =>
        <BaseText allowFontScaling={false}
                  style={this.getTextStyle()}>{String(this.props.children)}</BaseText>

    render() {
        return (
            <View style={s.container}>
                <TouchableOpacity style={this.getBackgroundStyle()}
                                  onPress={this.onPress}
                                  accessible
                                  accessibilityRole={'button'}
                                  accessibilityLabel={this.props.accessibilityLabel}>
                    {this.renderText()}
                </TouchableOpacity>
                {this.renderMarking()}
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Day;