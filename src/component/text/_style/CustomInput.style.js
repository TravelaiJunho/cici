import {StyleSheet} from 'react-native';
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
});

export default s;
