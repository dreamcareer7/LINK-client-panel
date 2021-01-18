import { combineReducers } from 'redux';
import { followUps, opportunityDetail } from './follow-uo-reducer/FollowUpReducer';

const rootReducer = combineReducers({
  followUps,
  opportunityDetail,
});
export default rootReducer;
