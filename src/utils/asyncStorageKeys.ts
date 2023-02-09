/**
 * AsyncStorage key for user id which is synced
 * between Sentry,RevenueCat, and Firebase
 */
export const USER_ID_KEY = "USER_ID";
/**
 * AsyncStorage key for favorite conjugations,
 * which is stored as a JSON string
 */
export const FAVORITES_KEY = "@favorites_Key";

/**
 * AsyncStorage key for the previous version of
 * the app. Used for showing changelog
 */
export const LAST_VERSION_KEY = "LAST_VERSION";
/**
 * AsyncStorage key for the number of times the
 * user has opened the app.
 */
export const SESSIONS_KEY = "NUM_SESSIONS";

/**
 * AsyncStorage key for whether we've fetched
 * the user's purchase history from RevenueCat
 */
export const RESTORED_KEY = "RESTORED_PURCHASES";

/* ---------- Survey Related keys ---------- */

/**
 *  AsyncStorage key for whether the survey has
 * been filled out
 */
export const FILLED_OUT_KEY = "FILLED_OUT";
/**
 * AsyncStorage key for when user was last
 * asked to fill out the survey, as a date string
 */
export const LAST_ASKED_KEY = "LAST_ASKED";
/**
 * AsyncStorage key for whether the survey has
 * already been shown
 */
export const SHOWN_KEY = "ALREADY_SHOWN";
/**
 * AsyncStorage key for the survey state, which
 * should be one of SurveyState
 */
export const SURVEYS_KEY = "NUM_SURVEYS";
