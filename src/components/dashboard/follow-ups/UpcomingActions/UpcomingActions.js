import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './UpcomingActions.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ClientDetailsBlock from './ClientDetailsBlock/ClientDetailsBlock';
import { getUpcomingActions } from '../../../../redux/actions/followUpAction/FollowUpAction';

function UpcomingActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [limits, setLimits] = useState(9);

  useEffect(() => {
    if (document.getElementsByClassName('client-detail-page')[0].offsetWidth <= 963) {
      setLimits(10);
    } else {
      setLimits(9);
    }
  });

  useEffect(() => {
    const data = {
      stages: [],
      likelyHoods: [],
    };
    dispatch(getUpcomingActions(1, limits, data));
  }, [limits]);
  const onOpportunityClick = id => {
    history.push(`/followUps/opportunityDetails/${id}`);
  };

  const handlePageChange = useCallback(
    page => {
      const data = {
        stages: [],
        likelyHoods: [],
      };
      dispatch(getUpcomingActions(page, limits, data));
    },
    [limits]
  );
  const allUpcomingActions = useSelector(state => state.followUps);
  const docs = useMemo(
    () => (allUpcomingActions && allUpcomingActions.docs ? allUpcomingActions.docs : null),
    [allUpcomingActions]
  );
  const upComingActions = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);

  const activePage = useMemo(() => (docs && docs.page ? docs.page : 1), [docs]);

  return (
    <div>
      <div className="heading">Sales Opportunities</div>
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
          itemsCountPerPage={limits}
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
