import { combineReducers } from 'redux';
import { followUps, opportunityDetail } from './follow-up-reducer/FollowUpReducer';
import { opportunityNotes } from './follow-up-reducer/notesReducer/NotesReducer';
import { opportunityHistory } from './follow-up-reducer/historyReducer/HistoryReducer';
import { crms, crmsGraphData } from './crm-reducer/CRMReducer';
import { dashboardReducer } from './dashboard-reducer/DashboardReducer';
import { AccountReducer } from './account-reducer/AccountReducer';
import { activityBreakdownGraphData } from './reporting-reducer/ReportingReducer';

const rootReducer = combineReducers({
  followUps,
  opportunityDetail,
  opportunityNotes,
  opportunityHistory,
  crms,
  crmsGraphData,
  dashboardReducer,
  AccountReducer,
  activityBreakdownGraphData,
});
export default rootReducer;
