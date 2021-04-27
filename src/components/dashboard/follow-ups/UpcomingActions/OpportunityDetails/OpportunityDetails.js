import React, { useEffect, useMemo, useState } from 'react';
import './OpportunityDetails.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  clearOpportunity,
  deleteOpportunity,
  getOpportunity,
  getOpportunityWithPrevNext,
  syncWithLinkedIn,
} from '../../../../../redux/actions/followUpAction/FollowUpAction';
import OpportunityData from './opprotunity-data/OpportunityData';
import History from './history/History';
import Notes from './notes/Notes';
// import { fetchConversation } from '../../../../../redux/actions/followUpAction/historyAction/HistoryAction';
import Modal from '../../../../commonComponents/Modal/Modal';
import Loader from '../../../../commonComponents/Loader/Loader';
import { resetFilterData } from '../../../../../redux/actions/filterAction/FilterAction';
import { useQueryParams } from '../../../../../helpers/GetQueryParamHook';

function OpportunityDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onBack = () => {
    history.push('/followups');
  };
  const { id } = useParams();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const opportunity = useSelector(state => state.opportunityDetail);
  const filterData = useSelector(state => state.filterReducer);
  const followupData = useSelector(state => state.followUps);

  console.log('filterData', filterData);

  const dealSizes = useMemo(
    () =>
      followupData && followupData.dealSize && followupData.dealSize[0]
        ? followupData.dealSize[0]
        : null,
    [followupData]
  );

  useEffect(() => {
    document.title = 'Opportunity Details';
    return () => {
      const dealData = {
        endDealValue: dealSizes?.maxDealValue || 999999999,
        startDealValue: dealSizes?.minDealValue || 1,
      };
      dispatch(resetFilterData(dealData));
    };
  }, []);

  const { from } = useQueryParams();

  useEffect(() => {
    if (from !== undefined && from === 'followUps' && filterData) {
      const dataVal = {
        currentOpportunityId: id,
        startDeal: filterData?.startDeal?.value ?? null,
        endDeal: filterData?.endDeal?.value ?? null,
        startDate: filterData?.startDate?.value ?? null,
        endDate: filterData?.endDate?.value ?? null,
        stages:
          Object.entries(filterData?.stageInitialState)
            .filter(data => data[1].value)
            .map(data => data[0]) ?? [],
        likelyHoods:
          Object.entries(filterData?.potentialInitialState)
            .filter(data => data[1].value)
            .map(data => data[0]) ?? [],
      };
      dispatch(getOpportunityWithPrevNext(dataVal));
    }
  }, [
    id,
    filterData,
    filterData.startDate.value,
    filterData.endDate.value,
    filterData.startDeal.value,
    filterData.endDeal.value,
    filterData.stageInitialState,
    filterData.potentialInitialState,
  ]);

  useEffect(() => {
    if (from === undefined && from !== 'followUps') {
      dispatch(getOpportunity(id));
    }
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

  const prevOpportunityFetch = () => {
    const prevOpportunityId = opportunity?.prevId ?? null;
    if (prevOpportunityId) {
      history.push({
        pathname: opportunity?.prevId,
        search: 'from=followUps',
      });
    }
  };
  const nextOpportunityFetch = () => {
    const nextOpportunityId = opportunity?.nextId ?? null;
    if (nextOpportunityId) {
      history.push({
        pathname: opportunity?.nextId,
        search: 'from=followUps',
      });
    }
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
              {from === 'followUps' && (
                <div className="prev-next-row">
                  <button
                    type="button"
                    className={`${!opportunity?.prevId ? 'button-disable' : 'page-link'}`}
                    onClick={prevOpportunityFetch}
                    disabled={!opportunity?.prevId}
                  >
                    prev
                  </button>
                  <button
                    type="button"
                    className={`${!opportunity?.nextId ? 'button-disable' : 'page-link'}`}
                    onClick={nextOpportunityFetch}
                    disabled={!opportunity?.nextId}
                  >
                    Next
                  </button>
                </div>
              )}
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
