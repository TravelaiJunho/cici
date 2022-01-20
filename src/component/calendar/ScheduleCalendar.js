////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Calendar} from 'react-native-calendars';
import PropTypes from "prop-types";
////////////////////
// Local
import s from './_style/Calendar.style';
import Layout from "../../util/Layout";
// Component
import BaseComponent from "../_base/BaseComponent";
import Header from "./Header";
import Day from "./Day";

////////////////////////////////////////
// LOCAL VALUE
////////////////////////////////////////

export const CALENDAR_FORMAT_DAY = "YYYY-MM-DD";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class ScheduleCalendar extends BaseComponent {

    getTheme = {
        calendarBackground: 'transparent',
        'stylesheet.calendar.main': {
            container: {
                paddingLeft: Layout.UISize(20),
                paddingRight: Layout.UISize(20),
            },
            monthView: {
                paddingTop: Layout.UISize(10),
                paddingBottom: Layout.UISize(10),
            },
            week: {
                flexDirection: 'row',
                justifyContent: 'space-around',
            }
        },
    };

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            selectDate: props.selectDate
        }
    }

    ////////////////////
    // FUNCTION
    setSelectDate = day => {
        this.setState({selectDate: day})
    }

    getSelectDate = _ => {
        return this.state.selectDate;
    }

    createMarkItem = (isSelect = false, isMark = false) => {
        return {
            selected: isSelect,
            marked: isMark
        }
    }

    createMarkDate = () => {
        const {selectDate} = this.state;
        const {markList} = this.props;
        let m = {};
        let exist = false;
        markList.forEach(v => {
            if (v === selectDate) {
                exist = true;
                m[v] = this.createMarkItem(true, true);
            } else {
                m[v] = this.createMarkItem(false, true);
            }
        });
        if (!exist) m[selectDate] = this.createMarkItem(true, false);
        return m;
    }

    // Event
    onDayPress = day => {
        this.setSelectDate(day.dateString);
        const {onDayPress} = this.props;
        onDayPress && onDayPress(day);
    }

    onMonthChange = month => {
        const {onMonthChange} = this.props;
        onMonthChange && onMonthChange(month);
    }

    ////////////////////
    // RENDER
    render() {
        return <Calendar style={s.container}
                         theme={this.getTheme}
                         customHeader={props => <Header {...props}/>}
                         dayComponent={props => <Day {...props}/>}
                         onDayPress={this.onDayPress}
                         onMonthChange={this.onMonthChange}
                         markedDates={this.createMarkDate()}/>;
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

ScheduleCalendar.defaultProps = {
    markList: [],
    onDayPress: day => {
    },
    onMonthChange: month => {
    }
};

ScheduleCalendar.propTypes = {
    selectDate: PropTypes.string.isRequired,
    markList: PropTypes.arrayOf(PropTypes.string),
    onDayPress: PropTypes.func,
    onMonthChange: PropTypes.func,
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default ScheduleCalendar;
