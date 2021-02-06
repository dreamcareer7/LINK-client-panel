import { combineReducers } from 'redux';
import { followUps, opportunityDetail } from './follow-up-reducer/FollowUpReducer';
import { opportunityNotes } from './follow-up-reducer/notesReducer/NotesReducer';
import { opportunityHistory } from './follow-up-reducer/historyReducer/HistoryReducer';
import { crms, crmsGraphData } from './crm-reducer/CRMReducer';
import { dashboardReducer } from './dashboard-reducer/DashboardReducer';
import { AccountReducer } from './account-reducer/AccountReducer';
import {
  activityBreakdownGraphData,
  conversationGraphData,
  pipelineValuesGraphData,
  totalSalesGraphData,
} from './reporting-reducer/ReportingReducer';
import { fcmReducer } from './fcm-reducer/FcmReducer';
import { cookieeReducer } from './cookiee-reducer/CookieeReducer';
import { clientErrorReducer } from './error -reducer/ClientErrorReducer';
import { popUpReducer } from './popup-reducer/PopupReducer';

const rootReducer = combineReducers({
  followUps,
  opportunityDetail,
  opportunityNotes,
  opportunityHistory,
  crms,
  crmsGraphData,
  dashboardReducer,
  AccountReducer,
  fcmReducer,
  cookieeReducer,
  clientErrorReducer,
  popUpReducer,
  activityBreakdownGraphData,
  pipelineValuesGraphData,
  conversationGraphData,
  totalSalesGraphData,
});
export default rootReducer;
