import analytics, {
  FirebaseAnalyticsTypes,
} from "@react-native-firebase/analytics";

export enum LOG_EVENT {
  // Predefined events
  SEARCH = "search",
  SELECT_CONTENT = "select_content",
  SCREEN_VIEW = "screen_view",
  SELECT_ITEM = "select_item",
  PURCHASE = "purchase",
  // Custom events
  SELECT_CONJUGATION = "select_conjugation",
  ADD_FAVORITE = "add_favorite",
  SELECT_FAV = "select_fav",
  REPORT_BUG = "report_bug",
  MAKE_SUGGESTION = "make_suggestion",
  SUBMIT_SURVEY = "submit_survey",
}

type LogEventVars =
  | {
      type: LOG_EVENT.SEARCH;
      params: FirebaseAnalyticsTypes.SearchEventParameters;
    }
  | {
      type: LOG_EVENT.SELECT_CONTENT;
      params: FirebaseAnalyticsTypes.SelectContentEventParameters;
    }
  | {
      type: LOG_EVENT.PURCHASE;
      params: FirebaseAnalyticsTypes.PurchaseEventParameters;
    }
  | {
      type: LOG_EVENT.SCREEN_VIEW;
      params: FirebaseAnalyticsTypes.ScreenViewParameters;
    }
  | {
      type: LOG_EVENT.SELECT_ITEM;
      params: FirebaseAnalyticsTypes.SelectItemEventParameters;
    }
  | {
      type:
        | LOG_EVENT.SELECT_CONJUGATION
        | LOG_EVENT.ADD_FAVORITE
        | LOG_EVENT.SELECT_FAV
        | LOG_EVENT.REPORT_BUG
        | LOG_EVENT.MAKE_SUGGESTION
        | LOG_EVENT.SUBMIT_SURVEY;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params: Record<string, any>;
    };

const logEvent = async (vars: LogEventVars): Promise<void> => {
  switch (vars.type) {
    case LOG_EVENT.SEARCH:
      await analytics().logSearch(vars.params);
      break;
    case LOG_EVENT.SELECT_CONTENT:
      await analytics().logSelectContent(vars.params);
      break;
    case LOG_EVENT.PURCHASE:
      await analytics().logPurchase(vars.params);
      break;
    case LOG_EVENT.SCREEN_VIEW:
      await analytics().logScreenView(vars.params);
      break;
    case LOG_EVENT.SELECT_ITEM:
      await analytics().logSelectItem(vars.params);
      break;
    default:
      await analytics().logEvent(vars.type, vars.params);
  }
};

export default logEvent;
