import {StyleSheet} from 'react-native';
import {colors} from '../Color';
import Layout from "../Layout";

const base = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        height: Layout.HEADER_HEIGHT,
    },
    ////////////////////
    // Badge
    badge_dot: {
        width: Layout.UISize(4),
        height: Layout.UISize(4),
        marginLeft: Layout.UISize(2),
        backgroundColor: colors.orange,
        borderRadius: Layout.UISize(4) * 0.5,
    },
    badge_text: {
        width: Layout.UISize(14),
        height: Layout.UISize(14),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.orange,
        borderRadius: Layout.UISize(14) * 0.5
    },
    ////////////////////
    // Error
    error: {
        backgroundColor: colors.orange
    },
});

export default base;
