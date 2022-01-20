export default {

    ////////////////////////////////////////
    // MESSAGE
    ////////////////////////////////////////

    success: {
        auth: {
            email: {
                auth_complete: 'Email authentication is completed.\nPlease log in.',
                send_complete: 'An authentication email has been sent.\nPlease check your mailbox.',
            },
            password: {
                change: "Your password has been changed.",
                change_login: "Your password has been changed.\nPlease log in.",
            }
        },
        more: {
            profile: {
                complete: "Information has been saved.",
            }
        },
        post: {
            complete: 'The post has been registered.',
            save: 'Saved successfully.',
            delete: 'The post has been deleted.',
            inquire_complete: 'Your inquiry has been registered.',
            suggest_complete: 'Your suggestion has been registered.',
            blind: "Information on hide post treatment",
        },
        comment: {
            delete: 'The comment has been deleted.',
        },
        file: {
            save_image: 'The photo has been saved.',
            save_file: 'The file has been saved.',
            save_download_folder: 'Saved to your downloads folder.',
        },
        membership: {
            request_success: "Level up application completed.",
        },
        clipboard: {
            email: 'This email address is copied.',
            post_contents: 'The post content is copied.',
        },
    },
    error: {
        network: 'Network connection is not smooth.',
        auth: {
            login: {
                fail: 'Failed to log in.', // 기타사유
            },
            ////
            all_text: 'Please enter all of the fields.',
            email: {
                confirm: 'Please check your email address.',
                empty: 'Please enter your email address.',
                not_sign: 'This account is not signed up.',
                not_match: 'Please enter a valid email address.',
                not_complete: 'Email authentication is not completed.\nPlease complete it first.',
                already: 'The email address you have entered is already registered',
                //
                time_over: 'The authentication time has expired.\nPlease try again.',
                not_match_code: 'The authentication code does not match.',
                empty_code: 'Please enter your authentication code.',
                send_fail: 'Failed to send mail.\nPlease try again',
            },
            nick_name: {
                confirm: 'Please check your nickname.',
                length: 'Please enter your name in 2-15 letters.',
                not_used: 'Spaces and special characters cannot be used in the nickname.',
                already: 'This nickname is already in use.',
                banned_word: 'This nickname is not possible to use.'
            },
            password: {
                confirm: 'Please check your password.',
                empty: 'Please enter a password.',
                not_match: 'The password does not match. ',
                combi: 'Enter 8-20 characters by combining alphabets, numbers, and special character.',
            },
            password_confirm: {
                confirm: 'Please check the password box.',
                not_match: 'Passwords do not match each other.',
                more: 'Please enter the same password again.'
            },
            name: {
                confirm: 'Please check your name.',
                correct: 'Please enter the correct name.'
            },
            gender: {
                confirm: 'Please check your gender.',
                select: 'Please select your gender.',
            },
            birth: {
                confirm: 'Please check your date of birth.',
                correct: 'Please enter the correct date of birth.',
                under_14_age: 'Children under the age of 14 cannot join.',
            },
            country: {
                confirm: 'Please check your region.',
                select: 'Please select a region.',
            },
            phone: {
                confirm: 'Please check your mobile number.',
                correct: 'Please enter the correct mobile number.',
            },
            terms: {
                confirm: 'Please agree to all terms and policies.',
            },
        },
        list: {
            empty: 'No search results.',
        },
        Failed: "Failed. please try again",
        profile: {
            normal_image: 'This is not a normal image.',
        },
        post: {
            link: 'Video can be shared with YouTube link only.',
            title: 'Please write a title.',
            empty: 'Please fill out the content of the post.',
            empty_detail: 'Please wirte your content in detail.',
            image_max: 'You can register up to {0} photos.',
            image_resize_error : 'Selected photos cannot be resized.'
        },
        declare: {
            min_length: 'Please enter at least 5 characters for other reasons.',
        },
        file: {
            save_image: 'Failed to save the photo.',
            save_file: 'Failed to save the file.',
        },
        membership_request: {
            disable_grade: 'Level up application is for associate members only.',
            exist_request: 'Level up application exists.',
            type_error: 'Input error'
        }
    },

    ////////////////////////////////////////
    // WORD
    ////////////////////////////////////////

    common: {
        started: "Get Started",
        ok: "Ok",
        done: "Done",
        cancel: "Cancel",
        send: "Send",
        resend: "Resend",
        change: "Change",
        save: "Save",
        post: "Post",
        apply: "Apply",
        do_apply: "Apply",
        update: "Update",
        modify: "Modify",
        delete: "Delete",
        declare: "Report",
        declare_verb: "To report",
        more: 'View more',
        share: "Share",
        share_verb: "To share",
        detail: 'More details',
        copy: 'Copy',
        copy_text: 'Copy the post content',
        // Grade
        member_operator: "Operator",
        member_honors: "Honors",
        member_regular: "Regular",
        member_associate: "Associate",
        member_artist: "Artist",
        member_supporters: "Supporters",
        // Gender
        male: "Male",
        female: "Female",
        // Nation
        korea: "Republic of Korea",
        us: "United States of America",
        Translation: "Translate",
        Translated: "Translated",
    },
    app: {
        force_update: '애플리케이션을 새로운 버전으로 업데이트 해 주세요.\nPlease update the application to the new version.',
    },
    format: {
        date: "YYYY-MM-DD",
        date_time: "YYYY. MM. DD HH:mm",
        a_hour: "A h:mm",
        mont_a_time: "MM. DD A h:mm",
        date_a_time: "YYYY. MM. DD A h:mm",
    },
    calendar: {
        month_format: "yyyy/MM",
        date_format: "YYYY/MM/DD",
        time_format: "A h:mm",
        // Fix (No modification)
        day_name: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    login: {
        title: 'Login',
        hint: {
            email_address: 'e-mail Address',
            password: 'Password',
        },
        text: {
            password_forgot: 'Forgot your password?',
            account_not_have: "Don't have an account?",
        }
    },
    join: {
        title: 'Sign Up',
        account_settings: 'Account settings',
        nick_name: 'Nickname',
        id: 'ID',
        password: 'Password',
        password_confirm: 'Confirm Password',
        member_info: 'Profile',
        name: 'Name',
        gender: {
            title: 'Gender',
            male: 'Male',
            female: 'Female',
        },
        birth: 'Date of birth ',
        country: 'Country',
        phone: 'Mobile number',
        terms: {
            title: 'Agreement to terms and policies',
            service: 'Terms of Use',
            privacy: 'Privacy Statement',
        },
        hint: {
            nick_name: 'Please enter your nickname.',
            id: 'Please enter your email address.',
            password: 'Please enter a password.',
            password_confirm: 'Please enter the same password again.',
            name: 'Please enter your name. (legal name)',
            birth: 'Please enter your date of birth.',
            country: 'Please select a region.',
            phone_nation: 'Country code',
            phone_number: 'Please enter numbers only.',
        },
        text: {
            join_register_fill: 'Please fill in all of the fields below to sign up.',
            info_password: '8 or more characters in combination of alphabets, numbers, and special characters.',
            terms_confirm: 'Please agree to all of the following for membership registration.',
            terms_under_14_age: '[Required] Membership over the age of 14 can be registered.',
            terms_use: {
                first: '[Required] I agree to the Community ',
                last: '',
            },
            terms_privacy: {
                first: '[Required] I agree to the ',
                last: '',
            }
        }
    },
    auth: {
        code: 'Authentication code',
        code_resend: 'Resend authentication code',
        auth_email: 'Email authentication',
        reset_password: 'Reset password',
        change_password: 'Change password',
        new_password: 'New password',
        hint: {
            auth_code: 'Please enter your authentication code.',
        },
        text: {
            valid_time: 'Expiration time of authentication code : ',
            welcome: 'Welcome, {0} :D',
            auth_email: 'Please complete the email authentication by entering the authentication code sent to the email address you entered.',
            reset_password: 'Reset new password?\nIf you provide the ID of the account you signed up for, we will send you an email to reset your password.',
            change_password: {
                first: 'We sent you a authentication code (4 digits) to reset your password to your email address, ',
                second: '',
                third: 'Please enter the authentication code and new password you received by email.'
            }
        },
    },
    grade: {
        text_access: 'Sorry!\nThis space is for regular members only.',
        text_honors_access: 'Sorry!\nThis space is for honor members only.',
        btn_gradeup: 'Application for level up to regular members.',
    },
    country: {
        title: 'Select region',
        hint_search: 'Search for a region.',
    },
    community: {
        filter: {
            writer_title: 'Writer',
            writer_my_writing: 'My posts',
            writer_daniel: 'Kang Daniel',
            tag_title: 'Talk Talk Tag',
            tag_free_talk: '#FreeTalk',
            tag_cert_review: '#AuthenticationReview',
            tag_share_info: '#ShareInformation',
            text: {
                filter_title: 'Select conditions to search.'
            }
        },
        post: {
            talk_talk_title: 'Post Talk Talk',
            from_daniel_title: 'Post From Daniel',
            to_daniel_title: 'Post To Daniel',
            talk_title: 'Post Talk',
        },
    },
    keyword: {
        hint_search: 'Search with a keyword',
        recent_search: 'Recently searched keywords',
        all_clear: 'Delete all ',
        text: {
            all_clear: 'Would you like to delete all the searched keywords recently?',
        }
    },
    post: {
        tag_title: 'Tag',
        image_title: 'Image',
        video_title: 'Video',
        text: {
            attention: 'Posts that damage the healthy community culture may be deleted without a prior notice.',
            delete: 'Delete the post?',
        },
        hint: {
            enter_post: 'Enter a post.',
            enter_tag: 'Enter a tag',
            enter_video: 'Enter a YouTube link',
        }
    },
    comment: {
        title: 'Comment',
        hint: 'Leave a comment.',
        text: {
            already_delete: 'The comment has been deleted.',
            delete: 'Delete the comment?',
            input_message: 'Please enter comment.',
        }
    },
    declare: {
        title: 'Please select a reason for reporting',
        policy: 'Violation of fan community operation policy',
        spam_ad: 'Spam and advertisement',
        spread: 'Spamming',
        sensation_violence: 'Sexuality and violence',
        etc: 'Other reasons',
        hint: {
            reason: 'Please enter a reason for reporting.',
        },
        text: {
            select_reason: 'Please select a reason for reporting.',
        }
    },
    notice: {
        title: 'Notice',
    },
    schedule: {
        broadcast: 'Broadcast',
        event: 'Show&Event',
        album: 'Release',
        radio: 'Radio',
        anniversary: 'Anniversary',
        fan_sign: 'Fan signing event',
        etc: 'Others',
        text: {
            not: 'There is no schedule.',
        }
    },
    media: {
        title: 'Media',
        download: 'Download',
    },
    alarm: {
        list_title: 'Notification',
        read_all: 'Read all',
    },
    more: {
        my_writing: 'My post',
        my_comments: 'My comment',
        membership_level: 'Membership level',
        edit_my_information: 'Edit my information',
        rating_information: 'Rating information',
        change_password: 'Change password',
        logout: 'Log out',
        logout_question: 'Would you like to log out?',
        profile: {
            image_change_title: 'Choose how to change your profile picture.',
            select_album: 'Select photo from album',
            take_camera: 'Photo shoot',
            default_select_image: 'Change to default image',
            save_success: 'Your information has been saved.'
        },
        membershipinfo: {
            membership_systeminfo: 'Information on membership level system',
            regularmember_apply: 'Apply for regular membership',
            regularmember_applying: 'The application for regular membership in progress',
            regularmember_reject: 'Rejected on the application for regular membership',
            regularmember_desc: 'Conversion to regular membership is processed after the administrator\'s approval, and it may take time to confirm.',
            grade_up: "Level up",
            application_status: "The application status for regular membership"
        },
        membershiprequest: {
            selected: '(Selected)',
            input_answer: 'Please enter the answer',
            membership_desc: 'Please enter the answers to the questions below for conversion to Danity regular membership.\nConversion to regular membership is processed after the administrator\'s approval, and it may take time to confirm.',
            applying_desc: 'Level up application is stand by for conversion to Danity regular membership.\nPlease wait for a moment.',
            reject_desc: 'Conversion to regular membership Membership was rejected due to the following reasons.',
            try: 'Apply',
            retry: 'Apply again',
            error_input_answer: "Please enter your answer",
            answer_require: "[Required]",
            answer_select: "[Optional]",
            applying: 'Level up application in progress',
            reject: 'Rejected on level up ',
            reject_time: '- Time of rejection : ',
            reject_comment: '- Reason for rejection : ',
        },
        preferences: {
            title: 'Preferences',
            notification_settings: 'Notification settings',
            language_setting: 'App language setting',
            download_setting: 'Download over Wi-Fi only ',
            download_setting_desc: 'Download will be paused temporarily when the Wi-Fi is disconnected.',
            download_setting_desc2: 'It is also downloaded in mobile network environments, and data charges may apply.',
            translate_setting: 'Translated language ',
            select_language: 'Select the language you want to use',
        },
        version_info: {
            title: 'Version information',
            current_version: 'Current version',
            newest_version: 'This is the latest version.',
        },
        terms_policies: {
            title: 'Terms and policies',
            terms: 'Terms of Use',
            policies: 'Privacy Statement',
        },
        service_center: {
            title: "Customer center",
            faq: "FAQ",
            text: {
                need_help: 'Need help?',
            },
        },
        inquire: {
            title: "Inquiry",
            history: 'My inquiry history',
            answer_wait: 'Waiting for response',
            answer_complete: 'Response completed',
            text: {
                information: 'Do you have any questions?\nPlease write your inquiry in detail.\nThe administrator will respond after checking.',
                title: 'Please enter a title.',
                contents: 'Please write your inquiry in detail.',
            },
            hint: {
                title: 'Please enter a title.',
                contents: 'Please enter your content.',
            },
        },
        suggest: {
            title: "Suggestion",
            history: 'My suggestion history',
            text: {
                information: 'Do you have any suggestions?\nPlease write your suggestions in detail.\nWe will do our best to provide better service.',
                title: 'Please enter a title.',
                contents: 'Please write your suggestion in detail.',
            },
            hint: {
                title: 'Please enter a title.',
                contents: 'Please enter your content.',
            },
        },
        withdrawal: {
            title: "Cancel membership",
            title_1: "Hello {0}!",
            title_1_1: "We are sorry to see you go. Please check the following information to withdraw from KANGDANIEL community service.",

            title_2: "Information on the grace period of membership cancellation",
            title_2_1: "There is a 15 day grace period after the membership cancellation request. ",
            title_2_2: "You can recover your account if you request to withdraw your membership cancellation through email inquiry within this period.",
            title_2_3: "Please note that membership recovery is not possible after the grace period is passed.",

            title_3: "Information on deleting member information and post data",
            title_3_1: "Please note that all personal information and community activity records are destroyed and cannot be restored permanently after membership cancellation.",
            title_3_2: "It takes about 90 days for member’s personal information and post data to be completely deleted.",

            title_4: "Information on re-registration with the same account after membership cancellation",
            title_4_1: "You will be able to re-register using the same email and nickname after 90 days from membership cancellation. ",

            final_text: "If you have checked the important information for canceling membership,\nplease enter the password below and apply for membership cancellation.",
            do_withdrawal: "Cancel your membership?",
            done_withdrawal: "Membership cancellation is completed. ",
        }
    },
    banner: {
        mission: 'Official mission of Danity',
    },
    event: {
        detail: {
            title: 'Event notice',
            participate: 'Event participation',
            participate_verb: 'Participate in an event',
        },
        category: {
            notice: 'Notice',
            part: 'Participate',
        },
        status: {
            plan: 'Scheduled',
            progress: 'In progress',
            end: 'Ended',
            winner: 'Winner announcement',
            deadline: 'deadline',
        },
        filter: {
            writer_title: 'Writer',
            writer_my_writing: 'My posts on event participation',
            tag_title: 'Event tag',
            text: {
                filter_title: 'Please select a search option.'
            }
        }
    },
    kangdaniel: {
        title: "KANGDANIEL",
    },
    translateSetting: {
        title: "Setting the translation language",
        desc: "The selected language can be changed at any time in the “More+> Preferences> Translation Language” menu."
    },
    goods: {
        title: "Goods",
    },
    vote: {
        title: "Vote",
        doVote: "Vote",
        success: "Voting is now complete.",
        alreadyVote: "Voting has already been completed.",
        fillAll : "Please enter answers to all required questions.",
    },
    publicBroadCasting: {
        title: "Apply",
        doVote: "Apply",
        success: "Your application is complete.",
        alreadyVote: "You have already completed your application.",
        fillAll : "Please enter answers to all required questions.",
    },
    download: {
        reDownload: "Do you want to continue with previous downloads?",
    }
    ////////////////////////////////////////
}
