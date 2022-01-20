import {StyleSheet} from 'react-native';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        width: '100%'
    },
    ////////////////////
    // Label
    layout_label: {
        flex: 1,
        flexDirection: "row",
        marginBottom: Layout.UISize(10),
    },
    badge_label: {
        marginLeft: Layout.UISize(2),
    },
    ////////////////////
    // Info
    text_Info: {
        marginTop: Layout.UISize(10),
    },
    ////////////////////
    // Error
    text_error: {
        marginTop: Layout.UISize(10),
    },
});

export default s;
