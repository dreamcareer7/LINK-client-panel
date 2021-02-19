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
          '#4282FE',
          '#d53711',
          '#f79400',
          '#43c643',
          '#950094',
          '#0097C1',
          '#d64374',

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
              fontSize: 14,
              padding: 12,
              fontWeight: 'bolder',
              fontColor: '#464646',
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
