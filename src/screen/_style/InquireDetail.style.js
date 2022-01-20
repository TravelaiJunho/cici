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
    // Reply
    ////////////////////

    layout_reply: {
        margin: Layout.UISize(20),
    },
    // Category
    layout_reply_category: {
        justifyContent: 'center',
        height: Layout.UISize(25),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        borderWidth: Layout.UISize(1),
        borderRadius: Layout.UISize(20),
    },
    // Contents
    layout_reply_contents: {
        // maxHeight: Layout.UISize(140),
        marginTop: Layout.UISize(15),
    },
    // Date
    layout_reply_date: {
        flex: 1,
        marginLeft: Layout.UISize(10),
        textAlignVertical: 'center',
    },

    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
