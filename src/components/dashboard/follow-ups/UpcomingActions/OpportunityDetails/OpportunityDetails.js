import React, { useEffect } from 'react';
import './OpportunityDetails.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  clearOpportunity,
  deleteOpportunity,
  getOpportunity,
  syncWithLinkedIn,
} from '../../../../../redux/actions/followUpAction/FollowUpAction';
import OpportunityData from './opprotunity-data/OpportunityData';
import History from './history/History';
import Notes from './notes/Notes';
import { fetchConversation } from '../../../../../redux/actions/followUpAction/historyAction/HistoryAction';

function OpportunityDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onBack = () => {
    history.push('/followUps');
  };
  const { id } = useParams();
  const opportunity = useSelector(state => state.opportunityDetail);
  useEffect(() => {
    document.title = 'Opportunity Details';
  }, []);

  useEffect(() => {
    dispatch(getOpportunity(id));
    return () => {
      dispatch(clearOpportunity);
    };
  }, [id]);
  const goToLinkedInProfile = () => {
    window.open(`${opportunity.linkedInUrl}`, '_blank');
  };

  const onSyncClick = () => {
    dispatch(syncWithLinkedIn(id));
    dispatch(fetchConversation(id, ''));
  };
  const deleteSyncClick = () => {
    deleteOpportunity(id, history.goBack);
  };

  return (
    <>
      <div className="opportunity-header">
        <div className="breadcrumb common-subtitle">
          <span onClick={onBack}>UPCOMING ACTIONS</span>
          <span> / OPPORTUNITY DETAILS</span>
        </div>
        <div className="buttons-row">
          <button type="submit" className="button success-button btn-size" onClick={onSyncClick}>
            SYNC
          </button>
          <button type="button" className="button danger-button btn-size" onClick={deleteSyncClick}>
            DELETE OPPORTUNITY
          </button>
        </div>
      </div>

      <div className="warning">
        <span>!</span>
        Only add opportunities that are good prospects, we don&apos;t recommend adding someone
        before a conversation has opened up on LinkedIn.
      </div>

      <div className="opportunity-container">
        <div className="opportunity-left">
          {opportunity && (
            <>
              <OpportunityData opportunityData={opportunity} goToLinkedIn={goToLinkedInProfile} />
              <Notes />
            </>
          )}
        </div>
        {opportunity && <History />}
      </div>
    </>
  );
}

export default OpportunityDetails;
