////////////////////////////////////////

import {colors} from "./Color";
import Common from "./Common";

////////////////////////////////////////

const getImageOptions = _ => {
    return {
        mediaType: "photo",
        forceJpg: true,
        width: 1024,
        height: 1024,
        // Crop
        cropping: true,
        cropperStatusBarColor: colors.background,
    }
}

const getDefaultImageOptions = _ => {
    let option = {
        mediaType: "photo",
        forceJpg: true,
        compressImageQuality: 0.8,
        // Crop
        cropping: true,
        freeStyleCropEnabled: true,
        cropperStatusBarColor: colors.background,
        avoidEmptySpaceAroundImage: false,
    }
    if (Common.checkIOS()) {
        option.width = 1024;
        option.height = 1024;
    }
    return option;
}

const getCircleImageOptions = _ => {
    return {
        mediaType: "photo",
        width: 1024,
        height: 1024,
        forceJpg: true,
        compressImageQuality: 1,
        // Crop
        cropping: true,
        cropperCircleOverlay: true,
        cropperStatusBarColor: colors.background,
    }
    // return {
    //     mediaType: 'photo',
    //     cropping: true,
    //     includeBase64: true,
    //     cropperCircleOverlay: true,
    //     width: 256,
    //     height: 256,
    //     forceJpg: true,
    // }
}

////////////////////////////////////////
export {
    getImageOptions,
    getDefaultImageOptions,
    getCircleImageOptions,
};
