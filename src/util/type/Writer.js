////////////////////////////////////////

import localize from "../Localize";

////////////////////////////////////////

/**
 * Writer code
 * ----
 * 1. 작성자
 * me = 내 글
 * artist = 강다니엘
 */
const WRITER_CODE = {
    ME: 'me',
    ARTIST: 'artist',
}

const WRITER_CODE_ME = [WRITER_CODE.ME]
const WRITER_CODE_ALL = [WRITER_CODE.ME, WRITER_CODE.ARTIST];

////////////////////////////////////////

export {
    WRITER_CODE_ME, WRITER_CODE_ALL,
}