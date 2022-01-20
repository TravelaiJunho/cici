import {StyleSheet} from 'react-native';
import {colors} from '../../util/Color';
import Layout from "../../util/Layout";

const s = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Platform.OS == 'android' ? "rgba(0,0,0,0.1)" : "transparent", //
    },
    // content:{
    //     position: 'absolute',
    //     bottom:0,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: Layout.DEVICE_WIDTH,
    //     height:Layout.DEVICE_HEIGHT,
    //     backgroundColor:colors.background,
    // },
    // image: {
    //     width: Layout.DEVICE_WIDTH,
    //     aspectRatio: 1,
    //     color: colors.grayDark
    // },
});

export default s;
