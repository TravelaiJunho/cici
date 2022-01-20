import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        height: Layout.HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
    },
});

export default s;
