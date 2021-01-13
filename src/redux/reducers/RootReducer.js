import { combineReducers } from 'redux';
import { followUps } from './follow-uo-reducer/FollowUpReducer';

const rootReducer = combineReducers({
  followUps,
});
export default rootReducer;
