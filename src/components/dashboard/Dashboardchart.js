import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { getLabelFromValues } from '../../helpers/chartHelper';
import { stageMapperObject } from '../../helpers/Mappers';

const DashboardChart = props => {
  const { chartData } = props;
  const state = {
    labels: chartData && chartData.map(e => getLabelFromValues(e._id, stageMapperObject)),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#f79400',
          '#43c643',
          '#950094',
          '#0096c0',
          '#d64374',
          '#3264c8',
          '#d53711',
        ],
        data: chartData && chartData.map(e => (e.total !== 0 ? e.total : '')),
      },
    ],
  };

  return (
    <div>
      <Pie
        data={state}
        options={{
          legend: {
            display: true,
            position: 'left',
            align: 'start',
            labels: {
              fontSize: 17,
              padding: 15,
            },
          },
        }}
      />
    </div>
  );
};

DashboardChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};

export default DashboardChart;
