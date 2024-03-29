import React from 'react';
import PropTypes from 'prop-types';
import { Chart, Doughnut } from 'react-chartjs-2';
import { getLabelFromValues } from '../../helpers/chartHelper';
import { chartPotentialMapperObject } from '../../helpers/Mappers';
import 'chartjs-plugin-labels';

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

const DoughnutChart = props => {
  const { chartData } = props;

  const state = {
    labels:
      chartData && chartData.data.map(e => getLabelFromValues(e._id, chartPotentialMapperObject)),
    datasets: [
      {
        label: chartData && chartData.data.map(e => e._id),
        backgroundColor: ['#39c3bb', '#fcab50', '#ff696a'],
        data: chartData && chartData.data.map(e => (e.totalDealValue ? e.totalDealValue : '')),
        totalData:
          chartData && chartData.data.map(e => (e.totalDealValueStr ? e.totalDealValueStr : '')),
      },
    ],
  };

  return (
    <div>
      <Doughnut
        height={null}
        width={null}
        data={state}
        options={{
          aspectRatio: 1,
          plugins: {
            labels: {
              render: args => {
                return args.dataset.totalData[args.index];
              },
              fontStyle: 'normal',
              fontColor: '#ffffff',
              fontFamily: '"Lucida Console", Monaco, monospace',
              arc: true,
            },
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

DoughnutChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};
export default DoughnutChart;
