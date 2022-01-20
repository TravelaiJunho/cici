import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    layout_menu: {
        flexDirection: "row",
        alignItems: "center",
        height: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    ////////////////////
    // Border
    layout_border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    },
});

export default s;
