import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import './Dashboard.scss';
import DatePicker from 'react-datepicker';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import dashboardLady from '../../../assets/images/dashboard_lady.png';
import totalInvites from '../../../assets/images/total_invites_sent.png';
import invitesAccepted from '../../../assets/images/invites_accepted.png';
import acceptanceRateImg from '../../../assets/images/acceptance_rate.png';
import totalLeadsImg from '../../../assets/images/total_leads.png';
import hoursSpent from '../../../assets/images/hours_spent_on_linkedIn.png';
import percentageOfLeads from '../../../assets/images/percentage_of_leads.png';
import totalPipelineValues from '../../../assets/images/total_pipeline_value.png';
import totalSalesGeneratedImg from '../../../assets/images/total_sales_generated.png';
import {
  changeDashboardDateValue,
  fetchPipeLine,
  getDashboardData,
  resetDashboardGraphData,
  resetFilterData,
  totalSalesDateFilter,
} from '../../../redux/actions/dashboardAction/DashboardAction';
import { getLabelFromValues } from '../../../helpers/chartHelper';
import { chartPotentialMapperObject } from '../../../helpers/Mappers';
import { usdConverter } from '../../../helpers/usdConverter';
import { errorNotification } from '../../../constants/Toast';
import { NumberCommaSeparator } from '../../../helpers/NumberCommaSeparator';
import Loader from '../../commonComponents/Loader/Loader';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
    document.getElementsByClassName('common-area')?.[0]?.scrollTo(0, 0);
  }, []);

  const accountInfo = useSelector(state => state?.AccountReducer);
  const { dashboardData, pipeline, totalSales, startDate, endDate } = useSelector(
    ({ dashboardReducer }) => dashboardReducer ?? {}
  );
  const startDateRef = useRef();
  const endDateRef = useRef();
  const {
    inviteSent,
    inviteAccepted,
    timeSpentInLinkedIn,
    acceptanceRate,
    opportunityCount,
    percentOfLeadsClosed,
    totalSalesGenerated,
  } = useMemo(() => dashboardData?.data ?? [], [dashboardData]);

  const pipelineState = {
    labels:
      pipeline && pipeline?.data && pipeline?.data?.data
        ? pipeline?.data?.data?.map(e => getLabelFromValues(e._id, chartPotentialMapperObject))
        : '',
    datasets: [
      {
        label:
          pipeline &&
          pipeline?.data &&
          pipeline?.data?.data &&
          pipeline?.data?.data?.map(e => e._id),
        backgroundColor: ['#39c3bb', '#fcab50', '#ff696a'],
        data:
          pipeline &&
          pipeline?.data &&
          pipeline?.data?.data &&
          pipeline?.data?.data?.map(e => (e.totalDealValue ? e.totalDealValue : '')),
        totalData:
          pipeline &&
          pipeline?.data &&
          pipeline?.data?.data &&
          pipeline?.data?.data?.map(e => (e.totalDealValueStr ? e.totalDealValueStr : '')),
      },
    ],
  };

  const highestPipeLineValue = pipeline?.data?.data
    ?.map(element => element?.totalDealValue)
    ?.reduce((previous, current) => {
      return Math.max(previous, current);
    }, 0);
  const totalSalesData = {
    labels: [''],
    datasets: [
      {
        backgroundColor: ['#6699ff'],
        data:
          totalSales?.data?.data?.salesGenerated > 0
            ? [totalSales?.data?.data?.salesGenerated]
            : [0],
      },
      {
        label: 'remaining',
        backgroundColor: ['#e0e0e0'],
        data:
          totalSalesGenerated - totalSales?.data?.data?.salesGenerated !== 0
            ? [totalSalesGenerated - totalSales?.data?.data?.salesGenerated]
            : [1 - totalSales?.data?.data?.salesGenerated],
      },
    ],
  };
  const dispatch = useDispatch();
  const pipelineOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [
        {
          categorySpacing: 0,
          gridLines: {
            display: false,
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#ffff',
            zeroLineWidth: 1.5,
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#464646',
            padding: 10,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: 'rgba(255, 255, 255, 0)',
            zeroLineColor: '#000',
            zeroLineWidth: 1.5,
          },
          ticks: {
            display: false,
            beginAtZero: true,
            min: 0,
            max: highestPipeLineValue,
          },
        },
      ],
    },
    plugins: {
      labels: {
        position: 'default',
        render: args => {
          const value = usdConverter(args.value);
          return value;
        },
        fontSize: '14',
        fontColor: '#07084b',
        fontStyle: 'bold',
      },
    },
  };

  const totalSalesOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 1.15,
          categorySpacing: 0,
          gridLines: {
            display: false,
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#ffff',
            zeroLineWidth: 1.5,
          },
          ticks: {
            beginAtZero: true,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#464646',
            padding: 3,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            drawBorder: false,
            color: 'rgba(255, 255, 255, 0)',
            zeroLineColor: '#000',
            zeroLineWidth: 1.5,
          },
          ticks: {
            display: false,
            paddingTop: 30,
            beginAtZero: true,
            min: 0,
            max: totalSalesGenerated,
          },
        },
      ],
    },
    plugins: {
      labels: {
        position: 'default',
        render: args => {
          const value = args.dataset?.label === 'remaining' ? '' : usdConverter(args.value);
          return value;
        },
        fontSize: '14',
        fontColor: '#07084b',
        fontStyle: 'bold',
      },
    },
  };

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(fetchPipeLine());
    dispatch(totalSalesDateFilter());
    return () => {
      dispatch(resetDashboardGraphData);
      dispatch(changeDashboardDateValue('startDate', null));
      dispatch(changeDashboardDateValue('endDate', null));
    };
  }, []);

  const changeStartDate = useCallback(newDate => {
    dispatch(changeDashboardDateValue('startDate', newDate));
  }, []);

  const changeEndDate = useCallback(newDate => {
    dispatch(changeDashboardDateValue('endDate', newDate));
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate && endDate && moment(endDate).isBefore(startDate)) {
        errorNotification('Please enter a valid date range');
      }
      endDate.setHours(23, 59, 59);
      const data = {
        startDate: startDate ? moment(startDate).toISOString() : '',
        endDate: endDate ? moment(endDate).toISOString() : '',
      };
      dispatch(totalSalesDateFilter(data));
    }
  }, [startDate, endDate]);

  const resetTotalSalesFilter = useCallback(() => {
    dispatch(changeDashboardDateValue('startDate', null));
    dispatch(changeDashboardDateValue('endDate', null));
    dispatch(resetFilterData());
    startDateRef.current.input.placeholder = 'dd/mm/yyyy';
    endDateRef.current.input.placeholder = 'dd/mm/yyyy';
  }, [startDate, endDate, startDateRef.current, endDateRef.current]);

  return (
    <>
      {Object.entries(dashboardData).length > 0 ? (
        <>
          <div className="welcome-container">
            <div>
              <div className="welcome-back-line">
                Welcome Back {accountInfo.client.data.firstName}
              </div>
              <div className="welcome-text">Here is a breakdown of your LinkedIn activity.</div>
            </div>
            <img src={dashboardLady} />
          </div>
          <div className="dashboard-data-graph-container">
            <div className="dashboard-data-container">
              <div className="dashboard-data-row">
                <div className="dashboard-data-row-item">
                  <img src={totalInvites} />
                  <div className="first-row-content">
                    <div className="dashboard-data-title">
                      Total Invites <br />
                      Sent
                    </div>
                    <div className="dashboard-data-value mt-1">
                      {NumberCommaSeparator(inviteSent)}
                    </div>
                  </div>
                </div>
                <div className="dashboard-data-row-item">
                  <img src={invitesAccepted} />
                  <div className="first-row-content">
                    <div className="dashboard-data-title">
                      Invites
                      <br />
                      Accepted
                    </div>
                    <div className="dashboard-data-value mt-1">
                      {NumberCommaSeparator(inviteAccepted)}
                    </div>
                  </div>
                </div>
                <div className="dashboard-data-row-item">
                  <img src={acceptanceRateImg} />
                  <div className="first-row-content">
                    <div className="dashboard-data-title">
                      Acceptance
                      <br />
                      Rate
                    </div>
                    <div className="dashboard-data-value mt-1">{acceptanceRate}%</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-data-row dashboard-data-second-row">
                <div className="dashboard-data-row-item">
                  <img src={totalLeadsImg} />
                  <div className="dashboard-second-row-content ml-10">
                    <div className="dashboard-data-title">
                      Active
                      <br />
                      Leads
                    </div>
                    <div className="dashboard-data-value">
                      {NumberCommaSeparator(opportunityCount)}
                    </div>
                  </div>
                </div>
                <div className="dashboard-data-row-item">
                  <img src={hoursSpent} />
                  <div className="dashboard-second-row-content ml-10">
                    <div className="dashboard-data-title">
                      Hours Spent <br />
                      on LinkedIn
                    </div>
                    <div className="dashboard-data-value">
                      {NumberCommaSeparator(timeSpentInLinkedIn)}
                    </div>
                  </div>
                </div>
                <div className="dashboard-data-row-item">
                  <img src={percentageOfLeads} />
                  <div className="dashboard-second-row-content ml-10">
                    <div className="dashboard-data-title">
                      Percentage of
                      <br />
                      Leads Closed
                    </div>
                    <div className="dashboard-data-value">{percentOfLeadsClosed}%</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-graphs-container">
                <div>
                  <div className="title">Total Pipeline Value</div>
                  <div className="d-flex align-items-center">
                    <img src={totalPipelineValues} />
                    <span className="dashboard-data-value ml-10">
                      {usdConverter(pipeline?.data?.totalDealAmount ?? 0)}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="title">Total Sales Generated</div>
                  <div className="d-flex align-items-center">
                    <img src={totalSalesGeneratedImg} />
                    <span className="dashboard-data-value ml-10">
                      {usdConverter(totalSalesGenerated)}
                    </span>
                  </div>
                  <div className="dashboard-total-sales-filter-container">
                    <div className="common-subtitle">SALES BETWEEN</div>
                    <DatePicker
                      ref={startDateRef}
                      placeholderText="dd/mm/yyyy"
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      onChange={changeStartDate}
                      className="common-input"
                      onFocus={e => {
                        e.target.placeholder = '';
                      }}
                      onBlur={e => {
                        e.target.placeholder = 'dd/mm/yyyy';
                      }}
                    />
                    <div className="common-subtitle">TO</div>
                    <DatePicker
                      ref={endDateRef}
                      placeholderText="dd/mm/yyyy"
                      dateFormat="dd/MM/yyyy"
                      selected={endDate}
                      onChange={changeEndDate}
                      className="common-input"
                      onFocus={e => {
                        e.target.placeholder = '';
                      }}
                      onBlur={e => {
                        e.target.placeholder = 'dd/mm/yyyy';
                      }}
                    />
                    <button
                      type="submit"
                      className="button slim-button"
                      onClick={resetTotalSalesFilter}
                    >
                      RESET
                    </button>
                  </div>
                </div>
                <div
                  className={`dashboard-graph ${
                    pipeline?.data?.data?.length === 0 && 'no-data-style'
                  }`}
                >
                  {pipeline?.data?.data?.length !== 0 ? (
                    <Bar options={pipelineOptions} data={pipelineState} />
                  ) : (
                    "Looks like you haven't added any opportunities in order for the graphs to populate."
                  )}
                </div>
                <div>
                  <div className="dashboard-graph total-sales-graph-container">
                    <Bar
                      key="totalSalesDataSalesGenerated"
                      options={totalSalesOptions}
                      data={totalSalesData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Dashboard;
