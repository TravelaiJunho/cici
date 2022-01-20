import React, {FC, useRef} from 'react';
import ImageZoom, {ImageZoomProps} from 'react-native-image-pan-zoom';
import {Dimensions, Image, View} from 'react-native';

/*
interface ZoomImageProps {
    source: {uri:null};
    width ? : any;
    height ? : any;
    style ? : ZoomImageProps['style'];
    onScaleChange ? : (scale: number) => void;
}*/

const ZoomImage = ({
                                           source,
                                           width = Dimensions.get('window').width,
                                           height = Dimensions.get('window').height,
                                           onScaleChange,
                                           ...props
                                       }) => {
    const scaleValue = useRef(1);
    return (
        <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={width}
            imageHeight={height}
            minScale={1}
            {...props}
            onStartShouldSetPanResponder={(e) => {
                return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
            }}
            onMove={({scale}) => {
                scaleValue.current = scale;
                onScaleChange && onScaleChange(scale);
            }}>
            <View
                style={{width: '100%', height: '100%'}}
                onStartShouldSetResponder={(e) => {
                    console.log(
                        scaleValue.current,
                        e.nativeEvent.touches.length < 2 && scaleValue.current <= 1,
                    );
                    return e.nativeEvent.touches.length < 2 && scaleValue.current <= 1;
                }}>
                <Image
                    source={source}
                    resizeMode="contain"
                    style={{width: '100%', height: '100%'}}
                />
            </View>
        </ImageZoom>
    );
};

export default ZoomImage;
