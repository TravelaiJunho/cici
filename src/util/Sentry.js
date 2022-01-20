////////////////////////////////////////
// IMPORT
////////////////////////////////////////

// import * as Sentry from "@sentry/react-native";

////////////////////////////////////////
// FUNCTION
////////////////////////////////////////

const init = _ => {
    // Sentry.init({
    //     dsn: "https://a7fbf1904b6b4634938d0040afeca624@o495367.ingest.sentry.io/5567964",
    //     debug: true,
    // });
}

const message = text => {
    // Sentry.captureMessage(text)
}

const exception = e => {
    // Sentry.captureException(e)
}

////////////////////////////////////////
export default {
    init,
    message, exception
}
