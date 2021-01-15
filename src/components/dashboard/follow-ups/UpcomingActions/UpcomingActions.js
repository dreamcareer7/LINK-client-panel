import React, { useEffect, useMemo } from 'react';
import './UpcomingActions.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
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
    dispatch(getUpcomingActions(1, data));
  }, []);
  const onOpportunityClick = () => {
    history.push('./opportunityDetails');
  };
  const handlePageChange = page => {
    const data = {
      stages: [],
      likelyHoods: [],
    };
    dispatch(getUpcomingActions(page, data));
  };
  const allUpcomingActions = useSelector(state => state.followUps);
  const docs = useMemo(
    () => (allUpcomingActions && allUpcomingActions.docs ? allUpcomingActions.docs : null),
    [allUpcomingActions]
  );
  const upComingActions = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);

  const activePage = useMemo(() => (docs && docs.page ? docs.page : 1), [docs]);
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
      {upComingActions.length ? (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default UpcomingActions;
