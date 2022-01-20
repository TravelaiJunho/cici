import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: Layout.getBottomSpace()
    },
    ////////////////////
    // Contents
    layout_contents: {
        flex: 1,
        padding: Layout.UISize(20),
        // marginBottom: Layout.getBottomSpace(),
    },
    ////////////////////
    // Category
    layout_category: {
        justifyContent: 'center',
        height: Layout.UISize(25),
        paddingLeft: Layout.UISize(20),
        paddingRight: Layout.UISize(20),
        borderColor: colors.orange,
        borderWidth: Layout.UISize(1),
        borderRadius: Layout.UISize(20),
    },
    ////////////////////
    // Title
    layout_title: {
        textAlign: 'left',
        marginTop: Layout.UISize(15),
    },
    ////////////////////
    // Date
    layout_date: {
        textAlign: 'left',
        //marginTop: Layout.UISize(15),
    },
    ////////////////////
    // Border
    layout_border: {
        height: 1,
        marginTop: Layout.UISize(20),
        marginBottom: Layout.UISize(20),
        backgroundColor: colors.grayDark
    },
    DateRow: {
        marginTop: Layout.UISize(15),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    /////////////////////
    // Propose
    layout_propose: {
        justifyContent: 'center',
        alignItems:'flex-start'
    },
    propose_ended: {
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems:'flex-start'
    },
    layout_button: {
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        marginTop: Layout.UISize(15),
        marginLeft: Layout.UISize(20),
        marginRight: Layout.UISize(20),
        marginBottom: Layout.UISize(15),
        backgroundColor: colors.orange
    },
    // status
    layout_status: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingTop: Layout.UISize(5),
        paddingLeft: Layout.UISize(10),
        paddingRight: Layout.UISize(10),
        paddingBottom: Layout.UISize(5),
        borderRadius: Layout.UISize(20),
    },
    layout_progress_status: {
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    },
    layout_ended_status: {
        height: Layout.UISize(25),
        borderRadius: Layout.UISize(20),
        paddingLeft: Layout.UISize(15),
        paddingRight: Layout.UISize(15),
        borderWidth: Layout.UISize(1),
        borderColor: colors.grayDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Layout.UISize(10),
    },
    layout_tag_vertical_bar: {
        width: Layout.UISize(1),
        height: Layout.UISize(13),
        marginLeft: Layout.UISize(5),
        marginRight: Layout.UISize(5),
    },
    image_layout: {
        marginTop: Layout.UISize(20),
        height: Layout.UISize(335),
        padding: Layout.UISize(20),
    }
});

export default s;
