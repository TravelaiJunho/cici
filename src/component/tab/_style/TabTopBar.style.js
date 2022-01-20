import {StyleSheet} from 'react-native';
import Layout from '@util/Layout';

const s = StyleSheet.create({
    ////////////////////
    // TAB
    tab_fix_container: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    tab_layout: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: Layout.UISize(10),
    },
    tab_area: {
        flex: 1
    }
});

export default s;