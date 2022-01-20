import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        width: Layout.UISize(32),
        height: Layout.UISize(45),
        alignItems: 'center',
    },
    ////////////////////
    // Background
    layout_background: {
        width: Layout.UISize(32),
        height: Layout.UISize(32),
        alignItems: 'center',
        justifyContent: 'center',
    },
    layout_background_select: {
        borderRadius: Layout.UISize(16),
        backgroundColor: colors.orange,
    },
    ////////////////////
    // Marking
    layout_marking: {
        width: Layout.UISize(4),
        height: Layout.UISize(4),
        marginTop: Layout.UISize(2),
        borderRadius: Layout.UISize(2),
        backgroundColor: colors.mint
    },
});

export default s;
