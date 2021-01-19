import React, { useEffect } from 'react';
import './OpportunityDetails.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  clearOpportunity,
  getOpportunity,
} from '../../../../../redux/actions/followUpAction/FollowUpAction';
import OpportunityData from './opprotunity-data/OpportunityData';
import Notes from './notes/Notes';
import History from './history/History';

function OpportunityDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onBack = () => {
    history.push('/followUps');
  };
  const { id } = useParams();
  const opportunity = useSelector(state => state.opportunityDetail);
  useEffect(() => {
    dispatch(getOpportunity(id));
    return () => {
      dispatch(clearOpportunity);
    };
  }, [id]);
  const goToLinkedInProfile = () => {
    window.location = `${opportunity.linkedInUrl}`;
  };

  return (
    <>
      <div className="opportunity-header">
        <div className="breadcrumb common-subtitle">
          <span onClick={onBack}>UPCOMING ACTIONS</span>
          <span> / OPPORTUNITY DETAILS</span>
        </div>
        <div className="buttons-row">
          <button type="submit" className="button success-button">
            SYNC
          </button>
          <button type="button" className="button danger-button">
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
              <Notes opprotunityNotes={opportunity.notes} />
            </>
          )}
        </div>
        {opportunity && <History />}
      </div>
    </>
  );
}

export default OpportunityDetails;
