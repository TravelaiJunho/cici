import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Section
    layout_section: {
        height: Layout.UISize(35),
        justifyContent: "center",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.grayDark,
    },
    ////////////////////
    // Row
    layout_row_total: {
        height: Layout.UISize(55),
        justifyContent: "center",
    },
    layout_row_contents: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    text_row_nation: {
        maxWidth: '80%',
    },
    text_row_code: {
        flex: 1,
        marginLeft: Layout.UISize(5),
    },
    layout_icon: {
        marginLeft: Layout.UISize(5),
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark
    },
    ////////////////////
    // Search
    layout_search: {
        height: Layout.UISize(60),
        justifyContent: "center",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        marginTop: Layout.UISize(10),
        marginBottom: Layout.UISize(10),
    },
});

export default s;
