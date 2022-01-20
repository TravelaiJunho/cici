////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Text} from "react-native";
////////////////////
// Local
import BaseComponent from "./BaseComponent";
import {connect} from "react-redux";
import FontStyle from "../../util/style/Font.style";
import PropTypes from "prop-types";
import {Translate} from "../../data/http/Translate";
import  Common from "../../util/Common"
////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * 구글 번역 기능을 쉽게 사용하기 위해 만든 TextComponent
 * @extends {BaseComponent}
 */
class BaseTransText extends BaseComponent {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            text:props.children
        }
    }

    /**
     * component 시작시 autoTranslate 호출
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        super.componentDidMount();
        this.autoTranslate(this.props.autoTranslate);
    }

    ////////////////////
    // OVERRIDE
    /**
     * prop, state update 관리
     * @param nextProps
     * @param nextState
     * @param nextContext
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.autoTranslate !== this.props.autoTranslate) {
            this.autoTranslate(nextProps.autoTranslate);
            return true;
        }
        if(nextState.text != this.state.text) {
            return true;
        }
        return false;
    }

    /**
     * 자동 번역시 Translate 호출 state의 text를 변경해준다.
     * @param trans
     */
    autoTranslate = (trans) => {
        if(trans){
            if(!Common.isEmpty(this.props.children)) {
                Translate(this.props.children, this.props.translateLanguage, (result)=>{
                    this.setState({
                        text:result,
                    })
                })
            }

        }else{

        }
        this.setState({
            text:this.props.children,
        })
    }

    ////////////////////
    // RENDER
    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        const {text} = this.state;
        return <Text {...this.props}>{text}</Text>
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

BaseTransText.defaultProps = {
    autoTranslate: false,
};

BaseTransText.propTypes = {
    autoTranslate: PropTypes.bool
};
////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        translateLanguage: state.translate.get('target'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(BaseTransText);
