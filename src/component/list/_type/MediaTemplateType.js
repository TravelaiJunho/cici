////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import Common from '../../../util/Common';

////////////////////////////////////////

export const TEMPLATE_TYPE = {
    NONE: 'none',
    TYPE_1: 'Type_1',
    TYPE_2: 'Type_2',
};

export const getTypeByNumber = n => {
    switch (n) {
        case 1:
            return TEMPLATE_TYPE.TYPE_1;
        case 2:
            return TEMPLATE_TYPE.TYPE_2;
        default:
            return TEMPLATE_TYPE.NONE;
    }
};

// export const getRandomType = _ => {
//     return getTypeByNumber(Common.randomNumber(1, 2));
// };
