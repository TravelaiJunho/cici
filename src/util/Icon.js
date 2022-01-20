////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from 'react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import iconConfig from '../../config.json';
import Layout from './Layout';

////////////////////////////////////////
// FUNCTION
////////////////////////////////////////

const CustomIcon = createIconSetFromFontello(iconConfig);
const createIcon = (name, size, color, onPress) => (<CustomIcon name={name}
                                                                size={Layout.UISize(size)}
                                                                color={color}
                                                                onPress={onPress}/>);

////////////////////////////////////////

const Back = ({size, color, onPress}) => createIcon('sign_b', size, color, onPress);
const Close = ({size, color, onPress}) => createIcon('x', size, color, onPress);

const SignUp = ({size, color, onPress}) => createIcon('sign_u', size, color, onPress);
const SignDown = ({size, color, onPress}) => createIcon('sign_d', size, color, onPress);
const SignLeft = ({size, color, onPress}) => createIcon('sign_l', size, color, onPress);
const SignRight = ({size, color, onPress}) => createIcon('sign_r', size, color, onPress);

const Select = ({size, color, onPress}) => createIcon('select', size, color, onPress);
const Search = ({size, color, onPress}) => createIcon('search', size, color, onPress);

const CancelOn = ({size, color, onPress}) => createIcon('cancel_on', size, color, onPress);
const Visible = ({size, color, onPress}) => createIcon('visible', size, color, onPress);
const Invisible = ({size, color, onPress}) => createIcon('unvisible', size, color, onPress);

const KdSymbol = ({size, color, onPress}) => createIcon('logo_kd_symbol', size, color, onPress);

const Writing = ({size, color, onPress}) => createIcon('writing', size, color, onPress);
const Filter = ({size, color, onPress}) => createIcon('filter', size, color, onPress);

const Bell = ({size, color, onPress}) => createIcon('bell', size, color, onPress);
const CrownOn = ({size, color, onPress}) => createIcon('crown_on', size, color, onPress);
const Download = ({size, color, onPress}) => createIcon('download', size, color, onPress);
const Etc = ({size, color, onPress}) => createIcon('etc', size, color, onPress);
const HeartOn = ({size, color, onPress}) => createIcon('heart_on', size, color, onPress);
const HeartOff = ({size, color, onPress}) => createIcon('heart_off', size, color, onPress);
const StarOn = ({size, color, onPress}) => createIcon('star_on', size, color, onPress);
const SignatureOn = ({size, color, onPress}) => createIcon('signature_on', size, color, onPress);
const M = ({size, color, onPress}) => createIcon('m', size, color, onPress);
const TvOn = ({size, color, onPress}) => createIcon('tv_on', size, color, onPress);

const Attention = ({size, color, onPress}) => createIcon('attention', size, color, onPress);
const Plus = ({size, color, onPress}) => createIcon('plus', size, color, onPress);

const MoreVerticalOn = ({size, color, onPress}) => createIcon('more_dots_v_on', size, color, onPress);
const Comment = ({size, color, onPress}) => createIcon('comment', size, color, onPress);

const EventOn = ({size, color, onPress}) => createIcon('event_on', size, color, onPress);
const AlbumOn = ({size, color, onPress}) => createIcon('album_on', size, color, onPress);
const RadioOn = ({size, color, onPress}) => createIcon('radio_on', size, color, onPress);
const AnniversaryOn = ({size, color, onPress}) => createIcon('anniversary_on', size, color, onPress);

const WallpaperOn = ({size, color, onPress}) => createIcon('wallpaper_on', size, color, onPress);
const VoiceOn = ({size, color, onPress}) => createIcon('voice_on', size, color, onPress);
const VideoOn = ({size, color, onPress}) => createIcon('video_on', size, color, onPress);
const ImagePOn = ({size, color, onPress}) => createIcon('image_p_on', size, color, onPress);
const ChoiceCircleOff = ({size, color, onPress}) => createIcon('choice_circle_off', size, color, onPress);
const ChoiceCircleOn = ({size, color, onPress}) => createIcon('choice_circle_on', size, color, onPress);

const PlayOn = ({size, color, onPress}) => createIcon('play_on', size, color, onPress);
const PlayPause = ({size, color, onPress}) => createIcon('play_pause', size, color, onPress);
const PlayPrevious = ({size, color, onPress}) => createIcon('play_b', size, color, onPress);
const PlayNext = ({size, color, onPress}) => createIcon('play_n', size, color, onPress);

const CheckOn = ({size, color, onPress}) => createIcon('choice_select', size, color, onPress);
const CheckOff = ({size, color, onPress}) => createIcon('choice_square', size, color, onPress);

// 중복
const Unvisible = ({size, color, onPress}) => createIcon('unvisible', size, color, onPress);

// Bottom Tab
const HomeOn = ({size, color, onPress}) => createIcon('home_on', size, color, onPress);
const HomeOff = ({size, color, onPress}) => createIcon('home_off', size, color, onPress);
const CommunityOn = ({size, color, onPress}) => createIcon('community_on', size, color, onPress);
const CommunityOff = ({size, color, onPress}) => createIcon('community_off', size, color, onPress);
const NoticeOn = ({size, color, onPress}) => createIcon('notice_on', size, color, onPress);
const NoticeOff = ({size, color, onPress}) => createIcon('notice_off', size, color, onPress);
const MemberShipOn = ({size, color, onPress}) => createIcon('logo_danity_on', size, color, onPress);
const MemberShipOff = ({size, color, onPress}) => createIcon('logo_danity_off', size, color, onPress);
const MoreOn = ({size, color, onPress}) => createIcon('more_dots_h_on', size, color, onPress);
const MoreOff = ({size, color, onPress}) => createIcon('more_dots_h_off', size, color, onPress);

const MailRead = ({size, color, onPress}) => createIcon('mail_read', size, color, onPress);
const MailUnRead = ({size, color, onPress}) => createIcon('mail_unread', size, color, onPress);

const Translate = ({size, color, onPress}) => createIcon('trans', size, color, onPress);

const Trash = ({size, color, onPress}) => createIcon('trashcan', size, color, onPress);
////////////////////////////////////////

export default {
    CustomIcon,
    Back, Close,
    SignUp, SignDown, SignLeft, SignRight,
    Select, Search,
    CancelOn, Visible, Invisible,
    KdSymbol,
    Writing, Filter,
    Bell,
    CrownOn, StarOn, SignatureOn, M,
    TvOn,
    Unvisible,
    Download,
    Etc,
    HeartOff, HeartOn,
    Attention, Plus, MoreVerticalOn, Comment,
    EventOn, AlbumOn, RadioOn, AnniversaryOn,
    WallpaperOn, VoiceOn, VideoOn,
    PlayOn, PlayPause, PlayPrevious, PlayNext,
    CheckOn, CheckOff,
    // Bottom Tab
    HomeOn, HomeOff, CommunityOn, CommunityOff, NoticeOn, NoticeOff,
    MemberShipOn, MemberShipOff, MoreOn, MoreOff,
    ImagePOn, ChoiceCircleOff, ChoiceCircleOn,
    MailRead, MailUnRead,

    Translate,
    Trash,
};
