import {StyleSheet} from 'react-native';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Layout.getStatusBarHeight(false)
    },
    ////////////////////
    // Search
    layout_top: {
        height: Layout.HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
});

export default s;
