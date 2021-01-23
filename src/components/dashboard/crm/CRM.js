import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import './CRM.scss';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker';
import user from '../../../assets/images/dummy-user.jpg';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';
import {
  getCRMGraphData,
  getFilteredCRMSAction,
} from '../../../redux/actions/crmActions/CRMAction';

const initialFilterState = {
  stage: null,
  stageIndex: null,
  likelyHoods: null,
  startDeal: null,
  endDeal: null,
  location: null,
  startDate: moment().subtract(30, 'days').toDate(),
  endDate: moment().toDate(),
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
      return initialFilterState;
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

  const [page, setPage] = useState(1);
  const [filter, dispatchFilter] = useReducer(filterReducer, initialFilterState);
  const crmsData = useSelector(({ crms }) => crms);
  const crmsChartState = useSelector(({ crmsGraphData }) => crmsGraphData);

  const docs = useMemo(() => (crmsData && crmsData.docs ? crmsData.docs : null), [crmsData]);
  const crmsArray = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  const activePage = useMemo(() => (docs && docs.page ? docs.page : 1), [docs]);
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
    dispatch(getCRMGraphData());
    dispatch(getFilteredCRMSAction(page));
  }, []);

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

  const handlePageChange = pageNum => {
    setPage(pageNum);
    const data = {
      stage,
      likelyHoods,
      startDeal,
      endDeal,
      location,
      startDate,
      endDate,
    };
    dispatch(getFilteredCRMSAction(pageNum, data));
  };

  const handleFilterApplyClick = () => {
    const data = {
      stage: stage || undefined,
      likelyHoods: likelyHoods && likelyHoods.length ? [likelyHoods] : undefined,
      startDeal: startDeal || undefined,
      endDeal: endDeal || undefined,
      location: location && location.trim().length > 0 ? location : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };
    dispatch(getFilteredCRMSAction(page, data));
  };

  const handleResetClick = () => {
    dispatchFilter({
      type: CRM_FILTER_REDUCER_ACTIONS.RESET_STATE,
    });
    dispatch(getFilteredCRMSAction(page));
  };

  return (
    <>
      <div className="common-subtitle">SALES OPPORTUNITIES</div>
      <div className="graph-container">
        <Bar options={options} data={crmsChartState} height={80} />
      </div>
      <div className="d-flex jc-bet ai-f-end">
        <div className="filter-container">
          <div className="filter-action-block">
            <div className="common-subtitle">LOCATION</div>
            <input
              placeholder="Location"
              className="common-input mt-5"
              name="location"
              value={location}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-action-block">
            <div className="common-subtitle">DATE RANGE</div>
            <div className="d-flex">
              <DatePicker
                placeholderText="From"
                className="common-input mt-5"
                value={moment(startDate).format('YYYY-MM-DD')}
                onChange={handleStartDateChange}
              />
              <DatePicker
                placeholderText="To"
                className="common-input mt-5 ml-10"
                value={moment(endDate).format('YYYY-MM-DD')}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
          {/* <div className="filter-action-block ">
            <div className="common-subtitle">DEAL VALUE</div>
          </div> */}
          <div className="filter-action-block">
            <div className="common-subtitle">LIKELY HOOD</div>
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
        </div>

        <div className="d-flex">
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
      {console.log(crmsData)}
      <div className="applied-filter-container">
        {docs && (
          <div>
            Showing {(docs.page - 1) * (docs.limit + 1)}-{docs.page * docs.limit} of {docs.total}{' '}
            results
          </div>
        )}
        {stageIndex &&
          crmsChartState.labels &&
          stageIndex > -1 &&
          stageIndex < crmsChartState.labels.length && (
            <div>
              <span>Opportunity Stage: </span>
              {crmsChartState.labels[stageIndex]}
            </div>
          )}
        {location && location.trim().length > 0 && (
          <div>
            <span>Location: </span>
            {location}
          </div>
        )}
        {likelyHoods && likelyHoods.trim().length > 0 && (
          <div>
            <span>Likely Hood: </span>
            {likelyHoodDropdownData.filter(e => e.value === likelyHoods).map(e => e.label)}
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
              profilePicUrl,
              firstName,
              lastName,
              location: userLocation,
              dealSize,
              createdAt,
            } = singleCrm;

            return (
              <div className="customer-list-rows">
                <div className="customer-name">
                  <img src={profilePicUrl || user} />
                  {`${firstName} ${lastName}`}
                </div>
                <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
                <div>{moment(createdAt).format('DD/MM/YYYY')}</div>
                <div>{userLocation}</div>
                <div>High Likely</div>
                <div>{dealSize}</div>
                <div className="table-action-field">
                  <img src={edit} className="mr-10" title="Edit" />
                  <img src={bin} title="Delete" />
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
