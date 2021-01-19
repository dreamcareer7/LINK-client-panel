import { combineReducers } from 'redux';
import { followUps, opportunityDetail } from './follow-up-reducer/FollowUpReducer';
import { opportunityNotes } from './follow-up-reducer/notesReducer/NotesReducer';
import { opportunityHistory } from './follow-up-reducer/historyReducer/HistoryReducer';

const rootReducer = combineReducers({
  followUps,
  opportunityDetail,
  opportunityNotes,
  opportunityHistory,
});
export default rootReducer;
