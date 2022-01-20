import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Main
    ////////////////////

    // Contents
    layout_main_contents: {
        flex: 1,
        padding: Layout.UISize(20),
    },
    // Title
    layout_main_title: {
        textAlign: 'left',
    },
    // Date
    layout_main_date: {
        textAlign: 'left',
        marginTop: Layout.UISize(10),
    },
    // Border
    layout_main_border: {
        marginTop: Layout.UISize(20),
    },
    // Question
    layout_main_question: {
        marginTop: Layout.UISize(20),
    },
    // Media
    layout_main_media: {
        marginTop: Layout.UISize(20),
    },

    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
