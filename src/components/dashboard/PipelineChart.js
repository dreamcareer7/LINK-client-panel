import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { getLabelFromValues } from '../../helpers/chartHelper';
import { potentialMapperObject } from '../../helpers/Mappers';

const DoughnutChart = props => {
  const { chartData } = props;
  const filteredData = chartData.filter(e => e.total !== 0);
  const state = {
    labels: filteredData && filteredData.map(e => getLabelFromValues(e._id, potentialMapperObject)),
    datasets: [
      {
        label: filteredData && filteredData.map(e => e._id),
        backgroundColor: ['#fcab50', '#ff696a', '#39c3bb'],
        data: filteredData && filteredData.map(e => e.total),
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
              fontStyle: 'bold',
              fontColor: '#fff',
              fontFamily: '"Lucida Console", Monaco, monospace',
            },
          },
          legend: {
            display: true,
            position: 'left',
            align: 'start',
            fontStyle: 'bold',
            labels: {
              fontSize: 15,
              padding: 12,
            },
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
