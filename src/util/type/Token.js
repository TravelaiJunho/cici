////////////////////////////////////////

const createTokenData = (refresh, access) => {
    return {
        token: {
            refresh: refresh,
            access: access,
        },
    }
}

////////////////////////////////////////
export {
    createTokenData
}