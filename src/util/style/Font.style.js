import {StyleSheet} from 'react-native';
import {colors} from '../Color';
import Layout from "../Layout";

const font = StyleSheet.create({
    ////////////////////
    // Text
    error: {
        color: colors.orange
    },
    ////////////////////
    // Guide
    HeadlineCntWhiteLH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        // lineHeight: 22,
        letterSpacing: 0,
        color: colors.white
    },
    HeadlineNaviWhiteCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    MemberHeadlineFullCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.yellow
    },
    MemberHeadlineDanityCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    MemberHeadlineAssociateCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.grayLight
    },
    MemberHeadlineArtistCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.purple
    },
    MemberHeadlineAdministratorCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.mint
    },
    HeadlineCntWhiteCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(16),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    CntTitleMintCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.mint
    },
    CntTitleOrangeCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        // lineHeight: 20,
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    CatOrangeCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    CntTitleWhiteLH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        // lineHeight: 20,
        letterSpacing: 0,
        color: colors.white
    },
    CntTitleWhiteCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        // lineHeight: 20,
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    CntTitleOrangeLH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        // lineHeight: 20,
        letterSpacing: 0,
        color: colors.orange
    },
    CntTitleGrayDkLH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.gray
    },
    CntTitleGrayDkCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: -0.5,
        textAlign: "center",
        color: colors.gray
    },
    CntOffGrayLight: {
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.COLOR_CNT_OFF_GRAY_LIGHT
    },
    CaptionWhiteLH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        // lineHeight: 18,
        letterSpacing: 0,
        color: colors.white
    },
    BtnWhiteCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    BtnOrangeCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    BtnGrayDkCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.grayDark
    },
    CntTitleWhiteCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "bold",
        fontStyle: "normal",
        // lineHeight: 22,
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    CntOrangeCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    CatGrayDkCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.gray
    },
    BtnOnWhite16: {
        fontSize: Layout.UISize(16),
        fontWeight: "normal",
        fontStyle: "normal",
        //lineHeight: 22,
        letterSpacing: 0,
        color: colors.COLOR_BTN_ON_WHITE
    },
    BtnOnWhite14: {
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        //lineHeight: 20,
        letterSpacing: 0,
        color: colors.COLOR_BTN_ON_WHITE
    },
    BtnOnWhite13: {
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        //lineHeight: 20,
        letterSpacing: 0,
        color: colors.COLOR_BTN_ON_WHITE
    },
    BtnOnWhite12: {
        fontSize: Layout.UISize(12),
        fontWeight: "normal",
        fontStyle: "normal",
        //lineHeight: 20,
        letterSpacing: 0,
        color: colors.COLOR_BTN_ON_WHITE
    },
    BtnRustOrange: {
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.RUSTY_ORANGE
    },
    BtnWhiteCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    BtnGrayCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.grayLight
    },
    CntNoticeWhiteLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        // lineHeight: 20,
        letterSpacing: 0,
        color: colors.white
    },
    CntWhiteCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    CntNoticeWhiteCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        // lineHeight: 22,
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    CntWhiteLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.white
    },
    CntGrayLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.grayLight
    },
    CntGrayDkLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.gray
    },
    CntGrayDkCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.gray
    },
    BtnOrangeRN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: colors.orange
    },
    BtnMintRN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(14),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: colors.mint
    },
    Member13DanityCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    Member13AssociasteCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.grayLight
    },
    Member13FullCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.yellow
    },
    Cnt13OrangeCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    Cnt13OrangeLB: {
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.orange
    },
    Cnt13MintCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.mint
    },
    Cnt13GrayCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.grayLight
    },
    Btn13OrangeLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.orange
    },
    Cnt13WhiteCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    Cnt13WhiteLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: Layout.UISize(18),
        letterSpacing: 0,
        color: colors.white
    },
    Cnt13GrayLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.grayLight
    },
    Cnt13GrayDkCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.gray
    },
    Cnt13GrayCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.grayLight
    },
    Cnt13GrayDkLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.gray
    },
    Cnt13DayRedCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ff0000"
    },
    Btn13MintRN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: colors.mint
    },
    Btn13MintLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.mint
    },
    SubHashOrangeLT: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "300",
        fontStyle: "normal",
        // lineHeight: 16,
        letterSpacing: 0,
        color: "#ff9080"
    },
    CntNoticeOrangeRT: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: colors.orange
    },
    Cnt13WhiteLT: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "300",
        fontStyle: "normal",
        // lineHeight: 20,
        letterSpacing: 0,
        color: colors.white
    },
    CntNoticeOrangeLT: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(13),
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.orange
    },
    SubCntGrayDkLB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(12),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.gray
    },
    SubCntGrayCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(12),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.grayLight
    },
    SubCntOrangeCN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(12),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.orange
    },
    SubCntOrangeLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(12),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.orange
    },
    SubCntGrayRN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(12),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: colors.grayLight
    },
    SubCntGrayLN: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(12),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.grayLight
    },
    SubCntWhiteLT: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(12),
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        color: colors.white
    },
    CaptionWhiteCH: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(10),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    CaptionGrayCH: {
        fontSize: Layout.UISize(10),
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.gray
    },
    TabOnWhiteCB: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(9),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
    TabOffWhiteCT: {
        // fontFamily: " SDGothicNeo",
        fontSize: Layout.UISize(9),
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: colors.white
    },
});

export default font;
