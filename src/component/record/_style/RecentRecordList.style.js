import {StyleSheet} from 'react-native';
import Layout from '../../../util/Layout';
import {colors} from "../../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Title
    title_layout: {
        height: Layout.UISize(55),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Layout.UISize(10),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
    },
    list_separator: {
        height: Layout.UISize(1),
        backgroundColor: colors.gray,
    },
});

export default s;
