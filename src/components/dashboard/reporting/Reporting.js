import React, { useEffect, useState } from 'react';
import './Reporting.scss';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivityBreakdownGraphData,
  getConversationGraphData,
  getPipelineValuesGraphData,
  getTotalSalesGraphData,
} from '../../../redux/actions/ReportingActions/ReportingAction';

function Reporting() {
  const totalSalesOptions = {
    backgroundColor: '#f9f9f9',
    legend: {
      display: false,
    },
    elements: { point: { radius: 0 } },
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
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
          },
          ticks: {
            min: 0,
            max: 250000,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
            callback: value =>
              value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }),
          },
        },
      ],
    },
  };

  const tooltips = [
    'This is the percentage of people who have accepted your connection invite, you should be aiming for a 35 - 45% acceptance rate.',
    'The number of conversations opened up based on the total invitations accepted, the goal is to achieve a 15 - 20% conversion.',
    'This is the number of conversations that have turned into meetings. The goal is to get this to a 25 - 35% conversion rate.',
    'The number of meetings that have turned into a sale. This depends on your sales process but 10 - 30% is considered a good rate.',
  ];

  const conversionsOptions = {
    backgroundColor: '#f9f9f9',
    legend: {
      display: false,
    },
    tooltips: {
      wrap: true,
      callbacks: {
        title(tooltipItem) {
          return tooltips[tooltipItem[0].index];
        },
        label() {
          return null;
        },
      },
    },
    elements: { point: { radius: 0 } },
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
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
          },
          ticks: {
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
      ],
    },
  };

  const pipelineOptions = {
    value: ['$10000', '$20000', '$52000'],
    labels: {
      render: 'value',
      fontSize: 14,
      fontStyle: 'bold',
      fontColor: '#fff',
      fontFamily: '"Lucida Console", Monaco, monospace',
    },
    cutoutPercentage: 65,
    backgroundColor: '#f9f9f9',
    legend: {
      position: 'left',
      align: 'start',
      pointRadius: '30',
      labels: {
        pointStyle: 'point',
        boxWidth: 30,
        boxHeight: 2,
        fontSize: 15,
        padding: 12,
        box: {
          height: 2,
        },
        fontColor: '#464646',
      },
      elements: { point: { radius: '10' } },
    },
  };

  const dispatch = useDispatch();

  const activityBreakdownGraph = useSelector(
    ({ activityBreakdownGraphData }) => activityBreakdownGraphData
  );
  const pipelineValuesGraph = useSelector(({ pipelineValuesGraphData }) => pipelineValuesGraphData);
  const conversionsData = useSelector(({ conversationGraphData }) => conversationGraphData);
  const totalSalesData = useSelector(({ totalSalesGraphData }) => totalSalesGraphData);

  const [startDate] = useState(new Date('2021-01-20T07:03:46.724').toISOString());
  const [endDate] = useState(new Date('2021-01-31T07:03:46.724Z').toISOString());

  useEffect(() => {
    const data = {
      startDate,
      endDate,
    };

    dispatch(getActivityBreakdownGraphData(data));
    dispatch(getPipelineValuesGraphData(data));
    dispatch(getConversationGraphData(data));
    dispatch(getTotalSalesGraphData(data));
  }, []);

  return (
    <>
      <div className="total-sales-container">
        <div className="common-title mb-10">TOTAL SALES GENERATED</div>
        <Line
          height={80}
          options={totalSalesOptions}
          data={
            totalSalesData && totalSalesData.data && totalSalesData.data.length === 0
              ? 'No Data Available'
              : totalSalesData
          }
        />
      </div>
      {activityBreakdownGraph && (
        <div className="activity-breakdown-container">
          <div className="common-title activity-label">ACTIVITY BREAKDOWN</div>
          <div className="d-flex justify-content-center w-100">
            <div className="activity-breakdown-circles-container">
              {activityBreakdownGraph.map(activity => (
                <div className="outer-circle">
                  <div className="middle-circle">
                    <div className="inner-circle">{activity.total}</div>
                  </div>
                  <div className="activity-breakdown-title">{activity._id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="conversions-pipeline-container">
        <div className="conversions-container">
          <div className="common-title mb-5">CONVERSIONS</div>
          <Bar
            options={conversionsOptions}
            data={
              conversionsData && conversionsData.data && conversionsData.data.length === 0
                ? 'No Data Available'
                : conversionsData
            }
          />
        </div>
        <div className="pipeline-container">
          <div className="common-title">PIPELINE VALUE</div>
          <Doughnut
            data={
              pipelineValuesGraph &&
              pipelineValuesGraph.data &&
              pipelineValuesGraph.data.length === 0
                ? 'No Data Available'
                : pipelineValuesGraph
            }
            options={pipelineOptions}
          />
        </div>
      </div>
    </>
  );
}

export default Reporting;
