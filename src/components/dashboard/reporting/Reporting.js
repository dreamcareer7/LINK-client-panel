import React, { createRef, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import './Reporting.scss';
import { Bar, Chart, Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivityBreakdownGraphData,
  getConversationGraphData,
  getPipelineValuesGraphData,
  getTotalSalesGraphData,
  resetReportingGraphData,
} from '../../../redux/actions/ReportingActions/ReportingAction';
import 'chartjs-plugin-labels';

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
  const activityBreakdownGraph = useSelector(
    ({ activityBreakdownGraphData }) => activityBreakdownGraphData
  );
  const pipelineValuesGraph = useSelector(({ pipelineValuesGraphData }) => pipelineValuesGraphData);
  const conversionsData = useSelector(({ conversationGraphData }) => conversationGraphData);
  const totalSalesData = useSelector(({ totalSalesGraphData }) => totalSalesGraphData);
  const [startDate] = useState(moment().subtract(5, 'days').format('DD/MM/YYYY'));
  const [endDate] = useState(moment().format('DD/MM/YYYY'));
  const totalSalesOptions = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 2,
            tickMarkLength: 1,
          },
          ticks: {
            beginAtZero: true,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
            padding: 10,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 2,
            tickMarkLength: 1,
          },
          ticks: {
            min: 0,
            max: totalSalesData.maximumGraphValue,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
            padding: 10,
            callback: value =>
              value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
              }),
          },
        },
      ],
    },
  };

  const _chartRef = createRef();

  const tooltips = [
    'This is the percentage of people who have accepted your connection invite, you should be aiming for a 35 - 45% acceptance rate.',
    'The number of conversations opened up based on the total invitations accepted, the goal is to achieve a 15 - 20% conversion.',
    'This is the number of conversations that have turned into meetings. The goal is to get this to a 25 - 35% conversion rate.',
    'The number of meetings that have turned into a sale. This depends on your sales process but 10 - 30% is considered a good rate.',
  ];

  const onHandleCustomTooltips = tooltipModel => {
    let tooltipEl = document.getElementById('chartjs-tooltip');
    const chart = _chartRef.current;
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = '<table></table>';
      document.body.appendChild(tooltipEl);
    }

    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    const index = tooltipModel && tooltipModel.dataPoints && tooltipModel.dataPoints[0].index;
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      let innerHtml = '<thead>';

      titleLines.forEach(() => {
        innerHtml += `<tr><th>${tooltips[index]}</th></tr>`;
      });
      innerHtml += '</thead><tbody>';

      innerHtml += '</tbody>';
      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }
    const position = chart.chartInstance.canvas.getBoundingClientRect();

    tooltipEl.style.opacity = 1;

    tooltipEl.style.left = `${position.left + tooltipModel.x}px`;
    tooltipEl.style.top = `${position.top + tooltipModel.y / 1.5}px`;
    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipEl.style.fontSize = `${tooltipModel.bodyFontSize}px`;
    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
  };

  const conversionsOptions = {
    backgroundColor: '#00A8FF',
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 30,
      },
    },
    tooltips: {
      enabled: false,
      mode: 'nearest',
      custom: tooltipModel => onHandleCustomTooltips(tooltipModel),
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
            tickMarkLength: 1,
          },
          ticks: {
            beginAtZero: true,
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
            padding: 10,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
            zeroLineColor: '#212152',
            zeroLineWidth: 1.5,
            tickMarkLength: 1,
          },
          ticks: {
            fontSize: 14,
            fontStyle: 700,
            fontColor: '#212152',
            suggestedMin: 50,
            suggestedMax: 100,
            padding: 10,
          },
        },
      ],
    },
  };
  const numberToUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  const pipelineRef = useRef();

  const pipelineOptions = {
    plugins: {
      labels: {
        render: args => {
          return args.dataset.dataTotal[args.index];
        },
        fontStyle: 'normal',
        fontColor: '#ffffff',
        fontFamily: '"Lucida Console", Monaco, monospace',
        arc: true,
      },
    },
    aspectRatio: 1,
    cutoutPercentage: 65,
    legend: {
      display: false,
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      startDate,
      endDate,
    };
    document.title = 'Reporting';

    dispatch(getActivityBreakdownGraphData(data));
    dispatch(getPipelineValuesGraphData(data));
    dispatch(getConversationGraphData(data));
    dispatch(getTotalSalesGraphData(data));
    return () => {
      dispatch(resetReportingGraphData);
    };
  }, []);

  const pipelineLegendFunction = () => {
    const legendHtml = [];
    let legendLabel = [];
    legendLabel = pipelineValuesGraph.labels.map(label => label);
    legendHtml.push('<ul>');
    if (pipelineValuesGraph && pipelineValuesGraph.datasets[0].dataTotalPer) {
      pipelineValuesGraph.datasets[0].dataTotalPer.forEach((record, index) => {
        legendHtml.push('<li>');
        legendHtml.push(
          `<div className="chart-legend" style="background-color: ${
            pipelineValuesGraph.datasets[0].backgroundColor[index]
          }">${record === '' ? 0 : record}</div>`
        );
        legendHtml.push(
          `<label className="chart-legend-label-text">
            ${legendLabel[index]}
          </label>`
        );
        legendHtml.push('<li>');
      });
    }
    legendHtml.push('</ul>');
    return legendHtml.join('');
  };

  useEffect(() => {
    if (
      pipelineValuesGraph &&
      pipelineValuesGraph.datasets[0].data &&
      pipelineValuesGraph.datasets[0].data.length > 0
    ) {
      const element = document.getElementById('pipeline-reporting-legends');
      if (element) {
        element.innerHTML = pipelineLegendFunction();
      }
    }
  }, [pipelineValuesGraph]);
  return (
    <>
      <div className="total-sales-container">
        <div className="common-title mb-10">TOTAL SALES GENERATED</div>
        <Line
          height={80}
          options={totalSalesOptions}
          data={
            totalSalesData &&
            totalSalesData.datasets?.data &&
            totalSalesData.datasets?.data.length === 0
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
            ref={_chartRef}
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
          {pipelineValuesGraph &&
          pipelineValuesGraph.values &&
          pipelineValuesGraph.values.length === 0 ? (
            <div className="no-data-style">
              <span className="text-center">
                Looks like you haven&#39;t added any opportunities, head to your LinkedIn account to
                get started. Good luck!
              </span>
            </div>
          ) : (
            <div className="graph-legend-container">
              <div id="pipeline-reporting-legends" />
              <div className="graph">
                <div className="graph-center-text">
                  {numberToUSD.format(pipelineValuesGraph.totalDealAmount)}
                </div>
                <Doughnut
                  height={null}
                  width={null}
                  ref={pipelineRef}
                  data={pipelineValuesGraph}
                  options={pipelineOptions}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Reporting;
