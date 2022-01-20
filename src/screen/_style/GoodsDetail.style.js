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
});

export default s;
