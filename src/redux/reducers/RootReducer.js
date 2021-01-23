import { combineReducers } from 'redux';
import { followUps, opportunityDetail } from './follow-up-reducer/FollowUpReducer';
import { opportunityNotes } from './follow-up-reducer/notesReducer/NotesReducer';
import { opportunityHistory } from './follow-up-reducer/historyReducer/HistoryReducer';
import { crms } from './crm-reducer/CRMReducer';
import { dashboardReducer } from './dashboard-reducer/DashboardReducer';
import { AccountReducer } from './account-reducer/AccountReducer';

const rootReducer = combineReducers({
  followUps,
  opportunityDetail,
  opportunityNotes,
  opportunityHistory,
  crms,
  dashboardReducer,
  AccountReducer,
});
export default rootReducer;
