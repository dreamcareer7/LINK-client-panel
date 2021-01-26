import React, { useEffect, useState } from 'react';
import './Reporting.scss';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivityBreakdownGraphData,
  getConversationGraphData,
  getPipelineValuesGraphData,
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
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
          },
        },
      ],
    },
  };
  const totalSalesData = {
    labels: [
      'Sep 20',
      'Oct 20',
      'Nov 20',
      'Dec 20',
      'Jan 21',
      'Feb 21',
      'Feb 21',
      'Mar 21',
      'Apr 21',
      'May 21',
      'Jun 21',
      'Jul 21',
      'Aug 21',
      'Sep 21',
      'Oct 21',
      'Nov 21',
      'Dec 21',
    ],
    datasets: [
      {
        data: [
          0,
          4000,
          16000,
          24000,
          38000,
          67000,
          101000,
          117000,
          124000,
          127000,
          156000,
          174000,
          205000,
          214000,
          228000,
          234000,
          246000,
        ],
        backgroundColor: '#4282FE',
        datalabels: { display: false },
      },
    ],
  };
  const conversionsOptions = {
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
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
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
      fontColor: '#000',
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
  }, []);

  return (
    <>
      <div className="total-sales-container">
        <div className="common-title mb-10">TOTAL SALES GENERATED</div>
        <Line height={80} options={totalSalesOptions} data={totalSalesData} />
      </div>
      {activityBreakdownGraph && (
        <div className="activity-breakdown-container">
          <div className="common-title">ACTIVITY BREAKDOWN</div>
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
      )}
      <div className="conversions-pipeline-container">
        <div className="conversions-container">
          <div className="common-title mb-5">CONVERSIONS</div>
          <Bar options={conversionsOptions} data={conversionsData} />
        </div>
        <div className="pipeline-container">
          <div className="common-title">PIPELINE VALUE</div>
          <Doughnut data={pipelineValuesGraph} options={pipelineOptions} />
        </div>
      </div>
    </>
  );
}

export default Reporting;
