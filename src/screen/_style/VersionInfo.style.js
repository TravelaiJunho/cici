import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: Layout.UISize(60),
        height: Layout.UISize(60),
        marginBottom: Layout.UISize(20),
    },
    btn: {
        width: Layout.UISize(89),
        height: Layout.UISize(32),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.orange
    }
});

export default s;
