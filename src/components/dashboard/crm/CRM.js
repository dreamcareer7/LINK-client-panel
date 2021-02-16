import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import './CRM.scss';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import user from '../../../assets/images/dummy-user.jpg';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';
import {
  getCRMGraphData,
  getFilteredCRMSAction,
} from '../../../redux/actions/crmActions/CRMAction';
import { deleteOpportunity } from '../../../redux/actions/followUpAction/FollowUpAction';
import { getLabelFromValues } from '../../../helpers/chartHelper';
import { potentialMapperObject } from '../../../helpers/Mappers';
import { errorNotification } from '../../../constants/Toast';

const initialFilterState = {
  stage: null,
  stageIndex: null,
  likelyHoods: 'select',
  startDeal: null,
  endDeal: null,
  location: '',
  startDate: null,
  endDate: null,
};

const CRM_FILTER_REDUCER_ACTIONS = {
  UPDATE_DATA: 'UPDATE_DATA',
  RESET_STATE: 'RESET_STATE',
};

function filterReducer(state, action) {
  switch (action.type) {
    case CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA:
      return {
        ...state,
        [`${action.name}`]: action.value,
      };
    case CRM_FILTER_REDUCER_ACTIONS.RESET_STATE:
      return { ...initialFilterState };
    default:
      return state;
  }
}

const likelyHoodDropdownData = [
  {
    label: 'Likely',
    value: 'LIKELY',
  },
  {
    label: 'Very Likely',
    value: 'VERY_LIKELY',
  },
  {
    label: 'Not Likely',
    value: 'NOT_LIKELY',
  },
];

function Crm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const crmsData = useSelector(({ crms }) => crms);
  const crmsChartState = useSelector(({ crmsGraphData }) => crmsGraphData);
  const [page, setPage] = useState(1);
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilterState);
  const [dataAdd, setDataAdd] = useState(false);

  const docs = useMemo(() => (crmsData && crmsData.docs ? crmsData.docs : null), [crmsData]);

  const dealSizes = useMemo(
    () => (crmsData && crmsData.dealSize && crmsData.dealSize[0] ? crmsData.dealSize[0] : null),
    [crmsData]
  );

  const crmsArray = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  const activePage = useMemo(() => (docs && docs.page ? docs.page : 1), [docs]);

  const [rangeState, setRangeState] = useState({
    min: dealSizes?.minDealValue || 0,
    max: dealSizes?.maxDealValue || 1000,
  });

  const {
    stage,
    stageIndex,
    likelyHoods,
    startDeal,
    endDeal,
    location,
    startDate,
    endDate,
  } = filter;

  const reloadCRMData = pageNum => {
    if (moment(startDate).isAfter(endDate)) {
      errorNotification('Please enter from date before to date');
    } else if (moment(endDate).isBefore(startDate)) {
      errorNotification('Please enter to date after from date');
    } else {
      const data = {
        stage: stage || undefined,
        likelyHoods:
          likelyHoods && likelyHoods.length && likelyHoods !== 'select' ? [likelyHoods] : undefined,
        startDeal: startDeal || undefined,
        endDeal: endDeal || undefined,
        location: location && location.trim().length > 0 ? location : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      };
      dispatch(getFilteredCRMSAction(pageNum, data));
    }
  };
  const handleStageChange = index => {
    const value = crmsChartState.values[index];

    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA,
      name: 'stageIndex',
      value: index,
    });
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA,
      name: 'stage',
      value,
    });

    const data = {
      stage: value,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };
    dispatch(getFilteredCRMSAction(page, data));
  };

  const chartClickCallback = useCallback(
    (event, element) => {
      if (element.length > 0) {
        const index = element[0]._index;

        handleStageChange(index);
      }
    },
    [crmsChartState]
  );

  const options = {
    backgroundColor: '#f9f9f9',
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
          },
          ticks: {
            beginAtZero: true,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'No. of Opportunities',
            fontColor: '#7f7f7f',
          },
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
          },
          ticks: {
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
        color: '#7f7f7f',
        labels: {
          title: {
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
      },
    },
    onClick: chartClickCallback,
  };

  useEffect(() => {
    const data = {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };

    dispatch(getCRMGraphData());
    dispatch(getFilteredCRMSAction(page, data));
  }, []);

  useEffect(() => {
    setRangeState({ min: dealSizes?.minDealValue || 0, max: dealSizes?.maxDealValue || 10 });
  }, [dealSizes?.minDealValue, dealSizes?.maxDealValue]);

  const handleFilterChange = event => {
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA,
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleStartDateChange = date => {
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA,
      name: 'startDate',
      value: date,
    });
  };

  const handleEndDateChange = date => {
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA,
      name: 'endDate',
      value: date,
    });
  };

  const handleRangePickerChange = value => {
    setRangeState(value);
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA,
      name: 'startDeal',
      value: value?.min || null,
    });
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.UPDATE_DATA,
      name: 'endDeal',
      value: value?.max || null,
    });
  };

  const handlePageChange = pageNum => {
    setPage(pageNum);
    reloadCRMData(pageNum);
  };

  const handleFilterApplyClick = () => {
    setDataAdd(true);
    reloadCRMData(page);
  };

  const handleResetClick = () => {
    const data = {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };
    setRangeState({
      min: dealSizes?.minDealValue || 0,
      max: dealSizes?.maxDealValue || 1000,
    });
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.RESET_STATE,
    });

    dispatch(getFilteredCRMSAction(page, data));
  };

  const handleEditCRMUser = id => {
    history.push(`/followUps/opportunityDetails/${id}`);
  };

  const handleDeleteCRMUser = id => {
    deleteOpportunity(id, () => reloadCRMData(page));
  };
  return (
    <>
      <div className="common-title">SALES OPPORTUNITIES</div>
      <div className="graph-container">
        <Bar options={options} data={crmsChartState} height={80} />
      </div>
      <div className="filter-container">
        <div>
          <div className="common-subtitle">LOCATION</div>
          <input
            placeholder="Location"
            className="common-input mt-5"
            name="location"
            value={location}
            onChange={handleFilterChange}
          />
        </div>
        <div className="mr-10">
          <div className="common-subtitle">DATE RANGE</div>
          <div className="d-flex">
            <DatePicker
              placeholderText="From"
              className="common-input mt-5"
              selected={startDate}
              onChange={handleStartDateChange}
            />
            <DatePicker
              placeholderText="To"
              className="common-input mt-5 ml-10"
              selected={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        {dealSizes && dealSizes.minDealValue && dealSizes.maxDealValue && (
          <div>
            <div className="common-subtitle">DEAL VALUE</div>
            <InputRange
              minValue={dealSizes.minDealValue || 0}
              maxValue={dealSizes.maxDealValue || 10}
              formatLabel={a => `$${a}`}
              onChange={handleRangePickerChange}
              value={rangeState}
            />
          </div>
        )}
        <div className="ml-10">
          <div className="common-subtitle">LIKELIHOOD</div>
          <select
            className="common-select mt-5"
            value={likelyHoods}
            onChange={handleFilterChange}
            name="likelyHoods"
          >
            <option value="">Select</option>
            {likelyHoodDropdownData.map(e => (
              <option value={e.value}>{e.label}</option>
            ))}
          </select>
        </div>
        <div className="filter-buttons-container">
          <button
            type="submit"
            className="button success-button slim-button mr-10"
            onClick={handleFilterApplyClick}
          >
            APPLY
          </button>
          <button
            type="button"
            className="button primary-button slim-button"
            onClick={handleResetClick}
          >
            RESET
          </button>
        </div>
      </div>
      <div className="applied-filter-container">
        {docs && (
          <div>
            Showing {(docs.page - 1) * (docs.limit + 1)}-
            {docs.total < docs.page * docs.limit ? docs.total : docs.page * docs.limit} of{' '}
            {docs.total} results
          </div>
        )}
        {crmsChartState.labels &&
          stageIndex !== undefined &&
          stageIndex !== null &&
          stageIndex > -1 &&
          stageIndex < crmsChartState.labels.length && (
            <div>
              <span>Opportunity Stage: </span>
              {crmsChartState.labels[stageIndex]}
            </div>
          )}
        {dataAdd && location && location.trim().length > 0 && (
          <div>
            <span>Location: </span>
            {location}
          </div>
        )}
        {dataAdd && likelyHoods && likelyHoods !== 'select' && likelyHoods.trim().length > 0 && (
          <div>
            <span>Likely Hood: </span>
            {likelyHoodDropdownData
              .filter(e => e.value === likelyHoods && e.value !== 'select')
              .map(e => e.label)}
          </div>
        )}
      </div>

      {crmsArray && crmsArray.length > 0 ? (
        <>
          <div className="customer-list-heading">
            <div>NAME</div>
            <div>DATE ADDED</div>
            <div>FOLLOW-UP DATE</div>
            <div>LOCATION</div>
            <div>POTENTIAL</div>
            <div>DEAL VALUE</div>
            <div />
          </div>
          {crmsArray.map(singleCrm => {
            const {
              _id,
              profilePicUrl,
              firstName,
              lastName,
              location: userLocation,
              dealSize,
              createdAt,
              likelyHood,
            } = singleCrm;

            return (
              <div>
                <div className="customer-list-rows">
                  <div className="customer-name">
                    <img src={profilePicUrl || user} />
                    {`${firstName} ${lastName}`}
                  </div>
                  <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
                  <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
                  <div>{userLocation}</div>
                  <div>{getLabelFromValues(likelyHood, potentialMapperObject)}</div>
                  <div>{dealSize}</div>
                  <div className="table-action-field">
                    <img
                      src={edit}
                      className="mr-10"
                      title="Edit"
                      onClick={() => handleEditCRMUser(_id)}
                    />
                    <img src={bin} title="Delete" onClick={() => handleDeleteCRMUser(_id)} />
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
            activePage={activePage}
            itemsCountPerPage={9}
            totalItemsCount={docs.total || 1}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </>
      ) : (
        <>
          <div className="row-container">
            <div style={{ textAlign: 'center', marginTop: '5vh' }}>No Data Found!</div>
          </div>
        </>
      )}
    </>
  );
}

export default Crm;
