import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { getLabelFromValues } from '../../helpers/chartHelper';
import { stageMapperObject } from '../../helpers/Mappers';

const DashboardChart = props => {
  const { title, chartData } = props;
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
        data: chartData && chartData.map(e => e.total),
      },
    ],
  };

  return (
    <div>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: title,
            fontSize: 20,
            fontColor: '#090944',
            position: 'top',
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

DashboardChart.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};

export default DashboardChart;
