import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        height: Layout.UISize(37),
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        borderRadius: Layout.UISize(20),
        backgroundColor: colors.grayDark
    },
    ////////////////////
    // Icon
    layout_icon: {
        marginRight: Layout.UISize(10)
    },
});

export default s;
