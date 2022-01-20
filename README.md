# Vision VR

Vision VR (Daniel)
***
## 앱 실행

### package module 다운로드

<pre><code>npm install
cd ios
pod install</code></pre>

### 시물레이터 실행

<pre><code>npx react-native run-ios
npx react-native run-android</code></pre>

>IOS DEVICE 실행인 경우 --device "[device_name]"
 
## Source path 정리

+ component
+ data
  + _base : api 설정
  + http : api post,get 
  + redux : redux 
+ module : native 기능 사용
+ navigation : 네비게이션 설정
+ screen
    - _base
    - _style : style 모음
    - activity : single Navigation Container 모음
    - auth : 인증 관련 Container
    - community : 커뮤니티 탭 관련 Container
    - home : 홈 관련 Container
    - membership : 맴버쉽 관련 Container
    - more : More 관련 Container
    - notice : 알림 관련 Container
    - splash : Splash 화면
    - tester : 컴포넌트 테스트 Container
+ util
  + banned : banned 값 모음
  + style : 기본 style 모음
  + type : 상수 모음
  + translate : 현지화 Text 

***
 
<div markdown="util">

<pre>앱에서 자주사용되는 함수나 정의의 모음</pre>

## Constants
> src/util/Constants.js
<table>
<th>상수</th>
<th>설명</th>
<th>기본값</th>
<tr>
<td>PACKAGE</td>
<td>앱 패키지 이름</td>
<td>com.konnectent.kd</td>
</tr>
<tr>
<td>ANDROID_PACKAGE</td>
<td>안드로이드 패키지 이름</td>
<td>com.konnectent.kd</td>
</tr>
<tr>
<td>IOS_APP_ID</td><td>IOS 앱 아이디</td><td>1555431197</td>
</tr>
<tr>
<td>INFO_EMAIL</td><td>문의 이메일 주소</td><td>fan@konnectent.com</td>
</tr>
<tr>
<td>THUMBNAIL_LEVEL</td><td>썸네일 이미지 레벨</td><td> 레벨은 0~4 단계 기본 => {FEED: 3, GRID: 3, AUDIO:3}</td>
</tr>
<tr>
<td> FEED_CONTENTS_LINE</td><td>Feed 컨텐츠 텍스트 줄 길이</td><td>4</td>
</tr>
<tr>
<td>API</td>
<td>서버 주소, youtube 키</td>
<td>
<pre>코드참조</pre>
</td>
</tr>
<tr>
<td>THRESHOLD_SEARCH_RECENT_RECORD</td><td>이전 검색 기록 갯수</td><td>20</td>
</tr>
<tr>
<td>ADD_IMAGE_MAX</td><td>이미지 추가 한계값</td><td>5</td>
</tr>
<tr>
<td>TRANSLATE_ENGLISH</td><td>언어코드</td><td>en</td>
</tr>
<tr>
<td>TRANSLATE_KOREAN</td><td>언어코드</td><td>ko</td>
</tr>
<tr>
<td>KOREAN</td><td>언어 표시</td><td>한국어</td>
</tr>
<tr>
<td>ENGLISH</td><td>언어 표시</td><td>English</td>
</tr>
<tr>
<td>INJECTED_JS</td><td>HTML 뷰어에 사용하는 Injected_js</td>
<td>
<pre>코드참조</pre>
</td>
</tr>
<tr>
<td>MAX_TRANSLATE_COUNT</td><td>자동번역 제한 갯수</td><td>30</td>
</tr>
<tr>
<td>LIMIT_TRANSLATE_DAY</td><td>자동번역 제한 해제 날짜</td><td>1</td>
</tr>
<tr>
<td>DOWNLOAD_OPTION</td><td>다운로드 기본옵션</td><td><pre>ALL:1, WIFI_ONLY:0</pre></td>
</tr>
<tr>
<td>THIRD_DEV</td><td>3차 개발 디파인</td><td>true</td>
</tr>
</table>    

***

## Banned

> src/util/banned/BannedContains.js
>
> src/util/banned/BannedEquals.js
> 
> <pre>banned 목록</pre>

***

## style

> src/util/style/Base.style.js
>
> src/util/style/Font.style.js
> 
> <pre>기본 스타일 정의</pre>

***

## type

> src/util/type/AnswerType.js
>
> src/util/type/Board.js
>
> src/util/type/Event.js
>
> src/util/type/Input.js
>
> src/util/type/Media.js
>
> src/util/type/Push.js
>
> src/util/type/Schedule.js
>
> src/util/type/Screen.js
>
> src/util/type/Service.js
>
> src/util/type/Tag.js
>
> src/util/type/Token.js
>
> src/util/type/User.js
>
> src/util/type/VR.js
>
> src/util/type/Writer.js
> 
> <pre>각 스크린에 사용되는 Type 정의</pre>

***

## CustomIcon

> src/util/CustomIcon.js
> 
> <pre>앱에 사용할 커스텀 아이콘을 등록</pre>

***

## Localize

> src/util/Localize.js
> 
> <pre>
  한국어, 영어 테이블로 나누어져 있다.
</pre>

***

## Color

> src/util/Color.js
> 
> <pre>디자인에서 지정한 색상</pre>

***

## Common

> src/util/Common.js
> 
> <pre>자주사용하는 함수 모음</pre>

***

## Detail

> src/util/Detail.js
> 
> <pre>post, notice, vrProduct, event, media 상세 페이지 연결 함수 정의</pre>

***

## Info

> src/util/Info.js
> 
> <pre>USER, PUSH, LANGUAGE 정보를 저장</pre>

## Layout

> src/util/Layout.js
> 
> <pre>
앱 화면 사이즈, statusBar 높이, bottomBar 높이를 저장
화면의 사이즈에 관련된 함수 모음
</pre>

## Notification

> src/util/Notification.js
> 
> <pre>알림 설정, 액션 정의 뱃지 설정</pre>

***

## Options

> src/util/Options.js
> 
> <pre>앨범 사진을 가져올때 사용하는 이미지 옵션을 정의</pre>

***

## Permission

> src/util/Permission.js
> 
> <pre>퍼미션 요청 관련 함수</pre>

***

## RefManager

> src/util/RefManager.js
> 
> <pre>React Ref를 Global 로 사용</pre>

***

## Storage

> src/util/Storage.js
> 
> <pre>앱 로컬에 저장되는 함수 모음</pre>

***

## BackgroundDownloader

> src/util/BackgroundDownloader.js
> 
> <pre>다운로드 관련 함수</pre>

</div> 

***
 
<div markdown="data">

<pre>API, 와 REDUX 로 데이터 관리</pre>

***

## _base

> src/data/_base/API.js
> 
> <pre>API URL 정의</pre>
>
> src/data/_base/BaseAxios.js
> 
> <pre>기본적인 호출 함수 정의</pre>
>
> src/data/_base/DATA.js
> 
> <pre>data에 사용하는 기본 상수 정의</pre>
>
> src/data/_base/OnServerListener.js 
> 
> <pre>API 데이터 인터페이스</pre>

## http

<pre>API 호출 모음</pre>

> src/data/http/Alarm.js
> 
> src/data/http/Authentication.js
>
> src/data/http/Content.js
>
> src/data/http/Index.js
>
> src/data/http/Inquire.js
>
> src/data/http/New.js
>
> src/data/http/Setting.js
>
> src/data/http/Suggest.js
>
> src/data/http/TabEventForMemberShip.js
>
> src/data/http/TabEventForNotice.js
>
> src/data/http/TabFromDaniel.js
>
> src/data/http/TabMediaForMemberShip.js
>
> src/data/http/TabMediaForNotice.js
>
> src/data/http/TabNoticeForMemberShip.js
>
> src/data/http/TabNoticeForNotice.js
>
> src/data/http/TabSchedule.js
>
> src/data/http/TabTalk.js
>
> src/data/http/TabTalkTalk.js
>
> src/data/http/TabToDaniel.js
>
> src/data/http/Translate.js
>
> src/data/http/User.js
>
> src/data/http/Util.js
> 
> src/data/http/VR.js

## redux

<pre>REDUX 모듈 사용</pre>

> _base
>  > ActionType.js
>  > 
>  > <pre>액션 타입 정의</pre>
>  > 
>  > Result.js
>  > 
>  > <pre>response 값 정의</pre>
>
> action
> 
> <pre>Redux Action 모음</pre>
>
> reducer
> 
> <pre>Redux Reducer 모음</pre>
>
> Store.js
>
> <pre>Redux Store 정의</pre>

</div> 

***
 
<div markdown="module">

<pre>react native 에서 native와 통신을 위해 만든 모듈</pre>

***

## UnityIntentLauncher
> src/module/UnityIntentLauncher/index.js
>
> src/module/UnityIntentLauncher/IntentConstant.js
>
> <pre>Unity Intent와 통신을 위한 모듈</pre>

***

## cardboardQR
> src/module/cardboardQR.js
>
> <pre>CardboardQR이 기록이 되었는지 알아보는 모듈</pre>

</div> 

***
 
<div markdown="navigation">

<pre>화면 이동을위한 Navigate 설정</pre>

> Navigator.js
>
> <pre>Screen을 정의</pre>
>
> RootNavigation.js
>
> <pre>Global로 Navigator를 사용하기 위한 함수</pre>
 

***
 
<div markdown="component">
<pre>앱에 사용하는 공통 Component 모음</pre>

***

### _base

> src/component/_base/BaseButton.js
>
> src/component/_base/BaseComponent.js
>
> src/component/_base/BaseHelperLayout.js
>
> src/component/_base/BaseHelperLayout.style.js
>
> src/component/_base/BaseImage.js
>
> src/component/_base/BaseModalImage.js
>
> src/component/_base/BaseMultiColorText.js
>
> src/component/_base/BaseText.js
>
> src/component/_base/BaseTextInput.js
>
> src/component/_base/BaseTransText.js
>
> <pre>React 기본 Component Wrap</pre>

### _common

> alphabet
> > src/component/_common/alphabet/AlphabetNationData.js
> >
> > src/component/_common/alphabet/AlphabetSectionList.js
> >
> > src/component/_common/alphabet/RightSectionList.js
> >
> optimized
> > src/component/_common/optimized/FlatListItem.js
> >
> > src/component/_common/optimized/index.js
> >
> > src/component/_common/optimized/OptimizedFlatList.js
> >
> <pre>FlatList 최적화 Component</pre>
>
> parse
> > src/component/_common/parse/ParsedText.js
> >
> > src/component/_common/parse/TextExtraction.js
> >
> refresh
> > src/component/_common/refresh/RefreshFlatList.js
> >
> > src/component/_common/refresh/RefreshFooter.js
> >
> > src/component/_common/refresh/RefreshState.js
> >
> <pre>FlatList Wrap Component 리로드 구현</pre>
>
> src/component/_common/BottomSheet.js
> >
> <pre>하단에서 팝업되는 Component</pre>
>
> src/component/_common/InViewPort.js
> >
> <pre>앱화면안에 컴포넌트가 들어가는지 체그하는 component</pre>
>
> src/component/_common/KeyboardListener.js
> >
> <pre>키보드 focus, blur 리스너</pre>
>
> src/component/_common/ScrollableWithCollapsibleHeader.js
> >
> src/component/_common/ViewMoreText.js
> >
> <pre>Text 길이를 넘어가면 more 버튼표시</pre>

### alert

> _base
> > src/component/alert/_base/ConfirmAlert.js
> >
> <pre>Confirm Alertbox 컴포넌트</pre>
  
> > src/component/alert/_base/ConfirmCancelAlert.js
> >
> <pre> OK Cancel Alerbox 컴포넌트</pre>
>
> _style
>
> > src/component/alert/_style/Alert.style.js
> >
> > <pre>Alertbox style 정의</pre>
>
> src/component/alert/GlobalAlert.js
> >
> > <pre>전역적으로 사용하기 위한 구현</pre>

### bottom_sheet

> _base
> > src/component/bottom_sheet/_base/BaseNormalBottomSheet.js
> >
> > src/component/bottom_sheet/_base/BaseRadiusBottomSheet.js
> >
> <pre>BottomSheet Base Component</pre>
> _style
> <pre>bottom_sheet Component의 style 정의</pre>
> src/component/bottom_sheet/BottomDatePicker.js
>
> <pre>날짜 선택 시트</pre>
> src/component/bottom_sheet/BottomDeclare.js
> 
> <pre>신고 하단 화면</pre>
> src/component/bottom_sheet/BottomFilterForEvent.js
>
> <pre>FroEvent 하단 필터</pre>
> src/component/bottom_sheet/BottomFilterForTalkTalk.js
>
> <pre>ForTalkTalk 하단 필터</pre>
> src/component/bottom_sheet/BottomFilterForToDaniel.js
>
> <pre>ToDaniel 필터</pre>
> src/component/bottom_sheet/CommentManage.js
>
> <pre>comment 관리 스트</pre>
> src/component/bottom_sheet/PostCopy.js
>
> <pre>post 복사 시트</pre>
> src/component/bottom_sheet/PostDeclare.js
>
> <pre>post 신고 시트</pre>
> src/component/bottom_sheet/PostManage.js
>
> <pre>post 관리 시트</pre>
> src/component/bottom_sheet/TranslateLanguage.js
>
> <pre>번역 언어 선택 시트</pre>

### button

> _base 
> _style
> <pre>button Component의 style 정의</pre>
> src/component/button/GroupMultiHorizontalButton.js
>
> <pre>다중 그룹 버튼 가로</pre>
> src/component/button/GroupMultiVerticalButton.js
>
> <pre>다중 그룹 버튼 세로</pre>
> src/component/button/GroupSingleButtonWithHelper.js
>
> <pre>단일 그룹 버튼</pre>
> src/component/button/GroupSingleHorizontalButton.js
>
> <pre>단일 그룹 가로 버튼</pre>
> src/component/button/GroupSingleVerticalButton.js
>
> <pre>단일 선택 세로 버튼</pre>
> src/component/button/SwitchToggleButton.js
>
> <pre>아이폰 스타일 토글 버튼</pre>
> src/component/button/TagSelectHorizontalButton.js
>
> <pre>테그 선택 가로 버튼</pre>
> src/component/button/TagSelectHorizontalScrollButton.js
>
> <pre>테그 선택 가로버튼 스크롤</pre>
> src/component/button/TranslateButton.js
>
> <pre>번역버튼</pre>

### calendar

> _style
> <pre>calendar 스타일 정의</pre>
  
> src/component/calendar/Day.js 
>
> src/component/calendar/Header.js 
>
> src/component/calendar/ScheduleCalendar.js
>
> <pre>달력 표시 컴포넌트</pre>

### checkbox

> _base
> <pre>checkbox 베이스 컴포넌트</pre>
> _style
> <pre>checkbox 스타일 정의</pre>
> src/component/checkbox/CircleCheckBox.js
>
> <pre>원형 체크 박스</pre>
> src/component/checkbox/SquireCheckBox.js
>
> <pre>사각 체크 박스</pre>

### chip

> _style
> <pre>chip 스타일 정의</pre>
  
> src/component/chip/Chip.js
>
> src/component/chip/Chips.js
>
> src/component/chip/SelectChip.js
>
> src/component/chip/SelectChips.js 

### downloader

> _style
> <pre>downloader 스타일 정의</pre>
> src/component/downloader/VRDownloader.js
>
> <pre>다운로드 UI표시 컴포넌트</pre>

### header

> _base
> > src/component/header/BaseHeader.js
> >
> <pre>화면 Header 베이스</pre>
> _style
> <pre>header 스타일 정의</pre>
> src/component/header/BackHeader.js
> 
> <pre>기본 뒤로가기 포함 헤더</pre>
> src/component/header/NotiHeader.js
>
> <pre>알림 포함 헤더</pre>
> src/component/header/TranslateHeader.js
>
> <pre>번역 포함 헤더</pre>

### html

> src/component/html/Html.js
>
> <pre>HTML 뷰어 컴포넌트</pre>

### image

> _style 
> <pre>image 스타일 정의</pre>
> src/component/image/CircleBorderImage.js
>
> <pre>원형 이미지</pre>
> src/component/image/FullWidthImage.js
>
> <pre>넓이를 우선으로 그려주는 이미지</pre>
> src/component/image/HtmlImage.js
>
> <pre>HTML에 표시되는 이미지를 따로 표시</pre>
> src/component/image/ZoomImage.js
>
> <pre>확대 축소 이미지</pre>

### indicator

> _style
> <pre>indicator 스타일 정의</pre>
>
> src/component/indicator/DotIndicator.js
>
> <pre>스와이프 리스트 화면의 인디케이터</pre>

### item

> _style
> <pre>item 스타일 정의</pre>
>
> src/component/item/CommentItem.js
>
> src/component/item/TabFromDanielItem.js
>
> src/component/item/TabMemberShipEventPartItem.js
>
> src/component/item/TabNoticeEventPartItem.js
>
> src/component/item/TabTalkItem.js
>
> src/component/item/TabTalkTalkItem.js
>
> src/component/item/TabToDanielItem.js
>
> src/component/item/VideoItem.js
>
> <pre>리스트에서 표시되는 내용</pre>

### list

> _style
> <pre>list의 스타일 정의</pre>
>
> _type
> > src/component/list/_type/GridSize.js
> >
> > src/component/list/_type/HomeTemplateType.js
> >
> > src/component/list/_type/MediaTemplateType.js
> >
> <pre>리스트 공통 Type 정의</pre>
>
> event
> > src/component/list/event/EventNoticeList.js
> >
> > src/component/list/event/EventPartList.js
> >
> <pre>이벤트 표시, Event, Part</pre>
>
> goods
> > src/component/list/goods/GoodsList.js
> >
> <pre>상품 리스트 표시</pre>
>
> home
> > template
> > > src/component/list/home/template/HomeItem.js
> > > 
> > > src/component/list/home/template/HomeTemplate.js
> > > 
> > > src/component/list/home/template/Template_1.js
> > > 
> > > src/component/list/home/template/Template_R.js
> > > 
> > src/component/list/home/HomeList.js
> <pre>Home 화면 표시</pre>
>
> media
> > template
> > > src/component/list/media/template/MediaItem.js
> > > 
> > > src/component/list/media/template/MediaTemplate.js
> > > 
> > > src/component/list/media/template/Template_1.js
> > > 
> > > src/component/list/media/template/Template_2.js
> > > 
> > src/component/list/media/MediaList.js
> <pre>Media 리스트 표시</pre>
>
> post
> > template
> > > src/component/list/post/template/PostItem.js
> > > 
> > > src/component/list/post/template/PostTemplate.js
> > > 
> > > src/component/list/post/template/Template_1.js
> > > 
> > src/component/list/post/PostList.js
> <pre>POST의 리스트 표시</pre>
>
> vr
> > src/component/list/vr/VRBannerList.js
> >
> > src/component/list/vr/VRCertificationList.js
> >
> > src/component/list/vr/VRDownloadHistoryList.js
> >
> > src/component/list/vr/VRProductList.js
> >
> <pre>VR에서 표시되는 베너, 인증번호, 다운로드기록, 상품 리스트 표시</pre>
>
> src/component/list/EmptyView.js
>
> <pre>리스트가 비었을떄 표시되는 component</pre>

### loader

> src/component/loader/Loader.js
>
> <pre>로딩시 표시되는 component</pre>

### popup

> <pre>풀화면 팝업 Component</pre>
>
> _base
> > src/component/popup/_base/BaseFullPopup.js
> >
> _style
> <pre>popup 스타일 정의</pre>
>
> src/component/popup/AudioTitlePopup.js
>
> src/component/popup/CountryCodePopup.js

### progress

> src/component/progress/CircleProgress.js
>
> <pre>원형 플로그래스</pre>

### question

> _style
> <pre>question 의 스타일 정의</pre>
>
> src/component/question/MultipleChoice.js
>
> src/component/question/SelectImage.js
>
> src/component/question/SubjectiveDate.js
>
> src/component/question/SubjectiveText.js
> <pre>질문 타입별 표시 콤포넌트</pre>

### record

> _style
> <pre>record 스타일 정의</pre>
>
> src/component/record/RecentRecordItem.js
>
> src/component/record/RecentRecordList.js
> <pre>이전 입력 기록 리스트, 표시 내용</pre>

### tab

> <pre>각화면  Bar 컴포넌트</pre>
>
> _base
> > src/component/tab/_base/TabTopBar.js
> _style
> <pre>tab 스타일 정의</pre>
>
> src/component/tab/TabBottomBar.js
>
> src/component/tab/TabCommunityBar.js
>
> src/component/tab/TabMemberShipBar.js
>
> src/component/tab/TabNoticeBar.js 

### text

> _base
> > src/component/text/_base/CustomInput.js
> <pre>TextInput 커스텀</pre>
>
> _style
> <pre>text Component 스타일 정의</pre>
>
> src/component/text/AttributeText.js
> <pre>속성 표시 택스트</pre>
>
> src/component/text/DotText.js
> <pre>TEXT앞에 DOT표시</pre>
>
> src/component/text/FlatInput.js
> <pre>TextInput Flat 한 UI</pre>
>
> src/component/text/PhoneInput.js
> <pre>핸드폰 번호 입력 TextInput</pre>
>
> src/component/text/SearchBar.js
> <pre>TextInput 검색 UI</pre>
>
> src/component/text/SearchInput.js
> <pre>검색 입력</pre>
>
> src/component/text/SelectInput.js
> <pre>입력 부분 에러 표시</pre>

</div> 

***
 
<div markdown="screen">
<pre>Navigator 스크린 Container 모음</pre>

***

### _base

> /src/screen/_base/BaseScreen.js
> <pre>BaseScreen, 기본 스크린 상속</pre>

### _style

> <pre>스크린들의 스타일 정의</pre>

### activity

> detail
> > src/screen/activity/detail/BannerDetail.js
> >
> > src/screen/activity/detail/EventDetail.js
> >
> > src/screen/activity/detail/GoodsDetail.js
> >
> > src/screen/activity/detail/InquireDetail.js
> >
> > src/screen/activity/detail/NoticeDetail.js
> >
> > src/screen/activity/detail/PostDetail.js
> >
> > src/screen/activity/detail/PostDetail2.js
> >
> > src/screen/activity/detail/SuggestDetail.js
> >
> > src/screen/activity/detail/VRProductDetail.js
> >
> > <pre>각 페이지 상세 화면 스크린</pre>
>
> media
> > src/screen/activity/media/MediaAudio.js
> >
> > src/screen/activity/media/MediaImage.js
> >
> > src/screen/activity/media/MediaVideo.js
> >
> > src/screen/activity/media/MediaWallpaper.js
> >
> > src/screen/activity/media/MediaYoutube.js
> >
> > <pre>비디오 이미지 오디오 유튜브 뷰어 스크린</pre>
>
> post
> > src/screen/activity/post/Post.js
> >
> > src/screen/activity/post/PostEvent.js
> >
> > src/screen/activity/post/PostInquire.js
> >
> > src/screen/activity/post/PostPublicBroadCasting.js
> >
> > src/screen/activity/post/PostSuggest.js
> >
> > src/screen/activity/post/PostVote.js
> >
> > <pre>POST 종류 별 화면 스크린</pre>
>
> Viewer
> > src/screen/activity/Viewer/ImageViewer.js
> >
> > src/screen/activity/Viewer/MediaViewer.js
> >
> > <pre>이미지 메디아 뷰어</pre>
> 
> VR
> > src/screen/activity/VR/VRCertification.js
> >
> > src/screen/activity/VR/VRQRCodeSetting.js
> >
> > src/screen/activity/VR/VRUnityLauncher.js
> >
> > src/screen/activity/VR/VRUnityView.js
> >
> > src/screen/activity/VR/VRUnityView_aos.js
> >
> > <pre>VR관련 화면</pre>
> 
> src/screen/activity/AlarmList.js
>
> <pre>알람 리스트 </pre>
>
> src/screen/activity/Comment.js

### auth

> src/screen/auth/Authentication.js
>
> src/screen/auth/ChangePassword.js
>
> src/screen/auth/Join.js
>
> src/screen/auth/Login.js
>
> src/screen/auth/ResetPassword.js
>
> <pre>로그인 스택</pre>

### community

> src/screen/community/Community.js
>
> src/screen/community/TabFromDaniel.js
>
> src/screen/community/TabTalkTalk.js
>
> src/screen/community/TabToDaniel.js
>
> <pre>커뮤니티 스택</pre>

### home

> src/screen/home/Home.js
>
> src/screen/home/KangDaniel.js
>
> src/screen/home/KangDanielMedia.js
>
> <pre>홈 스택</pre>

### membership

> src/screen/membership/MemberShip.js
>
> src/screen/membership/TabEvent.js
>
> src/screen/membership/TabMedia.js
>
> src/screen/membership/TabNotice.js
>
> src/screen/membership/TabTalk.js
>
> <pre>맴버쉽 스택</pre>

### more

> <pre>모어 스택</pre>
> member
>
> > src/screen/more/member/MembershipGuide.js
> > src/screen/more/member/MembershipInfo.js
> > src/screen/more/member/RegularMemberApply.js
  > <pre>맴버쉽 관리</pre>
> 
> service
>
> > src/screen/more/service/Faq.js 
> >
> > src/screen/more/service/Inquire.js 
> >
> > src/screen/more/service/InquireList.js 
> >
> > src/screen/more/service/ServiceCenter.js 
> >
> > src/screen/more/service/Suggest.js 
> >
> > src/screen/more/service/SuggestList.js 
> >
> > src/screen/more/service/withdrawal.js 
>  > <pre>서비스 관련 스크린</pre>
> 
> src/screen/more/More.js
> 
> src/screen/more/MyPost.js
> 
> src/screen/more/ProductCertificationList.js
> 
> src/screen/more/Profile.js
> 
> src/screen/more/Setting.js
> 
> src/screen/more/TermsPolicies.js
> 
> src/screen/more/VersionInfo.js
> 
> src/screen/more/VRDownloadFileManagement.js

### notice

> src/screen/notice/Notice.js
> 
> src/screen/notice/TabEvent.js
> 
> src/screen/notice/TabGoods.js
> 
> src/screen/notice/TabMedia.js
> 
> src/screen/notice/TabNotice.js
> 
> src/screen/notice/TabSchedule.js
> 
> src/screen/notice/TabVR.js
> 
> <pre>알림 화면</pre>

### splash

> src/screen/splash/Splash.js
> <pre>앱 진입 스플래쉬, 앱 초기화와 로그인 판별</pre>

### tester

> src/screen/tester/DownloadListItem.js
> 
> src/screen/tester/TestPageScreen.js
> 
> src/screen/tester/VRAPITester.js
> 
> <pre>화면 테스트용</pre>

</div>
