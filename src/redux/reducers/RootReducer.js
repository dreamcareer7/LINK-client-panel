import { combineReducers } from 'redux';
import { followUps, opportunityDetail } from './follow-uo-reducer/FollowUpReducer';
import { opportunityNotes } from './follow-uo-reducer/notesReducer/NotesReducer';

const rootReducer = combineReducers({
  followUps,
  opportunityDetail,
  opportunityNotes,
});
export default rootReducer;
