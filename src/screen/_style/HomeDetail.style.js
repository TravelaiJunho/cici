import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    image_media: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    buttonContainer:{
        position: 'absolute',
        bottom: 0,
        width: Layout.DEVICE_WIDTH,
        height: Layout.UISize(60) + Layout.UISize(15), // + Layout.getBottomSpace(),
        backgroundColor: colors.background,
        borderTopColor: colors.navyLight,
        borderTopWidth: 1,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    button:{
        marginTop: Layout.UISize(15),
        width: Layout.UISize(182),
        height: Layout.UISize(45),
        borderRadius: Layout.UISize(4),
        backgroundColor: colors.gray,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
    },
    media:{
        marginTop: Layout.UISize(5),
        marginBottom: Layout.UISize(13),
        marginLeft: Layout.UISize(18),
        marginRight: Layout.UISize(18),
        justifyContent: 'center',
    },
    videofile:{
        width: Layout.DEVICE_WIDTH,
        height: Layout.relativeHeight(65), //Layout.UISize(548),
        justifyContent: 'center',
        alignItems: 'center',
    },
    videofull:{
        position:'absolute',
        width: Layout.DEVICE_WIDTH,
        height: Layout.DEVICE_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    youtube:{
        marginTop: Layout.UISize(13),
        marginBottom: Layout.UISize(8),
        marginLeft: Layout.UISize(18),
        width: Layout.UISize(66.8),
        height: Layout.UISize(15)
    },
    videoitem:{
        width: Layout.UISize(375),
        height: Layout.UISize(209),
    },
});

export default s;
