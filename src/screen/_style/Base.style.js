import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const baseStyle = StyleSheet.create({
    subShapeCircle: {
        width: Layout.UISize(4),
        height: Layout.UISize(4),
        marginLeft:Layout.UISize(10),
        marginRight:Layout.UISize(10),
        backgroundColor:colors.gray,
        borderRadius:Layout.UISize(2),
    },
    sideBySide: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default baseStyle;
