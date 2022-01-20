import {StyleSheet} from 'react-native';
import {colors} from '../../../util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(15),
    },
    ////////////////////
    // Contents
    layout_contents: {
        flex: 1,
        backgroundColor: colors.grayDark,
        borderRadius: Layout.UISize(4),
    },
    layout_contents_avatar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    layout_contents_button: {
        height: Layout.UISize(50),
        alignItems: "center",
        justifyContent: "center",
    },
    ////////////////////
    // Bottom
    layout_bottom: {
        height: Layout.UISize(55),
        marginTop: Layout.UISize(20)
    },
    ////////////////////
    // Border
    border: {
        height: Layout.UISize(1),
        backgroundColor: colors.gray
    },
});

export default s;
