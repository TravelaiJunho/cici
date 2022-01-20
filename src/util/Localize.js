////////////////////////////////////////

import LocalizedStrings from 'react-native-localization';
import En from './translate/en.js'
import Ko from './translate/ko.js'

////////////////////////////////////////

const localize = new LocalizedStrings({
    en: En,
    ko: Ko,
});

////////////////////////////////////////
export default localize;