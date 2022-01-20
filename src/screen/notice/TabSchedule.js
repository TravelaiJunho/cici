////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, View} from "react-native";
import moment from "moment";
import 'moment/locale/ko';
import {connect} from "react-redux";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from '../_style/TabSchedule.style';
import {colors} from "../../util/Color";
import localize from "../../util/Localize";
import Icon from "../../util/Icon";
import Info from "../../util/Info";
import {getScheduleTitle, SCHEDULE} from "../../util/type/Schedule";
import {getGradeType, GRADE} from "../../util/type/User";
import Screen from "../../util/type/Screen";
import Common from "../../util/Common";
// Component
import BaseScreen from "../_base/BaseScreen";
import BaseText from "../../component/_base/BaseText";
import Loader from "../../component/loader/Loader";
import ScheduleCalendar, {CALENDAR_FORMAT_DAY} from "../../component/calendar/ScheduleCalendar";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
// API
import {getScheduleList} from '../../data/http/TabSchedule';
import TranslateButton from "../../component/button/TranslateButton";
import {Translate} from "../../data/http/Translate";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class TabSchedule extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        const d = moment(new Date());
        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            callback: null,
            // Language
            language: props.language,
            // Profile
            profile: props.profile,
            // Calendar
            selectYear: d.year(),
            selectMonth: d.month() + 1,
            selectDate: d.format(CALENDAR_FORMAT_DAY),
            markList: [],
            // List
            scheduleData: {},
            scheduleList: [],
            // Translate
            autoTrans: false,
        }
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (Common.shouldUpdate(this.state, nextState, ['isShowConfirm' , 'autoTrans'])) return true;
        if (Common.shouldUpdate(this.state, nextState, ['selectDate', 'markList', 'scheduleList'])) return true;
        if (Common.shouldUpdate(this.props, nextProps, ['profile'])) this.setProfile(nextProps.profile);
        if (Common.shouldUpdate(this.props, nextProps, ['language'])) {
            this.setLanguage(nextProps.language);
            return true;
        }
        return false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.addBackHandler();
        this.init();
    }


    componentWillUnmount() {
        this.removeBackHandler();
        super.componentWillUnmount();
    }

    onFocus = _ => {
        const {onTabFocus} = this.props.route.params;
        onTabFocus && onTabFocus(Screen.STACK_NOTICE.TAB_SCHEDULE);
        if (!this.checkGradeUnderAssociate()) {
            this.setShowConfirm(true, localize.grade.text_access, this.props.navigation.goBack);
        }
    }

    ////////////////////
    // FUNCTION
    init = _ => {
        moment.locale(Info.getLanguage())
        const {selectYear, selectMonth, selectDate} = this.state;
        this.sendSchedule(selectYear, selectMonth, _ => this.setScheduleList(selectDate));
    }

    checkGradeUnderAssociate = _ => {
        const {group} = this.state.profile;
        if (Common.isEmpty(group)) return false;
        switch (getGradeType(group.id)) {
            case GRADE.NORMAL:
            case GRADE.ASSOCIATE:
                return true;
            default:
                return true;
        }
    }

    setShowLoading = isShow => {
        // if (this.state.isLoading !== isShow) {
        //     this.setState({isLoading: isShow});
        // }
    }

    setLanguage = lang => this.setState({language: lang}, this.init);

    setProfile = profile => this.setState({profile: profile}, this.init);

    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                callback: callback,
                errorMessage: message
            });
        }
    }

    formatDateWithWeekDay = date => {
        const d = moment(date);
        return `${d.format(localize.calendar.date_format)} (${localize.calendar.day_name[d.weekday()]})`;
    }

    formatTime = date => {
        return moment(date).format(localize.calendar.time_format);
    }

    getIcon = (type, size) => {
        switch (type) {
            case SCHEDULE.BROADCAST: // 방송
                return <Icon.TvOn size={size} color={colors.white}/>
            case SCHEDULE.EVENT: // 행사
                return <Icon.EventOn size={size} color={colors.white}/>
            case SCHEDULE.ALBUM: // 발매
                return <Icon.AlbumOn size={size} color={colors.white}/>
            case SCHEDULE.RADIO: // 라디오
                return <Icon.RadioOn size={size} color={colors.white}/>
            case SCHEDULE.ANNIVERSARY: // 기념일
                return <Icon.AnniversaryOn size={size} color={colors.white}/>
            case SCHEDULE.FAN_SIGN: // 팬사인회
                return <Icon.SignatureOn size={size} color={colors.white}/>
            default: // 기타
                return <Icon.Etc size={size} color={colors.white}/>
        }
    }

    // Calendar
    setSelectDate = date => {
        if (this.state.selectDate !== date) {
            this.setState({selectDate: date}, _ => this.setScheduleList(date));
        }
    }

    setMarkList = list => this.setState({markList: list});

    setScheduleData = (data, callback = null) => {
        this.setState({scheduleData: data}, _ => callback && callback());
    }

    setScheduleList = date => {
        const {scheduleData} = this.state;
        if (!Common.isEmpty(scheduleData) && !Common.isEmpty(date)) {
            const l = scheduleData[date];
            this.setState({scheduleList: Common.isEmpty(l) ? [] : l});
        }
    }

    setScheduleYearMonth = (year, month) => {
        this.setState({
            selectYear: year,
            selectMonth: month,
        }, _ => this.sendSchedule(year, month))
    }

    // getYearWithMonth = date => {
    //     let m = moment(date);
    //     return {
    //         year: m.year(),
    //         month: m.month() + 1
    //     };
    // }

    // createDayString = date => {
    //     return moment(date).format(CALENDAR_FORMAT_DAY);
    // }

    ////////////
    // Event
    onChangeDay = day => {
        this.setSelectDate(day.dateString);
        this.setState({
            autoTrans: false
        })
    }

    onChangeMonth = month => {
        this.setScheduleYearMonth(month.year, month.month);
    }

    ////////////
    // API
    sendSchedule = (year, month, callback = null) => {
        if (this.checkGradeUnderAssociate()) {
            this.setShowLoading(true);
            getScheduleList(year, month, (success, code, message, data) => {
                this.setShowLoading(false);
                if (success && !Common.isEmpty(data.results)) {
                    this.setMarkList(Object.getOwnPropertyNames(data.results));
                    this.setScheduleData(data.results, callback);
                }
            });
        } else {
            this.setMarkList([]);
            this.setScheduleData(null);
            this.setScheduleList('');
        }
    }

    ////////////////////
    // RENDER
    renderItem = ({item, index}) => {
        const {autoTrans} = this.state;
        const {type, title, schedule_time, translateText} = item;

        return (
            <View key={index}
                  style={s.layout_item}>
                {/* Icon */}
                <View style={s.layout_item_icon}>
                    <View style={s.layout_item_badge}>
                        <View style={BaseStyle.badge_dot}/>
                    </View>
                    {this.getIcon(type, 20)}
                </View>
                {/* Contents */}
                <View style={s.layout_item_contents}>
                    {
                        autoTrans ?
                            <BaseText style={FontStyle.Cnt13WhiteLN}>{translateText}</BaseText>
                            :
                            <BaseText style={FontStyle.Cnt13WhiteLN}>{`[${getScheduleTitle(type)}] ${title}`}</BaseText>
                    }

                    <BaseText style={FontStyle.SubCntGrayLN}>{this.formatTime(schedule_time)}</BaseText>
                </View>
            </View>);
    }

    renderEmpty = _ =>
        <View style={s.layout_empty}>
            <BaseText style={FontStyle.CntGrayDkCN}>{localize.schedule.text.not}</BaseText>
        </View>

    render() {
        const {
            isLoading,
            selectDate, markList, scheduleList,
            isShowConfirm, errorMessage, callback
        } = this.state;
        return (
            <View style={BaseStyle.container}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Calendar */}
                <ScheduleCalendar ref={ref => this.calendar = ref}
                                  selectDate={selectDate}
                                  markList={markList}
                                  onDayPress={this.onChangeDay}
                                  onMonthChange={this.onChangeMonth}/>
                {/* Border */}
                <View style={[s.layout_border, s.layout_date_border]}/>
                {/* Date */}
                <View style={s.layout_date}>
                    <BaseText style={FontStyle.CntTitleWhiteLH}>{this.formatDateWithWeekDay(selectDate)}</BaseText>
                    <TranslateButton useIcon={true} enabled={this.state.autoTrans} onEnabled={enabled => {
                        if (enabled) {
                            let translateText = '';
                            scheduleList.map( (item, index)=>{
                                let title = item.title.replace(',', '|')
                                translateText += `[${getScheduleTitle(item.type)}] ${title}`;
                                if(index<scheduleList.length-1) {
                                    translateText += ',';
                                }
                            })

                            Common.debug('trans Text : ',translateText)

                            Translate(translateText, this.props.translateLanguage, (trans) => {
                                let splitArray = trans.split(',');
                                Common.debug("array trans : ", splitArray)
                                scheduleList.map( (item, index)=>{
                                    let translateText = splitArray[index];
                                    translateText = translateText.replace("|", ",");
                                    item.translateText = translateText;
                                })
                                this.setState({
                                    autoTrans: enabled
                                })
                            })
                        }else{
                            this.setState({
                                autoTrans: enabled
                            })
                        }
                    }}/>
                </View>
                {/* Border */}
                <View style={s.layout_border}/>
                {/* List */}
                <FlatList extraData={this.state}
                          data={scheduleList}
                          threshold={2}
                          scrollEventThrottle={16}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={this.renderItem}
                          ListEmptyComponent={this.renderEmpty}
                          ItemSeparatorComponent={_ => <View style={s.layout_border}/>}/>

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>);
    }
}

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        // Common
        language: state.common.get('language'),
        profile: state.user.get('profile'),
        translateLanguage: state.translate.get('target'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(TabSchedule);
