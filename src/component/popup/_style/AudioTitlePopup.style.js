import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    mask: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Layout.UISize(30),
        backgroundColor: colors.dim,
    },
    layout_title: {
        width: '100%',
        // maxWidth: '100%',
        padding: Layout.UISize(20),
        backgroundColor: colors.navy,
        borderRadius: Layout.UISize(8),
    },
    button_close: {
        width: Layout.UISize(40),
        height: Layout.UISize(40),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: Layout.UISize(40) * 0.5,
        marginTop: Layout.UISize(20),
        backgroundColor: colors.navyLight,
    }
});

export default s;
