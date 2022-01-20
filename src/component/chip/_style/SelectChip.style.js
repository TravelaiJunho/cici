import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Button
    layout_button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Layout.UISize(8),
        paddingLeft: Layout.UISize(18),
        paddingRight: Layout.UISize(18),
        paddingBottom: Layout.UISize(8),
        borderRadius: Layout.UISize(20),
    },
    button_select: {
        borderColor: colors.orange,
        borderWidth: Layout.UISize(1),
    },
    button_unselect: {
        borderColor: colors.gray,
        borderWidth: Layout.UISize(1),
    },
    button_disable: {
        borderColor: colors.gray,
        borderWidth: Layout.UISize(1),
    },
});

export default s;
