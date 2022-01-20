////////////////////////////////////////

const EVENT_STATUS = {
    PLAN : 'P', // 예정
    PROGRESS : 'A', // 진행중
    END : 'E', // 종료됨
    WINNER : 'W', // 당첨자 발표
}

const EVENT_TYPE = {
    JOIN: 'J', // 참여 이벤트
    VOTE: 'V', // 투표 이벤트
    MISSION: 'M', // 다니티 공식 미션
}

////////////////////////////////////////

export {
    EVENT_STATUS,
    EVENT_TYPE
}
