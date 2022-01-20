////////////////////////////////////////

import localize from "../Localize";

const SCHEDULE = {
    BROADCAST: 'BR', // 방송
    EVENT: 'EV',  // 행사
    ALBUM: 'RE',  // 발매
    RADIO: 'RA', // 라디오
    ANNIVERSARY: 'SD', // 기념일
    FAN_SIGN: 'FS', // 팬사인회
    ETC: 'ET', // ETC
}

const getScheduleTitle = type => {
    switch (type) {
        case SCHEDULE.BROADCAST: // 방송
            return localize.schedule.broadcast;
        case SCHEDULE.EVENT: // 행사
            return localize.schedule.event;
        case SCHEDULE.ALBUM: // 발매
            return localize.schedule.album;
        case SCHEDULE.RADIO: // 라디오
            return localize.schedule.radio;
        case SCHEDULE.ANNIVERSARY: // 기념일
            return localize.schedule.anniversary;
        case SCHEDULE.FAN_SIGN: // 팬사인회
            return localize.schedule.fan_sign;
        default: // 기타
            return localize.schedule.etc;
    }
}

//
const DEV3_STATE = true;

////////////////////////////////////////

export {
    SCHEDULE, getScheduleTitle,

    // 개발 define
    DEV3_STATE,
}
