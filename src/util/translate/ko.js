export default {

    ////////////////////////////////////////
    // MESSAGE
    ////////////////////////////////////////

    success: {
        auth: {
            email: {
                auth_complete: '메일 인증이 완료되었습니다.\n로그인해 주세요.',
                send_complete: '인증 메일이 발송되었습니다.\n메일함을 확인해 주세요.',
            },
            password: {
                change: "비밀번호가 변경되었습니다.",
                change_login: "비밀번호가 변경되었습니다.\n로그인해 주세요.",
            }
        },
        more: {
            profile: {
                complete: "정보가 저장되었습니다.",
            }
        },
        post: {
            complete: '게시글이 등록되었습니다.',
            save: '저장되었습니다.',
            delete: '게시글이 삭제되었습니다.',
            //
            inquire_complete: '문의사항이 등록되었습니다.',
            suggest_complete: '건의사항이 등록되었습니다.',
            blind: "게시글 블라인드 처리 안내",
        },
        comment: {
            delete: '댓글이 삭제되었습니다.',
        },
        file: {
            save_image: '사진이 저장되었습니다.',
            save_file: '파일이 저장되었습니다.',
            save_download_folder: '다운로드 폴더에 저장되었습니다.',
        },
        membership: {
            request_success: "정회원 신청이 완료되었습니다.",
        },
        clipboard: {
            email: '이메일 주소가 복사되었습니다.',
            post_contents: '게시글 내용을 복사했습니다.',
        },
    },
    error: {
        network: '네트워크 접속이 원활하지 않습니다.',
        auth: {
            login: {
                fail: '로그인에 실패했습니다.', // 기타사유
            },
            ////
            all_text: '모든 항목을 입력해주세요.',
            email: {
                confirm: '이메일 주소를 확인해주세요.',
                empty: '이메일 주소를 입력하세요.',
                not_sign: '가입되지 않은 계정입니다.',
                not_match: '이메일 주소 형식에 맞게 입력하세요.',
                not_complete: '이메일 인증이 완료되지 않았습니다.\n먼저 인증을 완료해 주세요.',
                already: '이미 가입된 이메일 주소입니다.',
                //
                time_over: '인증 시간이 만료되었습니다.\n다시 시도해 주세요.',
                not_match_code: '인증 코드가 일치하지 않습니다.',
                empty_code: '인증 코드를 입력해 주세요.',
                send_fail: '메일 발송에 실패했습니다.\n다시 시도해 주세요.',
            },
            nick_name: {
                confirm: '닉네임을 확인해주세요.',
                length: '이름을 2~15자 사이로 입력하세요.',
                not_used: '닉네임에 공백, 특수문자는 사용할 수 없습니다.',
                already: '이미 사용중인 닉네임입니다.',
                banned_word: '사용 불가능한 닉네임입니다.'
            },
            password: {
                confirm: '비밀번호를 확인해주세요.',
                empty: '비밀번호를 입력하세요.',
                not_match: '비밀번호가 일치하지 않습니다.',
                combi: '알파벳, 숫자, 특수기호를 조합하여 8~20자 입력하세요.',
            },
            password_confirm: {
                confirm: '비밀번호 확인란을 확인해주세요.',
                not_match: '비밀번호가 서로 일치하지 않습니다.',
                more: '비밀번호를 한 번 더 입력하세요.'
            },
            name: {
                confirm: '이름을 확인해주세요.',
                correct: '정확한 이름을 입력하세요.'
            },
            gender: {
                confirm: '성별을 확인해주세요.',
                select: '성별을 선택하세요.',
            },
            birth: {
                confirm: '생년월일을 확인해주세요.',
                correct: '정확한 생년월일을 입력하세요.',
                under_14_age: '만 14세 미만은 가입할 수 없습니다.',
            },
            country: {
                confirm: '지역을 확인해주세요.',
                select: '지역를 선택하세요.',
            },
            phone: {
                confirm: '휴대폰 번호를 확인해 주세요.',
                correct: '정확한 휴대폰 번호를 입력하세요.',
            },
            terms: {
                confirm: '이용약관 및 정책에 모두 동의해주세요.',
            },
        },
        list: {
            empty: '검색 결과가 없습니다.',
        },
        Failed: "실패했습니다. 다시 시도해주세요.",
        profile: {
            normal_image: '정상적인 이미지가 아닙니다.',
        },
        post: {
            link: '영상은 유튜브 링크만 공유 가능합니다.',
            title: '제목을 작성해주세요.',
            empty: '글 내용을 작성해주세요.',
            empty_detail: '내용을 자세히 작성해 주세요.',
            image_max: '사진은 최대 {0}장까지 등록 가능합니다.',
            image_resize_error: '선택한 사진은 크기 조정을 할 수 없습니다.'
        },
        declare: {
            min_length: '기타사유는 5자 이상 입력해주세요.',
        },
        file: {
            save_image: '사진 저장을 실패했습니다.',
            save_file: '파일 저장을 실패했습니다.',
        },
        membership_request: {
            disable_grade: '등업신청은 준회원만 가능합니다.',
            exist_request: '등업신청이 존재합니다.',
            type_error: '타입 오류,'
        },
    },

    ////////////////////////////////////////
    // WORD
    ////////////////////////////////////////

    common: {
        started: "Get Started",
        ok: "확인",
        done: "완료",
        cancel: "취소",
        send: "발송",
        resend: "재발송",
        change: "변경",
        save: "저장",
        post: "게시",
        apply: "신청하기",
        do_apply: "적용",
        update: "업데이트",
        modify: "수정하기",
        delete: "삭제하기",
        declare: "신고",
        declare_verb: "신고하기",
        more: '더보기',
        share: "공유",
        share_verb: "공유하기",
        detail: '자세히',
        copy: '복사',
        copy_text: '글 내용 복사하기',
        // Grade
        member_operator: "운영자",
        member_honors: "우등회원",
        member_regular: "정회원",
        member_associate: "준회원",
        member_artist: "아티스트",
        member_supporters: "서포터즈",
        // Gender
        male: "남성",
        female: "여성",
        // Nation
        korea: "대한민국",
        us: "미국",
        Translation: "번역",
        Translated: "번역됨",
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
        month_format: "yyyy년 MM월",
        date_format: "YYYY년 MM월 DD일",
        time_format: "A h:mm",
        // Fix (No modification)
        day_name: ['일', '월', '화', '수', '목', '금', '토'],
    },
    login: {
        title: '로그인',
        hint: {
            email_address: '이메일 주소',
            password: '비밀번호',
        },
        text: {
            password_forgot: '비밀번호를 잊으셨나요?',
            account_not_have: '계정이 없으신가요?',
        }
    },
    join: {
        title: '회원가입',
        account_settings: '계정 설정',
        nick_name: '닉네임',
        id: '아이디',
        password: '비밀번호',
        password_confirm: '비밀번호 확인',
        member_info: '회원 정보',
        name: '이름',
        gender: {
            title: '성별',
            male: '남성',
            female: '여성',
        },
        birth: '생년월일',
        country: '지역',
        phone: '휴대폰 번호',
        terms: {
            title: '약관 및 정책 동의',
            service: '이용약관',
            privacy: '개인정보 취급방침',
        },
        hint: {
            nick_name: '닉네임을 입력하세요.',
            id: '이메일 주소를 입력하세요.',
            password: '비밀번호를 입력하세요.',
            password_confirm: '비밀번호를 한 번 더 입력하세요.',
            name: '이름(실명)을 입력하세요.',
            birth: '생년월일을 입력하세요.',
            country: '지역을 선택하세요.',
            phone_nation: '국가코드',
            phone_number: '숫자만 입력하세요.',
        },
        text: {
            join_register_fill: '회원가입을 위해 아래 항목을 모두 입력해 주세요.',
            info_password: '알파벳, 숫자, 특수기호를 조합하여 8자 이상',
            terms_confirm: '회원가입을 위해 아래 내용에 모두 동의해 주세요.',
            terms_under_14_age: '[필수] 만14세 이상 회원가입 가능합니다.',
            terms_use: {
                first: '[필수] 커뮤니티 ',
                last: '에 동의합니다.',
            },
            terms_privacy: {
                first: '[필수] ',
                last: '에 동의합니다.',
            }
        }
    },
    auth: {
        code: '인증코드',
        code_resend: '인증코드 재발송',
        auth_email: '이메일 인증',
        reset_password: '비밀번호 재설정',
        change_password: '비밀번호 변경',
        new_password: '새 비밀번호',
        hint: {
            auth_code: '인증코드를 입력하세요.',
        },
        text: {
            valid_time: '인증코드 유효 시간 : ',
            welcome: '환영합니다, {0}님 :D',
            auth_email: '입력하신 이메일 주소로 전송된 인증코드를 입력하여 이메일 인증을 완료해주세요.',
            reset_password: '비밀번호를 재설정 하시겠어요?\n가입하신 계정의 아이디를 알려주시면, 비밀번호 재설정을 위한 메일을 발송해드리겠습니다.',
            change_password: {
                first: '이메일 주소, ',
                second: '로 비밀번호 재설정을 위한 인증코드(숫자 4자리)를 발송해드렸습니다.',
                third: '메일로 전송 받은 인증코드와 새 비밀번호를 입력해 주세요.'
            }
        },
    },
    grade: {
        text_access: '죄송해요!\n정회원을 위한 공간입니다.',
        text_honors_access: '죄송해요!\n우등회원을 위한 공간입니다.',
        btn_gradeup: '정회원 등업 신청하기',
    },
    country: {
        title: '지역 선택',
        hint_search: '지역을 검색해보세요.',
    },
    community: {
        filter: {
            writer_title: '작성자',
            writer_my_writing: '내 글',
            writer_daniel: '강다니엘',
            tag_title: 'Talk Talk 태그',
            tag_free_talk: '#자유토크',
            tag_cert_review: '#인증후기',
            tag_share_info: '#정보공유',
            text: {
                filter_title: '검색 조건을 선택해 주세요.'
            }
        },
        post: {
            talk_talk_title: 'Talk Talk 게시하기',
            from_daniel_title: 'From Daniel 게시하기',
            to_daniel_title: 'To Daniel 게시하기',
            talk_title: 'Talk 게시하기',
        },
    },
    keyword: {
        hint_search: '키워드를 검색해보세요.',
        recent_search: '최근 검색한 키워드',
        all_clear: '전체 삭제',
        text: {
            all_clear: '최근 검색한 키워드를\n모두 삭제 하시겠어요?',
        }
    },
    post: {
        tag_title: '태그',
        image_title: '사진',
        video_title: '영상',
        text: {
            attention: '건전한 커뮤니티 문화를 훼손하는 게시물은 예고 없이 삭제될 수 있습니다.',
            delete: '해당 게시글을 삭제 하시겠어요?',
        },
        hint: {
            enter_post: '게시글을 입력해주세요.',
            enter_tag: '태그 입력',
            enter_video: '유투브 영상 링크 입력',
        }
    },
    comment: {
        title: '댓글',
        hint: '댓글을 남겨보세요.',
        text: {
            already_delete: '삭제된 댓글입니다.',
            delete: '댓글을 삭제하시겠어요?',
            input_message: '댓글을 입력하세요.',
        }
    },
    declare: {
        title: '신고 사유를 선택하세요.',
        policy: '팬 커뮤니티 운영정책 위반',
        spam_ad: '스팸 및 광고',
        spread: '도배',
        sensation_violence: '선정성 또는 폭력성',
        etc: '기타 사유',
        hint: {
            reason: '신고 사유를 입력하세요.',
        },
        text: {
            select_reason: '신고 사유를 선택하세요.',
        }
    },
    notice: {
        title: '공지사항',
    },
    schedule: {
        broadcast: '방송',
        event: '공연&행사',
        album: '발매',
        radio: '라디오',
        anniversary: '기념일',
        fan_sign: '팬사인회',
        etc: '기타',
        text: {
            not: '일정이 없습니다.',
        }
    },
    media: {
        title: 'Media',
        download: 'Download',
    },
    alarm: {
        list_title: '알림',
        read_all: '모두 읽음',
    },
    more: {
        my_writing: '내 글',
        my_comments: '내 댓글',
        membership_level: '회원 등급',
        edit_my_information: '내 정보 수정',
        rating_information: '등급 정보',
        change_password: '비밀번호 변경',
        logout: '로그아웃',
        logout_question: '로그아웃 하시겠어요?',
        profile: {
            image_change_title: '프로필 사진 변경 방법을 선택하세요.',
            select_album: '앨범에서 사진 선택',
            take_camera: '사진 촬영',
            default_select_image: '기본 이미지로 변경',
            save_success: '정보가 저장되었습니다.'
        },
        membershipinfo: {
            membership_systeminfo: '등급 시스템 안내',
            regularmember_apply: '정회원 신청하기',
            regularmember_applying: '정회원 등업 신청 중',
            regularmember_reject: '정회원 등업 반려',
            regularmember_desc: '정회원 전환은 운영자의 승인을 거쳐 진행되며, 확인 시간이 소요될 수 있습니다.',
            grade_up: "등업",
            application_status: "정회원 신청 현황"
        },
        membershiprequest: {
            selected: '(선택됨)',
            input_answer: '정답을 입력하세요.',
            membership_desc: '다니티 정회원 전환을 위해,\n아래 질문에 대한 답변을 입력해 주세요. \n신청 완료 후 운영자의 승인을 거쳐 정회원으로 전환이 진행되며, 확인 시간이 소요될 수 있습니다.',
            applying_desc: '다니티 정회원 전환을 위해, 등업 신청 대기 중입니다.\n조금만 기다려주세요.',
            reject_desc: '아래와 같은 사유로 정회원 전환이 반려되었습니다.',
            try: '신청하기',
            retry: '다시 신청하기',
            error_input_answer: "답변을 입력해 주세요.",
            answer_require: "[필수]",
            answer_select: "[선택]",
            applying: '등업 신청 중',
            reject: '등업 반려',
            reject_time: '- 반려 일시 : ',
            reject_comment: '- 반려 사유 : ',
        },
        preferences: {
            title: '환경 설정',
            notification_settings: '알림 설정',
            language_setting: '앱 언어 설정',
            download_setting: 'Wi-Fi에서만 다운로드',
            download_setting_desc: 'Wi-Fi 연결이 해제되면 다운로드가 일시 중지됩니다.',
            download_setting_desc2: '모바일 네트위크 환경에서도 다운로드되며, 데이터 요금이 부과될 수 있습니다.',
            translate_setting: '번역 언어',
            select_language: '사용하실 언어를 선택하세요.',
        },
        version_info: {
            title: '버전 정보',
            current_version: '현재 버전',
            newest_version: '현재 최신버전입니다.',
        },
        terms_policies: {
            title: '약관 및 정책',
            terms: '이용약관',
            policies: '개인정보 취급방침',
        },
        service_center: {
            title: "고객센터",
            faq: "자주 묻는 질문",
            text: {
                need_help: '도움이 필요하신가요?',
            },
        },
        inquire: {
            title: "문의하기",
            history: '내 문의 내역',
            answer_wait: '답변 대기',
            answer_complete: '답변 완료',
            text: {
                information: '무엇이 궁금하신가요?\n문의하실 내용을 상세히 작성해 주세요.\n운영자가 확인 후 답변 드리겠습니다.',
                title: '제목을 입력하세요.',
                contents: '문의 내용을 자세히 적어주세요.',
            },
            hint: {
                title: '제목을 입력하세요.',
                contents: '내용을 입력하세요.',
            },
        },
        suggest: {
            title: "건의하기",
            history: '내 건의 내역',
            text: {
                information: '건의사항이 있으신가요?\n건의하실 내용을 상세히 작성해 주세요.\n보다 나은 서비스를 제공하기 위해 노력하겠습니다.',
                title: '제목을 입력하세요.',
                contents: '건의 내용을 자세히 적어주세요.',
            },
            hint: {
                title: '제목을 입력하세요.',
                contents: '내용을 입력하세요.',
            },
        },
        product_certification_detail: {
            title: '상품 인증내역',
            empty: "아직 인증된 상품 내역이 없습니다.",
            code_check: "코드 확인",
            code_hide: "코드 숨기기",
            serial_code: "시리얼 코드",
            certification_history: "상품 인증내역",
            Check_product_serial_code: "상품 시리얼 코드 확인",
            Check_product_serial_code_desc: "인증하신 상품의 시리얼 코드 확인을 위해 비밀번호를 입력해 주세요.",
        },
        withdrawal:{
            title: "회원탈퇴",
            title_1: "{0}님, 안녕하세요!",
            title_1_1: "회원 탈퇴하신다고 하니 아쉽습니다.\nKANGDANIEL 커뮤니티 서비스 탈퇴를 위해 아래 내용을 꼭 확인해 주세요.",

            title_2: "회원 탈퇴 유예기간 안내",
            title_2_1: "회원 탈퇴 신청 후 15일간 유예 기간이 있습니다. ",
            title_2_2: "이 기간 내에 이메일 문의를 통해 회원 탈퇴 철회를 신청하시는 경우 계정 복구가 가능합니다.",
            title_2_3: "유예기간이 경과되면 회원 복구는 불가능하니 주의해주세요.",

            title_3: "회원 정보 및 게시물 데이터 삭제 안내",
            title_3_1: "회원 탈퇴 후에는 개인 정보 및 커뮤니티 활동 기록 일체가 모두 파기되어 영구적으로 복구가 불가능하므로 주의하시기 바랍니다.",
            title_3_2: "회원 개인 정보 및 게시물 데이터가 완전히 삭제되기까지는 약 90일의 기간이 소요됩니다.",

            title_4: "탈퇴 후 동일 계정으로 재 가입 안내",
            title_4_1: "회원 탈퇴 90일 경과 시 동일한 이메일 및 닉네임을 사용하여 재 가입이 가능하게 됩니다.",

            final_text: "회원 탈퇴를 위한 중요 사항을 확인하셨다면,\n아래 비밀번호 입력 후 회원 탈퇴를 신청해 주세요.",
            do_withdrawal: "회원 탈퇴 하시겠습니까?",
            done_withdrawal: "회원 탈퇴 완료되었습니다.",
            password_error: "올바른 패스워드를 입력하세요.",
        }
    },
    banner: {
        mission: '다니티 공식 미션',
    },
    event: {
        detail: {
            title: '이벤트 공지',
            participate: '이벤트 참여',
            participate_verb: '이벤트 참여하기',
        },
        category: {
            notice: '공지',
            part: '참여',
        },
        status: {
            plan: '예정',
            progress: '진행중',
            end: '종료됨',
            winner: '당첨자 발표',
            deadline: '마감',
        },
        filter: {
            writer_title: '작성자',
            writer_my_writing: '내 이벤트 참여 게시물',
            tag_title: '이벤트 태그',
            text: {
                filter_title: '검색 조건을 선택해 주세요.'
            }
        }
    },
    kangdaniel: {
        title: "KANGDANIEL",
    },
    translateSetting: {
        title: "번역 언어 설정",
        desc: "선택한 언어는 “More+ > 환경설정 > 번역 언어” 메뉴에서 언제든 변경할 수 있습니다."
    },

    goods: {
        title: "Goods",
    },
    vote: {
        title: "투표",
        doVote: "투표하기",
        success: "투표가 완료되었습니다.",
        alreadyVote: "이미 투표를 완료하였습니다.",
        fillAll : "필수 질문에 대한 답변을 모두 입력해주세요.",
    },
    publicBroadCasting: {
        title: "신청",
        doVote: "신청하기",
        success: "신청이 완료되었습니다.",
        alreadyVote: "이미 신청을 완료하였습니다.",
        fillAll : "필수 질문에 대한 답변을 모두 입력해주세요.",
    },
    download: {
        reDownload: "이전 다운로드를 이어서 받으시겠습니까?",
    }

    ////////////////////////////////////////
}
