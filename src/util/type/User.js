////////////////////////////////////////

const GRADE = {
    NORMAL: 'GRADE/NORMAL', // Not Used
    ASSOCIATE: 'GRADE/ASSOCIATE', // 준회원
    REGULAR: 'GRADE/REGULAR', // 정회원
    HONORS: 'GRADE/HONORS', // 우등회원
    ARTIST: 'GRADE/ARTIST', // 아티스트
    OPERATOR: 'GRADE/OPERATOR', // 운영자
    SUPPORTERS: 'GRADE/SUPPORTERS', // 서포터즈
}

const getGradeType = id => {
    switch (id) {
        case 1: // 준회원
            return GRADE.ASSOCIATE;
        case 2: // 정회원
            return GRADE.REGULAR;
        case 3: // 우등회원
            return GRADE.HONORS;
        case 4: // 아티스트
            return GRADE.ARTIST;
        case 5: // 운영자
            return GRADE.OPERATOR;
        case 6: // 서포터즈
            return GRADE.SUPPORTERS;
        default:
            return GRADE.NORMAL;
    }
}

////////////////////////////////////////

export {
    GRADE, getGradeType
}