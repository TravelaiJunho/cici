
import Common from "../../util/Common";
import Storage from "../../util/Storage";

const translateMap = new Map();
var translateCount = null;
const translateHtmlArray = [];

var real_TranslageCount = 0;

const LanguageList = [
    "한국어", "English", "日本語", "中文(简体)", "中文(繁体)", "Bahasa Indonesia", "Bahasa Melayu", "Español", "Português", "ภาษาไทย"
];


const increasedTranslateCount  = async _ => {
    if(translateCount) {
        if(translateCount >= 30) {

        }else {
            translateCount += 1;

            Storage.setTranslateCount(translateCount);
        }
    }
}

const saveTranslateMap = _ => {
    // local 에 translateMap 을 저장합니다.
}

const loadTranslateMap = _ => {
    // local 에 저장된 translate 를 가져옵니다.
}

const getLanguageText = code => {
    if( code == null) return '';
    let index = convertLanguageIndex(code);
    return LanguageList[index];
}

const convertLanguageIndex = code => {
    let codeindex = -1;
    switch(code) {
        case "ko":
            codeindex = 0;
            break;
        case "en":
            codeindex = 1;
            break;
        case "ja":
            codeindex = 2;
            break;
        case "zh-CN":
            codeindex = 3;
            break;
        case "zh-TW":
            codeindex = 4;
            break;
        case "id":
            codeindex = 5;
            break;
        case "ms":
            codeindex = 6;
            break;
        case "es":
            codeindex = 7;
            break;
        case "pt":
            codeindex = 8;
            break;
        case "th":
            codeindex = 9;
            break;
    }

    return codeindex;
}

const convertLanguageCode = index => {
    let lngCode = "ko";
    switch(index) {
        case 0:
            lngCode = "ko";
            break;
        case 1:
            lngCode = "en";
            break;
        case 2:
            lngCode = "ja";
            break;
        case 3:
            lngCode = "zh-CN";
            break;
        case 4:
            lngCode = "zh-TW";
            break;
        case 5:
            lngCode = "id";
            break;
        case 6:
            lngCode = "ms";
            break;
        case 7:
            lngCode = "es";
            break;
        case 8:
            lngCode = "pt";
            break;
        case 9:
            lngCode = "th";
            break;
    }

    return lngCode;
}

const encodeQueryString = (params) => {
    let keys = Object.keys(params);
    keys.map((key) => {
        if (params[key] == null) {
            delete params[key];
        }
    })
    keys = Object.keys(params);
    return keys.length
        ? "?" + keys
        .map(key => encodeURIComponent(key)
            + "=" + encodeURI(params[key]))
        .join("&")
        : ""
}


// GOOGLE TRANSLATE
const spChar = [
    {regx:/\n/gi, key:"{{n}}", revalue: "\n", regx_re: /{{n}}/gi },
    {regx:/\~/gi, key:"{{1}}", revalue: "~", regx_re: /{{1\}}/gi },
    {regx:/\!/gi, key:"{{2}}", revalue: "!", regx_re: /{{2\}}/gi },
    {regx:/\@/gi, key:"{{3}}", revalue: "@", regx_re: /{{3\}}/gi },
    {regx:/\#/gi, key:"{{4}}", revalue: "#", regx_re: /{{4\}}/gi },
    {regx:/\$/gi, key:"{{5}}", revalue: "$", regx_re: /{{5\}}/gi },
    {regx:/\%/gi, key:"{{6}}", revalue: "%", regx_re: /{{6\}}/gi },
    {regx:/\^/gi, key:"{{7}}", revalue: "^", regx_re: /{{7\}}/gi },
    {regx:/\&/gi, key:"{{8}}", revalue: "&", regx_re: /{{8\}}/gi },
    {regx:/\*/gi, key:"{{9}}", revalue: "*", regx_re: /{{9\}}/gi },
]
const spChar_html = [
    {regx:/&nbsp;/gi, key:"{{1}}", revalue: "&nbsp;"},
    {regx:/&plusmn;/gi, key:"{{2}}", revalue: "&plusmn;"},
    {regx:/&ndash;/gi, key:"{{3}}", revalue: "&ndash;"},
    {regx:/&mdash;/gi, key:"{{4}}", revalue: "&mdash;"},
    {regx:/&euro;/gi, key:"{{5}}", revalue: "&euro;"},
    {regx:/&pound;/gi, key:"{{6}}", revalue: "&pound;"},
    {regx:/&yen;/gi, key:"{{7}}", revalue: "&yen;"},
    {regx:/&cent;/gi, key:"{{8}}", revalue: "&cent;"},
    {regx:/&copy;/gi, key:"{{9}}", revalue: "&copy;"},
    {regx:/&reg;/gi, key:"{{10}}", revalue: "&reg;"},
    {regx:/&trade;/gi, key:"{{11}}", revalue: "&trade;"},
    {regx:/&sup2;/gi, key:"{{12}}", revalue: "&sup2;"},
    {regx:/&sup3;/gi, key:"{{13}}", revalue: "&sup3;"},
    {regx:/&quot;/gi, key:"{{14}}", revalue: "&quot;"},
    {regx:/&amp;/gi, key:"{{15}}", revalue: "&amp;"},
    {regx:/&apos;/gi, key:"{{16}}", revalue: "&apos;"},
    {regx:/&lt;/gi, key:"{{17}}", revalue: "&lt;"},
    {regx:/&gt;/gi, key:"{{18}}", revalue: "&gt;"},
    {regx:/&lang;/gi, key:"{{19}}", revalue: "&lang;"},
    {regx:/&rang;/gi, key:"{{20}}", revalue: "&rang;"},
    {regx:/&loz;/gi, key:"{{21}}", revalue: "&loz;"},
    {regx:/&spades;/gi, key:"{{22}}", revalue: "&spades;"},
    {regx:/&clubs;/gi, key:"{{23}}", revalue: "&clubs;"},
    {regx:/&hearts;/gi, key:"{{24}}", revalue: "&hearts;"},
    {regx:/&dims;/gi, key:"{{25}}", revalue: "&dims;"},

    {regx:/&#160;/gi, key:"{{26}}", revalue: "&#160;"},
    {regx:/&#8729;/gi, key:"{{27}}", revalue: "&#8729;"},
    {regx:/&#177;/gi, key:"{{28}}", revalue: "&#177;"},
    {regx:/&#8211;/gi, key:"{{29}}", revalue: "&#8211;"},
    {regx:/&#8212;/gi, key:"{{30}}", revalue: "&#8212;"},
    {regx:/&#8364;/gi, key:"{{31}}", revalue: "&#8364;"},
    {regx:/&#163;/gi, key:"{{32}}", revalue: "&#163;"},
    {regx:/&#165;/gi, key:"{{33}}", revalue: "&#165;"},
    {regx:/&#162;/gi, key:"{{34}}", revalue: "&#162;"},
    {regx:/&#8361;/gi, key:"{{35}}", revalue: "&#8361;"},
    {regx:/&#169;/gi, key:"{{36}}", revalue: "&#169;"},
    {regx:/&#174;/gi, key:"{{37}}", revalue: "&#174;"},
    {regx:/&#8371;/gi, key:"{{38}}", revalue: "&#8371;"},
    {regx:/&#8382;/gi, key:"{{39}}", revalue: "&#8382;"},
    {regx:/&#178;/gi, key:"{{40}}", revalue: "&#178;"},
    {regx:/&#179;/gi, key:"{{41}}", revalue: "&#179;"},
    {regx:/&#33;/gi, key:"{{42}}", revalue: "&#33;"},
    {regx:/&#34;/gi, key:"{{43}}", revalue: "&#34;"},
    {regx:/&#35;/gi, key:"{{44}}", revalue: "&#35;"},
    {regx:/&#36;/gi, key:"{{45}}", revalue: "&#36;"},
    {regx:/&#37;/gi, key:"{{46}}", revalue: "&#37;"},
    {regx:/&#38;/gi, key:"{{47}}", revalue: "&#38;"},
    {regx:/&#39;/gi, key:"{{48}}", revalue: "&#39;"},
    {regx:/&#40;/gi, key:"{{49}}", revalue: "&#40;"},
    {regx:/&#41;/gi, key:"{{50}}", revalue: "&#41;"},
    {regx:/&#42;/gi, key:"{{51}}", revalue: "&#42;"},
    {regx:/&#43;/gi, key:"{{52}}", revalue: "&#43;"},
    {regx:/&#44;/gi, key:"{{53}}", revalue: "&#44;"},
    {regx:/&#45;/gi, key:"{{54}}", revalue: "&#45;"},
    {regx:/&#46;/gi, key:"{{55}}", revalue: "&#46;"},
    {regx:/&#47;/gi, key:"{{56}}", revalue: "&#47;"},
    {regx:/&#48;/gi, key:"{{57}}", revalue: "&#48;"},
    {regx:/&#49;/gi, key:"{{58}}", revalue: "&#49;"},
    {regx:/&#50;/gi, key:"{{59}}", revalue: "&#50;"},
    {regx:/&#51;/gi, key:"{{60}}", revalue: "&#51;"},
    {regx:/&#52;/gi, key:"{{61}}", revalue: "&#52;"},
    {regx:/&#53;/gi, key:"{{62}}", revalue: "&#53;"},
    {regx:/&#54;/gi, key:"{{63}}", revalue: "&#54;"},
    {regx:/&#55;/gi, key:"{{64}}", revalue: "&#55;"},
    {regx:/&#56;/gi, key:"{{65}}", revalue: "&#56;"},
    {regx:/&#57;/gi, key:"{{66}}", revalue: "&#57;"},
    {regx:/&#58;/gi, key:"{{67}}", revalue: "&#58;"},
    {regx:/&#59;/gi, key:"{{68}}", revalue: "&#59;"},
    {regx:/&#60;/gi, key:"{{69}}", revalue: "&#60;"},
    {regx:/&#61;/gi, key:"{{70}}", revalue: "&#61;"},
    {regx:/&#62;/gi, key:"{{71}}", revalue: "&#62;"},
    {regx:/&#63;/gi, key:"{{72}}", revalue: "&#63;"},
    {regx:/&#64;/gi, key:"{{73}}", revalue: "&#64;"},
    {regx:/&#91;/gi, key:"{{74}}", revalue: "&#91;"},
    {regx:/&#92;/gi, key:"{{75}}", revalue: "&#92;"},
    {regx:/&#93;/gi, key:"{{76}}", revalue: "&#93;"},
    {regx:/&#94;/gi, key:"{{77}}", revalue: "&#94;"},
    {regx:/&#95;/gi, key:"{{78}}", revalue: "&#95;"},
    {regx:/&#96;/gi, key:"{{79}}", revalue: "&#96;"},
    {regx:/&#123;/gi, key:"{{80}}", revalue: "&#123;"},
    {regx:/&#124;/gi, key:"{{81}}", revalue: "&#124;"},
    {regx:/&#125;/gi, key:"{{82}}", revalue: "&#125;"},
    {regx:/&#126;/gi, key:"{{83}}", revalue: "&#126;"},
    {regx:/&#9001;/gi, key:"{{84}}", revalue: "&#9001;"},
    {regx:/&#9002;/gi, key:"{{85}}", revalue: "&#9002;"},
    {regx:/&#9674;/gi, key:"{{86}}", revalue: "&#9674;"},
    {regx:/&#9824;/gi, key:"{{87}}", revalue: "&#9824;"},
    {regx:/&#9827;/gi, key:"{{88}}", revalue: "&#9827;"},
    {regx:/&#9829;/gi, key:"{{89}}", revalue: "&#9829;"},
    {regx:/&#9830;/gi, key:"{{90}}", revalue: "&#9830;"},
]


const replaceSpChar = (text, reverse = false) => {
    spChar.map(sp=>{
        if(reverse) {
            text = text.replace(sp.regx_re, sp.revalue);
        }else{
            text = text.replace(sp.regx, sp.key);
        }
    })
    return text;
}


const replaceHtmlSpChar = (html, reverse = false) => {
    spChar_html.map(sp=>{
        if(reverse) {
            html = html.replace(sp.key, sp.revalue);
        }else{
            html = html.replace(sp.regx, sp.key);
        }
    })
    return html;
}


const Translate = (text, target, callback=null) => {
    // Map 에서 검색
    if(typeof text !== 'string') {
        alert(text)
        return text;
    }

    let findTarget = translateHtmlArray.find(ftarget => {
        return ftarget.target == target;
    })
    if(findTarget) {
        let findText = findTarget.data.find(fText=>{
            return fText.ori == text;
        })
        if(findText){
            setTimeout(()=>{
                callback && callback( findText.trans);
            }, 100)

            return;
        }
    }

    // if(Common.isEmpty(text)) return text;
    // let mapTrans = null;
    // if(translateMap.has(text)) {
    //     let mapTrans = translateMap.get(text);
    //     if(mapTrans[target]) {
    //         Common.debug("get Map : ", mapTrans[target]);
    //         setTimeout(()=>{
    //             callback && callback( mapTrans[target] )
    //         },100)
    //         return;
    //     }
    // }

    let filter_text = replaceSpChar(text);

    let google_apikey = "AIzaSyCq5iPpoucKBPegSOHh7eEWtkVyP9a62sM";
    let query = encodeQueryString({
        key:google_apikey,
        q: [filter_text],
        target:target ? target : "en",
        format:"text"
    })
    fetch(`https://translation.googleapis.com/language/translate/v2` + query,
        {
            method: 'POST',
            redirect: 'follow'
        }
    ).then(response => response.json())
        .then(result => {
            real_TranslageCount += 1;
            console.warn("Translate : ", real_TranslageCount)
            if(result && !Common.isEmpty(result.data) && !Common.isEmpty(result.data.translations) ) {
                if(result.data.translations.length!=0 && !Common.isEmpty(result.data.translations[0].translatedText)) {
                    let transText = result.data.translations[0].translatedText;

                    transText = replaceSpChar(transText, true);

                    if(findTarget) {
                        findTarget.data.push({
                            ori: text,
                            trans: transText
                        })
                    }else{
                        translateHtmlArray.push({
                            target: target,
                            data: [
                                {
                                    ori: text,
                                    trans: transText
                                }
                            ]
                        })
                    }

                    // if(mapTrans) {
                    //     mapTrans[target] = transText;
                    // }else {
                    //     let obj = {}
                    //     obj[target] = transText;
                    //     translateMap.set(filter_text,obj)
                    // }
                    callback && callback(transText)
                }
            }
        })
        .catch(error => console.log('error', error));
}



const TranslateHtml = (text, target, callback=null) => {
    // Map 에서 검색
    if(Common.isEmpty(text)) return text;

    let findTarget = translateHtmlArray.find(ftarget => {
        return ftarget.target == target;
    })
    if(findTarget) {
        let findText = findTarget.data.find(fText=>{
            return fText.ori == text;
        })
        if(findText){
            callback && callback( findText.trans);
            return;
        }
    }

    // GOOGLE API KEY 만들어야함.

    let filter_text = replaceHtmlSpChar(text);
    filter_text = replaceSpChar(filter_text);
    let google_apikey = "AIzaSyCq5iPpoucKBPegSOHh7eEWtkVyP9a62sM";
    let query = encodeQueryString({
        key:google_apikey,
        q: [filter_text],
        target:target ? target : "en",
        format:"html"
    })
    fetch(`https://translation.googleapis.com/language/translate/v2` + query,
        {
            method: 'POST',
            redirect: 'follow'
        }
    ).then(response => response.json())
        .then(result => {
            if(result && !Common.isEmpty(result.data) && !Common.isEmpty(result.data.translations) ) {
                if(result.data.translations.length!=0 && !Common.isEmpty(result.data.translations[0].translatedText)) {
                    real_TranslageCount += 1;
                    console.warn("Translate : ", real_TranslageCount)
                    let transText = result.data.translations[0].translatedText;

                    transText = replaceHtmlSpChar(transText,true)
                    transText = replaceSpChar(transText, true);


                    if(findTarget) {
                        findTarget.data.push({
                            ori: text,
                            trans: transText
                        })
                    }else{
                        translateHtmlArray.push({
                            target: target,
                            data: [
                                {
                                    ori: text,
                                    trans: transText
                                }
                            ]
                        })
                    }

                    callback && callback(transText)
                }
            }
        })
        .catch(error => console.log('error', error));
}

export {
    Translate, TranslateHtml,
    LanguageList, convertLanguageCode, convertLanguageIndex,
    getLanguageText
}
