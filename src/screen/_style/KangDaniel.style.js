import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    list_container: {
        flexGrow: 1,
        width: Layout.DEVICE_WIDTH,
        alignItems:'center',
    },
    menu_container: {
        width: Layout.UISize(335),
        height: Layout.UISize(207),
        marginTop: Layout.UISize(20),
        borderRadius: Layout.UISize(8),
        backgroundColor: colors.grayDark,
        justifyContent:'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
});

export default s;
