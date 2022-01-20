////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Image} from "react-native";
import FastImage from 'react-native-fast-image';
import ImageModal from 'react-native-image-modal';
////////////////////
// Local
import BaseComponent from "./BaseComponent";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * Modal 로 Image를 보여주는 Component
 * @extends {BaseComponent}
 */
class BaseModalImage extends BaseComponent {

    ////////////////////
    // RENDER
    /**
     * Main Renderer
     * @returns {JSX.Element}
     */
    render() {
        // return <Image {...this.props}/>
        return(
                <ImageModal
                    {...this.props}
                    swipeToDismiss={true}
                    imageBackgroundColor="#000000"
                />

            )

    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

// BaseImage.defaultProps = {
// };
//
// BaseImage.propTypes = {
// };

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseModalImage;
