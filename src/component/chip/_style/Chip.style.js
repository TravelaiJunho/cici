import {StyleSheet} from 'react-native';
import Layout from '../../../util/Layout';
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    container: {
        height: Layout.UISize(32),
        justifyContent: 'center',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        borderRadius: Layout.UISize(4),
    },
    layout_select: {
        backgroundColor: colors.orange,
    },
    layout_unselect: {
        borderWidth: Layout.UISize(1),
        borderColor: colors.gray,
    },
});

export default s;
