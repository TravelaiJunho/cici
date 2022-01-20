import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    webview:{
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Layout.UISize(10),
        marginBottom: Layout.UISize(15),
    },
    webview_container:{
        width: "100%",
    },
    ////////////////////
    // Contents
    layout_contents: {
        flex: 1,
        padding: Layout.UISize(20),
        // marginBottom: Layout.getBottomSpace(),
    },
});

export default s;
