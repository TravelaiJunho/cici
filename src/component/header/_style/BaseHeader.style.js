import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Contents
    contents: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    ////////////////////
    // Border
    border: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark
    }
});

export default s;
