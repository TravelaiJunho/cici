import {StyleSheet} from 'react-native';
import Layout from "../../util/Layout";
import {colors} from "../../util/Color";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    ////////////////////
    // Contents
    layout_contents: {
        alignItems: "center",
        paddingTop: Layout.UISize(60),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(50)
    },
    layout_title: {
        height: Layout.UISize(60),
        maxWidth: Layout.UISize(206),
        flexDirection: 'row',
        alignItems:"center",
        marginTop: Layout.UISize(10),
    },
    layout_play: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: Layout.UISize(55)
    },
    ////////////////////
    // Slider
    layout_slider: {
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: Layout.UISize(75)
    },
    slider: {
        height: Layout.UISize(10)
    },
    slider_track: {
        height: Layout.UISize(4),
        backgroundColor: colors.orange
    },
    slider_thumb: {
        width: Layout.UISize(8),
        height: Layout.UISize(8),
        backgroundColor: colors.orange
    },
    layout_time: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Layout.UISize(15),
    },
    ////////////////////
    // Button
    layout_button_back: {
        height: Layout.UISize(60),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    layout_button: {
        height: Layout.UISize(45),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: Layout.UISize(50),
        paddingRight: Layout.UISize(50),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.gray
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark,
    },
});

export default s;
