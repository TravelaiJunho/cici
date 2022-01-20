////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Image} from "react-native";
import FastImage from 'react-native-fast-image'
////////////////////
// Local
import BaseComponent from "./BaseComponent";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * FastImage 를 Wrapping 한 Class
 * @extends {BaseComponent}
 */
class BaseImage extends BaseComponent {

    ////////////////////
    // RENDER
    /**
     * Main Renderer
     * @returns {JSX.Element}
     */
    render() {
        // return <Image {...this.props}/>
        return <FastImage {...this.props}/>
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseImage;
