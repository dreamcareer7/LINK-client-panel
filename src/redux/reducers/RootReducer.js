import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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
import { filterReducer } from './filter-reducer/FilterReducer';
import { strategy } from './strategy-reducer/strategyReducer';

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
  filterReducer,
  strategy,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filterReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
