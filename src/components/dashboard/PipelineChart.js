import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { getLabelFromValues } from '../../helpers/chartHelper';
import { potentialMapperObject } from '../../helpers/Mappers';

const DoughnutChart = props => {
  const { titles, chartData } = props;
  const state = {
    labels: chartData && chartData.map(e => getLabelFromValues(e._id, potentialMapperObject)),
    datasets: [
      {
        label: chartData && chartData.map(e => e._id),
        backgroundColor: ['#fcab50', '#ff696a', '#39c3bb'],
        data: chartData && chartData.map(e => e.total),
      },
    ],
  };
  return (
    <div>
      <Doughnut
        data={state}
        options={{
          plugins: {
            labels: {
              render: 'value',
            },
          },
          title: {
            display: true,
            text: titles,
            fontSize: 20,
            fontColor: '#090944',
            alignContent: 'left',
          },
          legend: {
            display: true,
            position: 'left',
          },
        }}
      />
    </div>
  );
};

DoughnutChart.propTypes = {
  titles: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};
export default DoughnutChart;
