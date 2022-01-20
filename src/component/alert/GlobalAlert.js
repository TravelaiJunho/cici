////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
// Local
import RefManager from "../../util/RefManager";
import FontStyle from "../../util/style/Font.style";
// Component
import BaseComponent from '../_base/BaseComponent';
import BaseText from "../_base/BaseText";
import ConfirmAlert from "./_base/ConfirmAlert";
import ConfirmCancelAlert from "./_base/ConfirmCancelAlert";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class GlobalAlert extends BaseComponent {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            isVisible: false,
            message: '',
            callback: null,
            cancel_callback: null,
        }
    }

    ////////////////////
    // OVERRIDE
    componentDidMount() {
        RefManager.register(this, GLOBAL.ALERT);
    }

    componentWillUnmount() {
        RefManager.unregister(this);
    }

    ////////////////////
    // FUNCTION
    setVisible = (isShow, message = '', callback = null,) => {
        if (this.state.isVisible !== isShow) {
            this.setState({
                type: 0,
                isVisible: isShow,
                message: message,
                callback: callback,
                cancel_callback: null,
            });
        }
    }

    showConfirmCancelAlert = (message ='', confirm_callback = null, cancel_callback = null) => {
        if(!this.state.isVisible) {
            this.setState({
                type: 1,
                isVisible: true,
                message: message,
                callback: confirm_callback,
                cancel_callback: cancel_callback,
            })
        }
    }

    close = _ => {
        const {callback} = this.state;
        callback && callback();
        this.setVisible(false)
    }

    ////////////////////
    // RENDER
    render() {
        const {isVisible, message, type, callback, cancel_callback} = this.state;

        if(type == 0) {
            return (
                <ConfirmAlert isVisible={isVisible}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setState({
                                      isVisible: false
                                  })
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{message}</BaseText>
                </ConfirmAlert>
            )
        }

        return (
            <ConfirmCancelAlert isVisible={isVisible}
                                onConfirm={_ => {
                                    //
                                    callback && callback()
                                    this.setState({isVisible: false})
                                }}
                                onCancel={_ => {
                                    cancel_callback && cancel_callback()
                                    this.setState({isVisible: false})
                                }}>
                <BaseText style={FontStyle.CntNoticeWhiteCN}>{message}</BaseText>
            </ConfirmCancelAlert>
        )
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default GlobalAlert;
