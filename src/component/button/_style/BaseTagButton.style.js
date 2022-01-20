import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    ////////////////////
    // Button
    layout_button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: Layout.UISize(8),
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
});

export default s;
