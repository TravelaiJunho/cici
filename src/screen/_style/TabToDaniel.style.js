import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        backgroundColor: colors.grayDark
    },
});

export default s;