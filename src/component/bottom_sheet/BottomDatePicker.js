////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import DatePicker from "react-native-date-picker";
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import BaseNormalBottomSheet from "./_base/BaseNormalBottomSheet";
import BaseText from "../_base/BaseText";
import s from "./_style/BottomDatePicker.style";
import {colors} from "../../util/Color";
import Layout from "../../util/Layout";
import Info from "../../util/Info";
import localize from '../../util/Localize';

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class BottomDatePicker extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            currentDate: props.currentDate
        }
    }

    ////////////////////
    // FUNCTION
    setCurrentDate = date => {
        this.setState({currentDate: date});
    }

    getDate = _ => {
        return this.state.currentDate;
    }

    // Event
    open = _ => this.bs.open()
    close = _ => this.bs.close()
    done = _ => {
        this.props.onSelect && this.props.onSelect(this.state.currentDate);
        this.close();
    }

    ////////////////////
    // RENDER
    render() {
        const {currentDate} = this.state;
        const {maximumDate} = this.props;
        return (
            <BaseNormalBottomSheet ref={ref => this.bs = ref}
                                   height={Layout.UISize(265)} // 50 / 215
                                   backgroundColor={'transparent'}>
                {/* Top */}
                <View style={s.layout_top}>
                    <TouchableOpacity onPress={this.close}>
                        <BaseText style={s.text_title}>{localize.common.cancel}</BaseText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.done}>
                        <BaseText style={s.text_title}>{localize.common.done}</BaseText>
                    </TouchableOpacity>
                </View>

                {/* Picker */}
                <View style={s.layout_picker}>
                    <DatePicker mode={'date'}
                                date={currentDate}
                                maximumDate={maximumDate}
                                locale={Info.getLanguage()}
                                onDateChange={this.setCurrentDate}
                                textColor={colors.white}
                                fadeToColor={colors.black}
                                dividerHeight={Layout.UISize(0.2)}/>
                </View>
            </BaseNormalBottomSheet>
        );
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BottomDatePicker.defaultProps = {
    currentDate: new Date(),
    maximumDate: new Date(),
    onSelect: date => {
    },
};

BottomDatePicker.propTypes = {
    currentDate: PropTypes.any,
    onSelect: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BottomDatePicker;