import {StyleSheet} from 'react-native';
import Layout from "../../../util/Layout";
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    layout_empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        backgroundColor: colors.grayDark
    },
});

export default s;
