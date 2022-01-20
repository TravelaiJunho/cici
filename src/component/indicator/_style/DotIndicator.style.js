import {StyleSheet} from 'react-native';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    layout_dot: {
        width: Layout.UISize(5),
        height: Layout.UISize(5),
        borderRadius: Layout.UISize(5) * 0.5,
    },
});

export default s;
