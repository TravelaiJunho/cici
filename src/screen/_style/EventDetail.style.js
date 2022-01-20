import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    ////////////////////
    // Contents
    layout_contents: {
        flex: 1,
        padding: Layout.UISize(20),
    },
    ////////////////////
    // Category
    layout_tag_date: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Layout.UISize(5),
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        paddingBottom: Layout.UISize(5),
        borderRadius: Layout.UISize(20),
    },
    layout_tag_vertical_bar: {
        width: Layout.UISize(1),
        height: Layout.UISize(13),
        marginLeft: Layout.UISize(5),
        marginRight: Layout.UISize(5),
    },
    ////////////////////
    // Winner
    layout_winner: {
        paddingTop: Layout.UISize(20),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        paddingBottom: Layout.UISize(30),
    },
    layout_winner_tag_row: {
        flexDirection: "row",
        marginBottom: Layout.UISize(15),
    },
    layout_winner_tag: {
        height: Layout.UISize(25),
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        borderRadius: Layout.UISize(20),
        borderWidth: Layout.UISize(1),
        borderColor: colors.mint,
    },
    ////////////////////
    // Mission
    layout_mission: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    image_mission: {
        width: Layout.UISize(55),
        height: Layout.UISize(16),
    },
    text_mission_tag: {
        flex: 1,
        marginLeft: Layout.UISize(8),
    },
    ////////////////////
    // Bottom
    layout_button: {
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        marginTop: Layout.UISize(15),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(15),
        backgroundColor: colors.orange
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        backgroundColor: colors.grayDark
    },
});

export default s;
