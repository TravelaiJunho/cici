import {StyleSheet} from 'react-native';
import Layout from '../../../util/Layout';
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    item_container: {
        height: Layout.UISize(54),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    item_title: {
        flex: 1,
        marginLeft: Layout.UISize(10),
        marginRight: Layout.UISize(10),
        fontSize: Layout.UISize(14),
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0,
        color: colors.black,
    },
    list_separator: {
        height: Layout.UISize(1),
        backgroundColor: colors.grayDark,
    },
});

export default s;
