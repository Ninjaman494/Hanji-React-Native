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

/**
 * AsyncStorage key for whether the rating request
 * dialog has been shown
 */
export const SHOWN_KEY = "ALREADY_SHOWN";
