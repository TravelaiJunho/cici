////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import Common from '../../../util/Common';

////////////////////////////////////////

export const TEMPLATE_TYPE = {
    NONE: 'none',
    TYPE_1: 'Type_1',
    TYPE_R: 'Type_R',
};

export const getTypeByNumber = n => {
    switch (n) {
        case 1:
            return TEMPLATE_TYPE.TYPE_1;
        case 5:
            return TEMPLATE_TYPE.TYPE_R;
        default:
            return TEMPLATE_TYPE.NONE;
    }
};

export const getRandomType = _ => {
    return TEMPLATE_TYPE.TYPE_1;
    // random 은 나머지가 사용될때
    //return getTypeByNumber(Common.randomNumber(1, 4));
};
