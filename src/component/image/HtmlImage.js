////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {Image, TouchableOpacity} from "react-native";
import FastImage from 'react-native-fast-image'
////////////////////
// Local
import BaseComponent from  "./../_base/BaseComponent";
import Layout from "../../util/Layout";
import {navRef} from "../../navigation/RootNavigation";
import Screen from "../../util/type/Screen";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class HtmlImage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            width:0,
            height:0,
        }
    }
    componentDidMount() {
        super.componentDidMount();

        Image.getSize(this.props.source.uri, (width,height)=> {
            let r_width = Layout.UISize(width);
            let r_height = height;
            if( this.props.contentWidth < Layout.UISize(width)) {
                r_width = this.props.contentWidth;
                r_height = (r_width / Layout.UISize(width)) * Layout.UISize(height);
            }

            this.setState({
                width: r_width,
                height: r_height,
            })
        }, ()=>{

        })
    }

    ////////////////////
    // RENDER
    render() {
        const {width, height} = this.state;
        // return <Image {...this.props}/>
        return (
            <TouchableOpacity
                onPress={()=>{
                    navRef.current.navigate(Screen.SCREEN_ACTIVITY.IMAGE_VIEWER, {
                        source: this.props.source
                    });
                }}
            >
                <Image style={[{width:width, height:height}]}  {...this.props}/>
            </TouchableOpacity>
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

export default HtmlImage;
