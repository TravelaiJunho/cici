import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Header
    layout_header: {
        height: Layout.HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ////////////////////
    // Day
    layout_day_name: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Layout.UISize(8),
        marginBottom: Layout.UISize(15),
    },
    layout_day: {
        width: Layout.UISize(32)
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark
    },
});

export default s;
