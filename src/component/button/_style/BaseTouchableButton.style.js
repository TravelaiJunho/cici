import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Button
    layout_button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.orange
    },
});

export default s;
