import {StyleSheet} from 'react-native';
import {colors} from '@util/Color';
import Layout from "../../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    ////////////////////
    // Input
    input: {
        flex: 1,
        padding: 0,
    },
    ////////////////////
    // Button
    layout_button: {
        justifyContent: 'center',
        marginLeft: Layout.UISize(10),
    },
    ////////////////////
    // Border
    layout_border: {
        //flex: 1,
        width:'100%',
        height: Layout.UISize(0.5),
        marginTop: Layout.UISize(10),
    },
    color_border: {
        backgroundColor: colors.white
    },
    ////////////////////
    // Phone
    layout_nation: {
        width: Layout.UISize(90),
    },
    layout_phone: {
        flex: 1,
        marginLeft: Layout.UISize(15),
    },
});

export default s;
