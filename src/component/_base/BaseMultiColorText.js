////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Text, View} from "react-native";
////////////////////
// Local
import BaseComponent from "./BaseComponent";

////////////////////////////////////////
// CLASS
////////////////////////////////////////
/**
 * 문자열에 컬러 tag를 넣어서 font 색상을 지정해서 그려주는 component
 * children으로 Text만 들어갈 수 있다.
 * @example
 * [[C-#dd4e13 - 색 변경  Code[[C-none - 원래 색상으로 변경
 * @extends {BaseComponent}
 */
class BaseMultiColorText extends BaseComponent {
    /**
     * 생성자
     * @param props
     */
    constructor(props) {
        super(props);
        let multiText = this.splitMultiColor(props.children);
        this.state = {
            text: props.children,
            multiText: multiText,
        }
    }

    /**
     * 문자열을 "[[-C" 로 구분하여 배열을 만들어준다.
     * @param text
     * @returns {*[]}
     */
    splitMultiColor = (text) => {
        const {style} = this.props;
        // 상자 안에 있는 설명서에 붙여진[[C-#dd4e13 Serial Code[[C-none 12자리를 하단에 입력해 주세요.
        let split = text.split('[[');
        let split_text = [];
        let tempColor = null;
        split.map(item => {
            if (item.includes('C:')) {
                let tmp = item.replace("C:", '');
                tmp = tmp.split('--');

                if (tmp[0] === 'none') {
                    tempColor = style.color;
                } else {
                    tempColor = tmp[0];
                }
                split_text.push({color: tempColor, text: tmp[1]})
                tempColor = null;
            } else {
                split_text.push({color: style.color, text: item})
            }
        })
        return split_text;
    }
    ////////////////////
    // RENDER
    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        const {text, multiText} = this.state;
        const {style} = this.props;
        // <Text style={style} {...this.props}>{text}</Text>
        return (
            <Text
                style={{
                    width:"100%",
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexWrap:'wrap'
                }}
            >
                {
                    multiText.map(item => {
                        return (
                            <Text {...this.props} style={[style, {color: item.color}]} >{item.text}</Text>
                        )
                    })
                }
            </Text>
        )
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default BaseMultiColorText;
