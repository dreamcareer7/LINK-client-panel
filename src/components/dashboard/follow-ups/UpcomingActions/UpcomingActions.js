import React, { useEffect } from 'react';
import './UpcomingActions.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ClientDetailsBlock from './ClientDetailsBlock/ClientDetailsBlock';
import { getUpcomingActions } from '../../../../redux/actions/followUpAction/FollowUpAction';

function UpcomingActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const data = {
      stages: [],
      likelyHoods: [],
    };
    dispatch(getUpcomingActions(data));
  }, []);
  const onOpportunityClick = () => {
    history.push('./opportunityDetails');
  };
  const allUpcomingActions = useSelector(state => state.followUps);
  const upComingActions =
    allUpcomingActions &&
    allUpcomingActions.docs &&
    allUpcomingActions.docs.docs &&
    allUpcomingActions.docs.docs
      ? allUpcomingActions.docs.docs
      : [];
  return (
    <div>
      <div className="heading">Upcoming Actions</div>
      <div className="client-detail-blocks-container" onClick={onOpportunityClick}>
        {upComingActions ? (
          upComingActions.map(opportunity => (
            <ClientDetailsBlock key={opportunity._id} opportunity={opportunity} />
          ))
        ) : (
          <div>There is no data available</div>
        )}
      </div>
    </div>
  );
}

export default UpcomingActions;
