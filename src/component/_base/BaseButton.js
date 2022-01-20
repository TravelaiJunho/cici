////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TouchableOpacity} from "react-native";
import {Button} from "react-native-elements";
////////////////////
// Local
import BaseComponent from "./BaseComponent";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * RN Button 을 Wrapping 한 Class
 * @extends {BaseComponent}
 */
class BaseButton extends BaseComponent {

    ////////////////////
    // RENDER
    /**
     * Button => TouchableComponent = TouchableOpacity 로 기본 설정
     */
    render() {
        return <Button {...this.props}
                       TouchableComponent={TouchableOpacity}/>
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseButton;
