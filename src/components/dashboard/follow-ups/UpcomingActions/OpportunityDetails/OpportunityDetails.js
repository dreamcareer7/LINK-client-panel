import React, { useEffect, useState } from 'react';
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
// import { fetchConversation } from '../../../../../redux/actions/followUpAction/historyAction/HistoryAction';
import Modal from '../../../../commonComponents/Modal/Modal';
import Loader from '../../../../commonComponents/Loader/Loader';

function OpportunityDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onBack = () => {
    history.push('/followups');
  };
  const { id } = useParams();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const opportunity = useSelector(state => state.opportunityDetail);
  console.log('opportunity', opportunity);
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
    // dispatch(fetchConversation(id, ''));
  };
  const deleteSyncClick = () => {
    setIsModelOpen(true);
  };
  const onClosePopup = () => {
    setIsModelOpen(false);
  };
  const onDeleteData = () => {
    setIsModelOpen(false);
    deleteOpportunity(id, history.goBack);
  };

  return (
    <>
      {isModelOpen && (
        <Modal
          description="Are you sure you want to delete this opportunity?"
          title="Delete Opportunity"
          deleteData={onDeleteData}
          onClosePopup={onClosePopup}
        />
      )}
      <div className="opportunity-header">
        <div className="breadcrumb common-subtitle">
          <span onClick={onBack}>Sales Opportunities</span>
          <span>&nbsp;{'> Contact Details'}</span>
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

      {opportunity && !opportunity.isVisited && (
        <div className="warning">
          <span>!</span>
          Only add opportunities that are good prospects, we don&apos;t recommend adding someone
          before a conversation has opened up on LinkedIn.
        </div>
      )}

      {opportunity ? (
        <>
          <div className="opportunity-container">
            <div className="opportunity-left">
              <OpportunityData opportunityData={opportunity} goToLinkedIn={goToLinkedInProfile} />
              <Notes />
            </div>
            <History />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default OpportunityDetails;
