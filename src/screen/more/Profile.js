////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import React from "react";
import {FlatList, Modal, ScrollView, TouchableOpacity, View} from "react-native";
import ImagePicker from 'react-native-image-crop-picker'
import {ListItem} from "react-native-elements";
import {SwipeablePanel} from "rn-swipeable-panel";
////////////////////
// Local
import BaseStyle from "../../util/style/Base.style";
import FontStyle from "../../util/style/Font.style";
import s from "./../_style/Profile.style";
import Layout from "../../util/Layout";
import Icon from "../../util/Icon"
import {colors} from "../../util/Color";
import localize from "../../util/Localize";
import BannedEquals from "../../util/banned/BannedEquals";
import BannedContains from "../../util/banned/BannedContains";
import {getCircleImageOptions} from "../../util/Options";
import Common from '@util/Common';
// Component
import BaseScreen from "@screen/_base/BaseScreen";
import BaseButton from "../../component/_base/BaseButton";
import ConfirmAlert from "../../component/alert/_base/ConfirmAlert";
import BaseText from "../../component/_base/BaseText";
import BaseTextInput from "../../component/_base/BaseTextInput";
import Loader from "../../component/loader/Loader";
import CountryCodePopup from "../../component/popup/CountryCodePopup";
import BaseImage from "../../component/_base/BaseImage";
import BackHeader from "../../component/header/BackHeader";
// API
import {userProfileImageUpdate, userProfileUpdate} from "../../data/http/User";

////////////////////////////////////////
// CLASS
////////////////////////////////////////

class Profile extends BaseScreen {

    ////////////////////
    // CONSTRUCTOR
    constructor(props) {
        super(props);
        const myProfile = this.props.route.params.myProfile;
        let phone = null;
        if (!Common.isEmpty(myProfile.mobile_number)) {
            phone = myProfile.mobile_number.split(' ');
        }
        this.state = {
            isLoading: false,
            isShowConfirm: false,
            errorMessage: '',
            callback: null,

            myProfile: myProfile,
            editNickName: myProfile.nickname,
            editNationCode: Common.checkListSize(phone) ? phone[0] : null,
            editPhoneNumber: Common.checkListSize(phone) ? phone[1] : null,
            editProfileImage: null,

            editMobile: false,
            isShowCountyCode: false,

            // County
            countyItem: '',
            isErrorCountry: false,
            errorCountryMessage: '',
            countryCallback: null,

            isShowEditImage: false,
            showCamera: false,

            enableSave: false,
            changeImage: false,
        }
        this.prevProfileImage = myProfile.image_url;
        this.basicImageChange = false;
    }

    componentDidMount() {
        super.componentDidMount();
        this.props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });
    }

    ////////////////////
    // FUNCTION
    setShowConfirm = (isShow, message = '', callback = null) => {
        if (this.state.isShowConfirm !== isShow) {
            this.setState({
                isShowConfirm: isShow,
                isShowConfirmCancel: false,
                callback: callback,
                errorMessage: message
            });
        }
    }

    getErrorMessage = (code = 0) => {
        switch (code) {
            case 100: {
                // success
                return localize.success.more.profile.complete;
            }
            case 223: {
                // Invalid Nickname
                return localize.error.auth.nick_name.confirm;
            }
            case 229: {
                // Invalid Mobile Number
                return localize.error.auth.phone.correct;
            }
            case 232: {
                // 넥네임에 금칙어가 포함되었을 경
                return localize.error.auth.nick_name.confirm;
            }
            case 248: {
                return localize.error.profile.normal_image;
            }
            case 295: {
                //return "Unknown Error - Member ChangeProfile"
            }
            default:
                return localize.error.Failed;
        }
    }

    getProfileList = _ => {
        const {myProfile} = this.state;

        // let country = localize.common.us;
        // let gender = localize.common.female;
        // if (myProfile.gender == 'M') {
        //     gender = localize.common.male;
        // }
        // switch (myProfile.country) {
        //     case 'KR': {
        //         country = localize.common.korea;
        //         break;
        //     }
        //     case 'EN': {
        //         country: localize.common.us;
        //         break;
        //     }
        // }

        return [
            {
                title: 'nickname',
                value: myProfile.nickname,
                edit: true,
            },
            // {
            //     title: 'phone',
            //     value: myProfile.mobile_number,
            //     edit: true,
            // },
            {
                title: 'email',
                value: myProfile.email,
                edit: false,
            },
            {
                title: 'name',
                value: myProfile.name,
                edit: false,
            },
            // {
            //     title: 'gender',
            //     value: gender,
            //     edit: false,
            // },
            // {
            //     title: 'birth',
            //     value: myProfile.birthday,
            //     edit: false,
            // },
            // {
            //     title: 'nation',
            //     value: country,
            //     edit: false,
            // },
        ]
    }

    setShowCountryCode = (isShow, callback = null) => {
        if (this.state.isShowCountyCode !== isShow) {
            this.setState({
                isShowCountyCode: isShow,
                countryCallback: callback
            });
        }
    }

    setCodeItem = item => {
        this.setState({
            codeItem: item,
            editNationCode: item.code
        }, () => {
            this.checkEnableSave()
        })
    }

    openEditImage = (show, func = null) => {
        this.setState({
            isShowEditImage: show
        }, () => {
            // 동시 진행시 swipe 가 위로 밀려 올라가는 현상
            setTimeout(() => {
                func && func()
            }, 10)
        })
    }

    changeProfileImage = image => {
        // console.warn(image)
        image == null ? this.basicImageChange = true : this.basicImageChange = false;
        this.setState({
            editProfileImage: image,
        }, () => {
            this.checkEnableSave()
        })
    }

    checkEnableSave = () => {
        // 변경된것이 있는가?
        const {myProfile, editNickName, editNationCode, editPhoneNumber, editProfileImage} = this.state;

        let enableSave = false;
        if (myProfile.nickname !== editNickName) {
            enableSave = true;
        }
        // nickname 길이 2~15
        if (editNickName.length < 2 || editNickName.length > 15) {
            enableSave = false;
        }

        // let mobile_number = `${editNationCode} ${editPhoneNumber}`
        // if (myProfile.mobile_number !== mobile_number) {
        //     enableSave = true;
        // }
        // mobile_number 길이 5 - 20
        // let regExp = /^\d{2,3}\d{3,4}\d{4}$/;
        // if (!regExp.test(editPhoneNumber)) {
        //     enableSave = false;
        // }
        // if(editPhoneNumber.length < 5 || editPhoneNumber.length > 20){
        //    enableSave = false;
        // }

        let changeImage = false;
        if (editProfileImage) {
            if (myProfile.image_url !== editProfileImage.path) {
                enableSave = true;
                changeImage = true;
            }
        } else {
            if (this.basicImageChange) {
                if (myProfile.image_url !== editProfileImage) {
                    enableSave = true;
                    changeImage = true;
                }
            } else if (myProfile.image_url !== this.prevProfileImage) {
                enableSave = true;
                changeImage = true;
            }
        }


        this.setState({
            enableSave: enableSave,
            changeImage: changeImage
        })
    }

    updateProfile = () => {
        const {editNickName} = this.state;
        // Banned Word
        if (Common.isEqualText(editNickName, BannedEquals) || Common.isContainsText(editNickName, BannedContains)) {
            this.setState({isLoading: false});
            this.setShowConfirm(true, localize.error.auth.nick_name.banned_word);
            return;
        }
        const {myProfile, editNationCode, editPhoneNumber} = this.state;
        // let mobile_number = `${editNationCode} ${editPhoneNumber}`;
        userProfileUpdate(editNickName, '', (success, code, message, data) => {
            this.setState({
                isLoading: false,
                enableSave: false,
            }, () => {
                if (success) {
                    myProfile.nickname = editNickName;
                    // myProfile.mobile_number = mobile_number;
                    this.setShowConfirm(true, localize.more.profile.save_success);
                } else {
                    // console.warn(code)
                    this.setShowConfirm(true, this.getErrorMessage(code * 1));
                }
            })
        })
    }

    // Event
    onSaveProfile = () => {
        this.setState({isLoading: true});
        const {changeImage, editProfileImage} = this.state;

        let image_data = null;
        if (!Common.isEmpty(editProfileImage)) {
            image_data = {
                type: editProfileImage.mime,
                uri: editProfileImage.path,
                name: Common.getFileNameFromUrl(editProfileImage.path),
            }
        }
        // let uri = null;
        // let name = null;
        // if (editProfileImage) {
        //     uri = editProfileImage.path;
        //     name = editProfileImage.path.replace(/^.*[\\\/]/, "");
        // }
        // let image_data = editProfileImage ? {
        //     uri: uri,
        //     name: name,
        //     type: editProfileImage.mime
        // } : null;

        if (changeImage) {
            userProfileImageUpdate(image_data, (success, code, message, data) => {
                if (success) {
                    this.state.myProfile.image_url = image_data ? image_data.uri : null;
                    this.prevProfileImage = this.state.myProfile.image_url;
                    this.setState({
                        changeImage: false,
                        editProfileImage: null,
                    }, () => {
                        this.updateProfile();
                    })
                } else {
                    this.setShowConfirm(true, this.getErrorMessage(code * 1));
                    this.setState({
                        isLoading: false
                    })
                }
                this.basicImageChange = false;
            })
        } else {
            this.updateProfile();
        }
    }

    onShowGalley = _ => {
        ImagePicker
            .openPicker(getCircleImageOptions())
            .then(image => this.changeProfileImage(image))
            .catch(e => {
                console.warn(e)
                if(e.message.includes("cancelled image selection")) return;
                this.setShowConfirm(true, localize.error.post.image_resize_error)
            })
    }

    onShowCamera = _ => {
        ImagePicker
            .openPicker(getCircleImageOptions())
            .then(image => this.changeProfileImage(image))
            .catch(e => {
                console.warn(e)
                if(e.message.includes("cancelled image selection")) return;
                this.setShowConfirm(true, localize.error.post.image_resize_error)
            })
    }

    ////////////////////
    // RENDER
    renderTop = _ => {
        const {myProfile, changeImage, editProfileImage} = this.state;
        let image_size = Layout.UISize(140);
        let image = null;
        if (editProfileImage) {
            image = editProfileImage.path;
        } else {
            if (changeImage) {
                image_size = Layout.UISize(60);
            } else {
                image = myProfile.image_url;
                if (myProfile.image_url == null) {
                    image_size = Layout.UISize(60);
                }
            }
        }
        return (
            <View style={s.topContainer}>
                <View style={s.topImageBase}>
                    {image
                        ? <BaseImage source={{uri: image}}
                                     style={{
                                         width: image_size,
                                         height: image_size,
                                         borderRadius: image ? image_size * 0.5 : 0,
                                         backgroundColor: colors.grayDark,
                                         alignItems: "center",
                                         justifyContent: "center",
                                     }}/>
                        : <Icon.MemberShipOn
                            size={Layout.UISize(60)}
                            color={colors.grayLight}/>}
                </View>
                <TouchableOpacity hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                                  onPress={() => {
                                      this.openEditImage(true)
                                  }}>
                    <BaseText style={FontStyle.BtnMintRN}>{localize.common.change}</BaseText>
                </TouchableOpacity>
            </View>)
    }

    renderEdit = item => {
        const {myProfile, editNickName, editNationCode, editPhoneNumber} = this.state;
        // const phone = myProfile.mobile_number.split(' ');
        switch (item.title) {
            // case 'phone':
            //     return (
            //         <View style={s.phoneEditor}>
            //             <TouchableOpacity onPress={() => {
            //                 this.setShowCountryCode(true, this.setCodeItem)
            //             }}>
            //                 <BaseText style={FontStyle.CntWhiteLN}>{editNationCode}</BaseText>
            //             </TouchableOpacity>
            //             <BaseTextInput style={[s.phoneEditorInput, FontStyle.CntWhiteLN]}
            //                            textContentType={"telephoneNumber"}
            //                            keyboardType='numeric'
            //                            editable={true}
            //                            placeholder={localize.join.hint.phone_number}
            //                            placeholderTextColor={colors.gray}
            //                            value={editPhoneNumber}
            //                            maxLength={20}
            //                            onChangeText={text => {
            //                                this.setState({
            //                                    editPhoneNumber: text
            //                                }, () => {
            //                                    this.checkEnableSave()
            //                                })
            //                            }}
            //                            onBlur={() => {
            //                                if (editPhoneNumber === '') {
            //                                    this.setState({
            //                                        editPhoneNumber: phone[1]
            //                                    }, () => {
            //                                        this.checkEnableSave()
            //                                    })
            //                                }
            //                            }}/>
            //         </View>)

            case 'nickname': {
                return <BaseTextInput style={[s.nicknameEditorInput, FontStyle.CntWhiteLN]}
                                      textContentType={"username"}
                                      editable={true}
                                      placeholder={localize.join.hint.nick_name}
                                      placeholderTextColor={colors.gray}
                                      value={editNickName}
                                      maxLength={15}
                                      onChangeText={text => {
                                          this.setState({
                                              editNickName: text
                                          }, () => {
                                              this.checkEnableSave()
                                          })
                                      }}
                                      onBlur={() => {
                                          if (editNickName === '') {
                                              this.setState({
                                                  editNickName: myProfile.nickname
                                              }, () => {
                                                  this.checkEnableSave()
                                              })
                                          }
                                      }}/>
            }
        }
    }

    renderItem = ({item, index}) =>
        <ListItem containerStyle={s.listItemContainer}
                  onPress={() => {
                      if (item.title === 'phone') {
                          this.setState({editMobile: !this.state.editMobile})
                      }
                  }}>
            {/*<View style={s.listLine} />*/}
            {item.edit
                ? this.renderEdit(item)
                : <BaseText style={[FontStyle.CntGrayLN]}>{item.value}</BaseText>}
        </ListItem>

    renderList = _ => {
        let list = this.getProfileList();
        return (
            <FlatList showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                          flexGrow: 1,
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      data={list}
                      renderItem={this.renderItem}/>)
    }

    renderButton = _ => {
        return (
            <View style={s.btnContainer}>
                <View style={s.btnBottomContainer}>
                    <BaseButton titleStyle={FontStyle.BtnWhiteCH}
                                buttonStyle={s.btnBottom}
                                title={localize.common.cancel}
                                onPress={() => {
                                    this.props.navigation.pop()
                                }}/>
                    <BaseButton titleStyle={FontStyle.BtnWhiteCH}
                                disabled={!this.state.enableSave}
                                buttonStyle={[s.btnBottom, {backgroundColor: colors.orange}]}
                                title={localize.common.save}
                                onPress={() => {
                                    this.onSaveProfile();
                                }}/>
                </View>
                <View style={s.btnBottomSpace}/>
            </View>)
    }

    renderPopEditImage = _ => {
        return (
            <Modal transparent
                   visible={this.state.isShowEditImage}
                   onRequestClose={_ => this.openEditImage(false)}>
                {this.state.isShowEditImage && <View style={s.mask}/>}
                <SwipeablePanel isActive={this.state.isShowEditImage}
                                onlySmall={true}
                                noBackgroundOpacity={true}
                                style={[s.popEditContainer, {backgroundColor: "transparent"}]}
                                noBar={true}
                                showCloseButton={false}
                                fullWidth={true}
                                scrollViewProps={{scrollEnabled: false}}
                                onClose={() => {
                                    this.openEditImage(false)
                                }}>
                    <View style={s.popEditBtnContainer}>
                        <View style={s.popEditBtnTitle}>
                            <BaseText
                                style={[FontStyle.Cnt13GrayCB]}>{localize.more.profile.image_change_title}</BaseText>
                        </View>
                        <View style={s.line}/>
                        <BaseButton titleStyle={FontStyle.CntWhiteCN}
                                    buttonStyle={s.popEditBtn}
                                    title={localize.more.profile.select_album}
                                    onPress={() => {
                                        this.openEditImage(false, () => {
                                            this.onShowGalley();
                                        });

                                    }}/>
                        <View style={s.line}/>
                        <BaseButton titleStyle={FontStyle.CntWhiteCN}
                                    buttonStyle={s.popEditBtn}
                                    title={localize.more.profile.take_camera}
                                    onPress={() => {
                                        this.openEditImage(false, () => {
                                            this.onShowCamera();
                                        });

                                    }}/>
                        <View style={s.line}/>
                        <BaseButton titleStyle={FontStyle.CntWhiteCN}
                                    buttonStyle={s.popEditBtn}
                                    title={localize.more.profile.default_select_image}
                                    onPress={() => {
                                        this.openEditImage(false, () => {
                                            this.changeProfileImage(null);
                                        });

                                    }}/>
                    </View>
                    <View style={s.popEditBtn}>
                        <BaseButton titleStyle={FontStyle.BtnGrayCB}
                                    buttonStyle={s.popEditBtn}
                                    title={localize.common.cancel}
                                    onPress={() => {
                                        this.openEditImage(false)
                                    }}/>
                    </View>
                </SwipeablePanel>
            </Modal>

            // <Modal visible={this.state.isShowEditImage}
            //        transparent={true}>
            //
            // </Modal>

        )
    }

    render() {
        const {
            isLoading, isShowConfirm, errorMessage, callback,
            isShowCountyCode, countryCallback,
        } = this.state;

        return (
            <View style={[BaseStyle.container]}>
                {/* Loading */}
                <Loader isLoading={isLoading}/>
                {/* Header */}
                <BackHeader skipAndroidStatusBar={false}
                            title={localize.more.edit_my_information}
                            onBackPress={_ => this.props.navigation.pop()}/>
                <ScrollView>
                    {/* Top */}
                    {this.renderTop()}
                    {/* List */}
                    {this.renderList()}
                </ScrollView>

                {/**/}
                {this.renderButton()}

                {/* //////////////////// */}
                {/* Modal */}
                {/* //////////////////// */}

                {/* Country Popup */}
                <CountryCodePopup isVisible={isShowCountyCode}
                                  onBackPress={_ => this.setShowCountryCode(false)}
                                  onConfirm={item => {
                                      countryCallback && countryCallback(item);
                                      this.setShowCountryCode(false);
                                  }}/>

                {/**/}
                {this.renderPopEditImage()}
                {/* Alert */}
                <ConfirmAlert isVisible={isShowConfirm}
                              onConfirm={_ => {
                                  callback && callback();
                                  this.setShowConfirm(false);
                              }}>
                    <BaseText style={FontStyle.CntNoticeWhiteCN}>{errorMessage}</BaseText>
                </ConfirmAlert>
            </View>
        );
    }
}

////////////////////////////////////////
// EXPORT
////////////////////////////////////////
export default Profile;
