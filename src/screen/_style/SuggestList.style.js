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
    // Title
    layout_title: {
        textAlign: 'left',
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
