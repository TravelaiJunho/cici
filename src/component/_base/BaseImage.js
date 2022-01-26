////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import FastImage from "react-native-fast-image";
////////////////////
// Local
import BaseComponent from "./BaseComponent";
import Common from "../../util/Common";
import { PropsType } from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type";
import PropTypes from "prop-types";
import { SUB_ACCOUNT, USER } from "../../../assets";
import item from "react-native-calendars/src/calendar-list/item";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * FastImage 를 Wrapping 한 Class
 * @extends {BaseComponent}
 */

function BaseImage({ emptyImage }) {
  const [errorImage, setErrorImage] = useState(Common.isEmpty(emptyImage));
  useEffect(() => {
    setErrorImage(Common.isEmpty(emptyImage));
  }, [emptyImage]);
  ////////////////////
  // RENDER
  /**
   * Main Renderer
   * @returns {JSX.Element}
   */
  // return <Image {...this.props}/>
  if (errorImage == null) {
    // alert(BaseImage.emptyImage);
    return <Image source={SUB_ACCOUNT} />;
  } else {
    return <FastImage source={errorImage} />;
  }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

BaseImage.defaultProps = {
  emptyImage: null,
};

BaseImage.prototype = {
  emptyImage: PropTypes.string,
};

export default BaseImage;
