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
  const onOpportunityClick = id => {
    history.push(`/followUps/opportunityDetails/${id}`);
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

  console.log('upComingActions', upComingActions.length);
  return (
    <div>
      <div className="heading">Upcoming Actions</div>
      <div className="client-detail-page">
        <div className="client-detail-blocks-container">
          {upComingActions && upComingActions.length > 0 ? (
            upComingActions.map(opportunity => (
              <div onClick={() => onOpportunityClick(opportunity._id)}>
                <ClientDetailsBlock key={opportunity._id} opportunity={opportunity} />
              </div>
            ))
          ) : (
            <div>There is no data available</div>
          )}
        </div>
      </div>
      {upComingActions.length ? (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={docs.total || 1}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="Prev"
          nextPageText="Next"
          hideFirstLastPages="true"
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default UpcomingActions;
