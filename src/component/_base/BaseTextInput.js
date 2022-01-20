////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {TextInput} from "react-native";
////////////////////
// Local
import BaseComponent from "./BaseComponent";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * RN TextInput 을 Wrapping 한 Class
 * setFocus, setBlur 로 키보드 포커스 관리
 * @extends {BaseComponent}
 */
class BaseTextInput extends BaseComponent {

    /**
     * TextInput Ref 로 focus() 호출
     * @param _
     */
    setFocus = _ => this.input.focus();
    /**
     * TextInput Ref 로 blur() 호출
     * @param _
     */
    setBlur = _ => this.input.blur();
    ////////////////////
    // RENDER
    render() {
        return <TextInput {...this.props}
                          ref={ref => this.input = ref}/>
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseTextInput;
