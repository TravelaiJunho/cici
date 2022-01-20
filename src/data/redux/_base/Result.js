////////////////////////////////////////

const sendStatus = status => {
    return {
        type: status,
    };
};

const reset = type => {
    return sendStatus(type.RESET);
};

const start = type => {
    return sendStatus(type.START);
};

const complete = type => {
    return sendStatus(type.COMPLETE);
};

const success = type => {
    return sendStatus(type.SUCCESS);
};

const fail = type => {
    return sendStatus(type.FAILED);
};

////////////////////////////////////////

export default {
    reset, start, complete, success, fail,
};


