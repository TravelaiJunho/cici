import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Item
    layout_item: {
        paddingTop: Layout.UISize(15),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    ////////////////////
    // Category
    layout_category: {
        justifyContent: 'center',
        height: Layout.UISize(25),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        borderWidth: Layout.UISize(1),
        borderRadius: Layout.UISize(20),
    },
    ////////////////////
    // Title
    layout_title: {
        textAlign: 'left',
        marginTop: Layout.UISize(10),
    },
    ////////////////////
    // Contents
    layout_contents: {
        textAlign: 'left',
        marginTop: Layout.UISize(5),
    },
    ////////////////////
    // Date
    layout_date: {
        textAlign: 'left',
        marginTop: Layout.UISize(10),
    },
    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
