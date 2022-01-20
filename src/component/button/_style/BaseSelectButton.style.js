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
        borderRadius: Layout.UISize(4),
    },
    button_select: {
        backgroundColor: colors.orange
    },
    button_unselect: {
        borderColor: colors.gray,
        borderWidth: Layout.UISize(1),
    },
    button_error: {
        borderColor: colors.orange,
        borderWidth: Layout.UISize(1),
    },
    ////////////////////
    // Text
    text_title: {
        fontSize: Layout.UISize(13),
        color: colors.white,
    },
    text_select: {
        fontWeight: 'bold'
    },
    text_unselect: {
        fontWeight: 'normal'
    },
});

export default s;
