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
  const [startDate] = useState(moment().subtract(5, 'days').format('YYYY-MM-DD'));
  const [endDate] = useState(moment().format('YYYY-MM-DD'));
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
            max: totalSalesData.maximumGraphValue,
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
  /* const [toolTip, setToolTip] = useState(undefined);
  const showTooltip = tooltip => {
    if (tooltip.opacity === 0) {
      setToolTip(undefined);
    } else {
      setToolTip(tooltip);
    }
  };
  */
  /*  const getBody = bodyItem => {
    console.log(bodyItem.lines);
    return bodyItem.lines;
  }; */
  /* const tooltips = [
    'This is the percentage of people who have accepted your connection invite, you should be aiming for a 35 - 45% acceptance rate.',
    'The number of conversations opened up based on the total invitations accepted, the goal is to achieve a 15 - 20% conversion.',
    'This is the number of conversations that have turned into meetings. The goal is to get this to a 25 - 35% conversion rate.',
    'The number of meetings that have turned into a sale. This depends on your sales process but 10 - 30% is considered a good rate.',
  ];
*/
  const chartRef = React.createRef();
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
      wrap: true,
      /*     callbacks: {
        title(tooltipItem) {
          return tooltips[tooltipItem[0].index];
        },
        label() {
          return null;
        },
      }, */
      // Disable the on-canvas tooltip

      custom: tooltipModel => {
        // Tooltip Element
        let tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<label></label>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = '0';
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }
        console.log(tooltipModel);
        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title;
          console.log(titleLines);
          console.log(tooltipModel.title[0].index);
          //     const bodyLines = tooltipModel.body.map(getBody);
          let innerHtml = '<div>';
          titleLines.forEach((title, i) => {
            const colors = tooltipModel.labelColors[i];
            const width = '200px';
            let style = `background: ${colors.backgroundColor} `;
            style += `;width: ${width}`;
            innerHtml += `<span style="${style}">${title}</span>`;
          });
          innerHtml += '</div>';
          console.log(innerHtml);
          const labelRoot = tooltipEl.querySelector('label');
          if (labelRoot) {
            labelRoot.innerHTML = innerHtml;
          }
        }

        console.log(chartRef.current.chartInstance.canvas);

        // `this` will be the overall tooltip
        if (chartRef) {
          const position = chartRef.current.chartInstance.canvas.getBoundingClientRect();

          // Display, position, and set styles for font
          tooltipEl.style.opacity = '1';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = `${position.left + window.pageXOffset + tooltipModel.caretX}px`;
          tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY}px`;
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = `${tooltipModel.bodyFontSize}px`;
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
          tooltipEl.style.pointerEvents = 'none';
        }
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
  const numberToUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  const pipelineRef = useRef();

  const pipelineOptions = {
    elements: {
      center: {
        text: pipelineValuesGraph.totalDealAmount
          ? numberToUSD.format(pipelineValuesGraph.totalDealAmount)
          : '',
        color: '#07084B', // Default is #000000
        fontStyle: 'roboto', // Default is Arial
        fontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
        lineHeight: 1, // Default is 25 (in px), used for when text wraps
      },
    },
    plugins: {
      labels: {
        render: args => {
          console.log(args);
          return args.dataset.dataTotal[args.index];
        },
        fontStyle: 'normal',
        fontColor: '#ffffff',
        fontFamily: '"Lucida Console", Monaco, monospace',
        arc: true,
      },
    },
    aspectRatio: 1,
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
      display: false,
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

  useEffect(() => {
    document.title = 'Reporting';
  }, []);
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

  const pipelineLegendFunction = () => {
    const legendHtml = [];
    let legendLabel = [];
    legendLabel = pipelineValuesGraph.labels.map(label => label);
    legendHtml.push('<ul>');
    console.log(pipelineValuesGraph);
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

  /*
  const getPipelineTotalValues = () => {
    let total = 0;
    if (pipelineValuesGraph && pipelineValuesGraph.values) {
      total = pipelineValuesGraph.values.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    }
    return total;
  };
*/
  console.log(totalSalesData, 'data');
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
            ref={chartRef}
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
          {pipelineValuesGraph.values > 0 ? (
            <div className="no-data-style">
              <span>
                Looks like you haven&#39;t added any opportunities, head to your LinkedIn account to
                get started. Good luck!
              </span>
            </div>
          ) : (
            <div className="graph-legend-container">
              <div id="pipeline-reporting-legends" />
              <div className="graph">
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
