import React from 'react';
import './Reporting.scss';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

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
  const conversionsData = {
    labels: ['AR', 'A to C', 'C to M', 'M to S'],
    datasets: [
      {
        data: [0, 37, 55, 43],
        backgroundColor: '#4282FE',
        datalabels: { display: false },
      },
    ],
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
  const pipelineData = {
    labels: ['Very Likely Deals', 'Likely Deals', 'Not Likely Deals'],
    fillText: '$7,00,000',
    datasets: [
      {
        data: [43, 36, 21],
        backgroundColor: ['#39C3BB', '#FCAB50', '#FF696A'],
        datalabels: { display: false },
      },
    ],
  };

  return (
    <>
      <div className="total-sales-container">
        <div className="common-title mb-10">TOTAL SALES GENERATED</div>
        <Line height={80} options={totalSalesOptions} data={totalSalesData} />
      </div>
      <div className="activity-breakdown-container">
        <div className="common-title">ACTIVITY BREAKDOWN</div>
        <div className="activity-breakdown-circles-container">
          <div className="outer-circle">
            <div className="middle-circle">
              <div className="inner-circle">600</div>
            </div>
            <div className="activity-breakdown-title">INVITED</div>
          </div>
          <div className="outer-circle">
            <div className="middle-circle">
              <div className="inner-circle">240</div>
            </div>
            <div className="activity-breakdown-title">ACCEPTED</div>
          </div>
          <div className="outer-circle">
            <div className="middle-circle">
              <div className="inner-circle">36</div>
            </div>
            <div className="activity-breakdown-title">CONVERSATIONS</div>
          </div>
          <div className="outer-circle">
            <div className="middle-circle">
              <div className="inner-circle">18</div>
            </div>
            <div className="activity-breakdown-title">MEETINGS</div>
          </div>
          <div className="outer-circle">
            <div className="middle-circle">
              <div className="inner-circle">06</div>
            </div>
            <div className="activity-breakdown-title">DEALS CLOSED</div>
          </div>
          <div className="outer-circle">
            <div className="middle-circle">
              <div className="inner-circle">08</div>
            </div>
            <div className="activity-breakdown-title">DEALS LOST</div>
          </div>
        </div>
      </div>
      <div className="conversions-pipeline-container">
        <div className="conversions-container">
          <div className="common-title mb-5">CONVERSIONS</div>
          <Bar options={conversionsOptions} data={conversionsData} />
        </div>
        <div className="pipeline-container">
          <div className="common-title">PIPELINE VALUE</div>
          <Doughnut data={pipelineData} options={pipelineOptions} />
        </div>
      </div>
    </>
  );
}

export default Reporting;
