import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    ////////////////////
    // Contents
    layout_contents: {
        flex: 1,
        padding: Layout.UISize(20),
        // marginBottom: Layout.getBottomSpace(),
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
        height: 1,
        marginTop: Layout.UISize(20),
        marginBottom: Layout.UISize(20),
        backgroundColor: colors.grayDark
    },
});

export default s;
