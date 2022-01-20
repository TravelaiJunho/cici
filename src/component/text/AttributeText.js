////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Linking} from "react-native";
import PropTypes from "prop-types";
import ParsedText from "react-native-parsed-text";
////////////////////
// Local
import FontStyle from "../../util/style/Font.style";
// Component
import BaseComponent from "../_base/BaseComponent";
import Common from "../../util/Common";
import {Translate} from "../../data/http/Translate";
import {connect} from "react-redux";
// import ParsedText from "../_common/parse/ParsedText";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class AttributeText extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            text:props.text
        }
    }

    async componentDidMount() {
        super.componentDidMount();
        this.autoTranslate(this.props.autoTranslate);
    }

    ////////////////////
    // OVERRIDE
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.autoTranslate !== this.props.autoTranslate) {
            this.autoTranslate(nextProps.autoTranslate);
            return true;
        }
        if(nextState.text != this.state.text) {
            return true;
        }
        if(nextProps.text != this.props.text) {
            this.setState({
                text: nextProps.text
            })
            return true;
        }
        return false;
    }


    ////////////////////
    // FUNCTION

    autoTranslate = (trans) => {
        if(trans){
            Translate(this.props.text, this.props.translateLanguage, (result)=>{
                this.setState({
                    text:result,
                })
            })
        }else{

        }
        this.setState({
            text:this.props.text,
        })
    }

    getParseList = _ => {
        return [
            {
                type: 'url',
                onPress: this.onHandleUrl,
                style: FontStyle.Btn13MintLN
                // style: {
                //     color: colors.mint,
                //     // textDecorationLine: 'underline'
                // }
            },
        ];
    }

    checkUrl = url => {
        return url.match(/^[a-zA-Z]+:\/\//);
    }

    onHandleUrl = url => {
        Linking
            .openURL(this.checkUrl(url) ? url : 'http://' + url)
            .then(r => Common.debug(r));
    }

    ////////////////////
    // RENDER
    render() {
        const {textStyle} = this.props;
        const {text} = this.state;
        return <ParsedText style={textStyle}
                           parse={this.getParseList()}>{text}</ParsedText>;
    }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

AttributeText.defaultProps = {
    textStyle: FontStyle.Cnt13WhiteLN,
    text: '',
    autoTranslate: false,
};

AttributeText.propTypes = {
    textStyle: PropTypes.objectOf(PropTypes.any),
    text: PropTypes.string.isRequired,
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

//export default AttributeText;
export default connect(mapStateToProps, mapDispatchToProps)(AttributeText);
