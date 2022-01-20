import {StyleSheet} from "react-native";
import Layout from "../../../util/Layout";
import {colors} from '../../../util/Color';

const s = StyleSheet.create({
    mask: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.dim
    },
    wrapper: {
        width: '100%',
        alignItems: 'center',
        paddingLeft: Layout.UISize(57),
        paddingRight: Layout.UISize(57),
    },
    container: {
        width: '100%',
        padding: Layout.UISize(20),
        backgroundColor: colors.grayDark,
        borderTopLeftRadius: Layout.UISize(8),
        borderTopRightRadius: Layout.UISize(8),
    },
    ////////////////////
    // Title
    text_title: {
        marginBottom: Layout.UISize(5),
    },
    ////////////////////
    // Contents
    contents_layout: {
        width: '100%',
        alignItems: 'center',
    },
    ////////////////////
    // Bottom
    bottom_button_layout: {
        width: '100%',
        height: Layout.UISize(45),
    },
    ////////////////////
    // Button
    button_layout: {
        height: Layout.UISize(45),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.grayDark,
        borderBottomLeftRadius: Layout.UISize(8),
        borderBottomRightRadius: Layout.UISize(8),
    },
    button_single: {
        flex: 1,
        justifyContent: "center"
    },
    ////////////////////
    // Divider
    divider_horizontal: {
        height: Layout.UISize(1),
        backgroundColor: colors.gray
    },
    divider_vertical: {
        width: Layout.UISize(1),
        backgroundColor: colors.gray
    }
});

export default s;
