import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import './Reporting.scss';
import { Bar, Chart, Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivityBreakdownGraphData,
  getConversationGraphData,
  getPipelineValuesGraphData,
  getTotalSalesGraphData,
} from '../../../redux/actions/ReportingActions/ReportingAction';

Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 14;
Chart.pluginService.register({
  beforeDraw(chart) {
    if (chart.config.options.elements.center) {
      // Get ctx from string
      const { ctx } = chart.chart;

      // Get options from the center object in options
      const centerConfig = chart.config.options.elements.center;
      const fontStyle = centerConfig.fontStyle || 'Arial';
      const txt = centerConfig.text;
      const color = centerConfig.color || '#000';
      const maxFontSize = centerConfig.maxFontSize || 75;
      const sidePadding = centerConfig.sidePadding || 20;
      const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      // Start with a base font of 30px
      ctx.font = `30px ${fontStyle}`;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = chart.innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let { minFontSize } = centerConfig;
      const lineHeight = centerConfig.lineHeight || 25;
      let wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = `${fontSizeToUse}px ${fontStyle}`;
      ctx.fillStyle = color;
      ctx.fontWeight = '900';

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      const words = txt.split(' ');
      let line = '';
      const lines = [];

      for (let n = 0; n < words.length; n + 1) {
        const testLine = `${line + words[n]} `;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = `${words[n]} `;
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      for (let num = 0; num < lines.length; num + 1) {
        ctx.fillText(lines[num], centerX, centerY);
        centerY += lineHeight;
      }
      // Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  },
});
function Reporting() {
  const totalSalesOptions = {
    backgroundColor: '#f9f9f9',
    legend: {
      display: false,
    },
    /* elements: { point: { radius: 0 } }, */
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
    layout: {
      padding: {
        top: 30,
      },
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
    /* elements: { point: { radius: 0 } }, */
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
  const pipelineRef = useRef();
  const pipelineOptions = {
    /* elements: {
      center: {
        text: '1',
        fontColor: 'red',
      },
    }, */
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
        fontSize: 14,
        padding: 12,
        box: {
          height: 2,
        },
        fontColor: '#464646',
      },
    },
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //
  //
  // }, [pipelineRef.current]);

  const activityBreakdownGraph = useSelector(
    ({ activityBreakdownGraphData }) => activityBreakdownGraphData
  );
  const pipelineValuesGraph = useSelector(({ pipelineValuesGraphData }) => pipelineValuesGraphData);
  const conversionsData = useSelector(({ conversationGraphData }) => conversationGraphData);
  const totalSalesData = useSelector(({ totalSalesGraphData }) => totalSalesGraphData);

  const [startDate] = useState(moment().subtract(5, 'days').format('YYYY-MM-DD'));
  const [endDate] = useState(moment().format('YYYY-MM-DD'));

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
            ref={pipelineRef}
            data={
              pipelineValuesGraph && pipelineValuesGraph.data
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
