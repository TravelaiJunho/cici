////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import PropTypes from "prop-types";
import WebView from "react-native-webview";
import HTML from "react-native-render-html";
import table, { IGNORED_TAGS } from "@native-html/table-plugin";
import iframe from "@native-html/iframe-plugin";
////////////////////
// Local
import BaseComponent from "../_base/BaseComponent";
import FontStyle from "../../util/style/Font.style";
import Layout from "../../util/Layout";
import { colors } from "../../util/Color";
import { Dimensions, Image } from "react-native";
import HtmlImage from "../image/HtmlImage";
import { connect } from "react-redux";
import Common from "../../util/Common";
import { Translate, TranslateHtml } from "../../data/http/Translate";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Html extends BaseComponent {
  borderColor = "#b3b3b3";

  tableStyle = {
    fitContainerWidth: true,
    fontSizePx: 14,
    // Border
    outerBorderWidthPx: 1,
    rowsBorderWidthPx: 1,
    columnsBorderWidthPx: 1,
    outerBorderColor: this.borderColor,
    tdBorderColor: this.borderColor,
    thBorderColor: this.borderColor,
    // Header
    thEvenBackground: colors.background,
    thOddBackground: colors.background,
    thEvenColor: colors.white,
    thOddColor: colors.white,
    // Row
    trEvenBackground: colors.background,
    trOddBackground: colors.background,
    trEvenColor: colors.white,
    trOddColor: colors.white,
  };

  constructor(props) {
    super(props);
    this.state = {
      trans_content: props.content,
    };
  }

  setContent = (content) => {
    this.setState({
      trans_content: content,
    });
  };

  translateChange = (nextProps) => {
    if (nextProps.autoTranslate) {
      if (Common.isEmpty(nextProps.content)) {
        this.setContent(nextProps.content);
      } else {
        this.autoTranslate(nextProps.content);
      }
    } else {
      this.setContent(nextProps.content);
    }
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      Common.shouldUpdate(this.props, nextProps, [
        "widthPadding",
        "enableImageView",
        "translateLanguage",
      ])
    )
      return true;
    if (Common.shouldUpdate(this.props, nextProps, ["content"])) {
      //this.setContent(nextProps.content)
      this.translateChange(nextProps);
      return true;
    }
    if (Common.shouldUpdate(this.state, nextState, ["trans_content"]))
      return true;

    if (Common.shouldUpdate(this.props, nextProps, ["autoTranslate"])) {
      this.translateChange(nextProps);
      return true;
    }

    return false;
  }

  ////////////////////
  // FUNCTION
  autoTranslate = (content) => {
    TranslateHtml(content, this.props.translateLanguage, (result) => {
      this.setContent(result);
    });
  };
  ////////////////////
  // RENDER
  render() {
    const { trans_content } = this.state;
    const { content, widthPadding, enableImageView } = this.props;
    let contentwidth = Layout.DEVICE_WIDTH - Layout.UISize(widthPadding) * 2;
    const defaultRenderer = enableImageView
      ? {
          renderers: {
            img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
              return (
                <HtmlImage
                  contentWidth={passProps.contentWidth}
                  key={passProps.key}
                  resizeMode={"contain"}
                  source={{ uri: htmlAttribs.src }}
                />
              );
            },
          },
        }
      : null;

    return (
      <HTML
        WebView={WebView}
        renderers={{ table, iframe }}
        tagsStyles={{ p: { margin: 0 } }}
        ignoredTags={IGNORED_TAGS}
        baseFontStyle={FontStyle.Cnt13WhiteLT}
        renderersProps={{
          // iframe: {webViewProps: {allowsFullscreenVideo: true}}
          table: {
            animationDuration: 0,
            animationType: "none",
            tableStyleSpecs: this.tableStyle,
          },
        }}
        contentWidth={contentwidth}
        {...defaultRenderer}
        source={{ html: trans_content }}
      />
    );
  }
}

////////////////////////////////////////
// PROPTYPES
////////////////////////////////////////

Html.defaultProps = {
  content: "",
  widthPadding: 20,
  enableImageView: false,
  autoTranslate: false,
};

Html.propTypes = {
  content: PropTypes.string,
  widthPadding: PropTypes.number,
  enableImageView: PropTypes.bool,
  autoTranslate: PropTypes.bool,
};

////////////////////////////////////////
// REDUX
////////////////////////////////////////

const mapStateToProps = (state) => {
  return {
    translateLanguage: state.translate.get("target"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

////////////////////////////////////////
// EXPORT
////////////////////////////////////////

export default connect(mapStateToProps, mapDispatchToProps)(Html);
