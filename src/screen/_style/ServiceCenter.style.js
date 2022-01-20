import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    listItemContainer: {
        width: Layout.DEVICE_WIDTH,
        height: Layout.UISize(55),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        backgroundColor: colors.navy
    },
    menuContainer: {
        flexGrow: 1,
        width: Layout.DEVICE_WIDTH
    },
});

export default s;
