////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
////////////////////
// Local
import FontStyle from '../../util/style/Font.style';
import s from './_style/Header.style';
import Icon from "../../util/Icon";
import {colors} from "../../util/Color";
import localize from "../../util/Localize";
// Component
import BaseComponent from "../_base/BaseComponent";
import BaseText from "../_base/BaseText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Header extends BaseComponent {

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps) {
        return this.toStringForMonth(nextProps.month) !== this.toStringForMonth(this.props.month);
    }

    ////////////////////
    // FUNCTION
    toStringForMonth = month => {
        return month.toString('yyyy-MM');
    }

    addMonth = _ => {
        const {addMonth} = this.props;
        addMonth(1);
    };

    subtractMonth = _ => {
        const {addMonth} = this.props;
        addMonth(-1);
    };

    getDayTextStyle = isSunday => {
        if (isSunday) {
            return [FontStyle.Cnt13DayRedCN, s.layout_day];
        } else {
            return [FontStyle.Cnt13WhiteCN, s.layout_day];
        }
    }

    // Event
    onPressLeft = _ => {
        const {onPressArrowLeft, month} = this.props;
        if (typeof onPressArrowLeft === 'function') {
            return onPressArrowLeft(this.subtractMonth, month);
        }
        return this.subtractMonth();
    };

    onPressRight = _ => {
        const {onPressArrowRight, month} = this.props;
        if (typeof onPressArrowRight === 'function') {
            return onPressArrowRight(this.addMonth, month);
        }
        return this.addMonth();
    };

    onAccessibilityAction = event => {
        switch (event.nativeEvent.actionName) {
            case 'decrement':
                this.onPressLeft();
                break;

            case 'increment':
                this.onPressRight();
                break;
        }
    };

    ////////////////////
    // RENDER
    renderHeader = () => {
        const {month} = this.props;
        return <BaseText style={FontStyle.CntTitleWhiteLH}
                         allowFontScaling={false}>{month.toString(localize.calendar.month_format)}</BaseText>;
    };

    renderArrowIcon = direction => {
        switch (direction) {
            case 'left' :
                return <Icon.SignLeft size={20} color={colors.white}/>
            case 'right' :
                return <Icon.SignRight size={20} color={colors.white}/>
        }
    }

    renderArrow = direction => {
        const isLeft = direction === 'left';
        return (
            <TouchableOpacity hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
                              onPress={isLeft ? this.onPressLeft : this.onPressRight}>
                {this.renderArrowIcon(isLeft ? 'left' : 'right')}
            </TouchableOpacity>);
    }

    renderDayNames = _ =>
        <View style={s.layout_day_name}>
            {localize.calendar.day_name.map((day, index) =>
                <BaseText key={index}
                          style={this.getDayTextStyle(index === 0)}
                          allowFontScaling={false}
                          numberOfLines={1}
                          accessibilityLabel={''}>{day}</BaseText>)}
        </View>

    render() {
        const {style} = this.props;
        return (
            <View style={style}
                  accessible
                  accessibilityRole={'adjustable'}
                  accessibilityActions={[
                      {name: 'increment', label: 'increment'},
                      {name: 'decrement', label: 'decrement'}
                  ]}
                  accessibilityElementsHidden={this.props.accessibilityElementsHidden} // iOS
                  importantForAccessibility={this.props.importantForAccessibility} // Android
                  onAccessibilityAction={this.onAccessibilityAction}>
                {/* Header */}
                <View style={s.layout_header}>
                    {this.renderArrow('left')}
                    {this.renderHeader()}
                    {this.renderArrow('right')}
                </View>
                {/* Day Name */}
                {this.renderDayNames()}
                {/* Border */}
                <View style={s.layout_border}/>
            </View>);
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default Header;