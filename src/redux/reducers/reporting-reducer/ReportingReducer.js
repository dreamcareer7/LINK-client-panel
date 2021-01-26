import REPORT_REDUX_CONSTANT from '../../constants/reportReduxConstants/ReportReduxConstant';

const initialActivityBreakdownGraphData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#4282FE',
    },
  ],
};

// eslint-disable-next-line import/prefer-default-export
export const activityBreakdownGraphData = (state = initialActivityBreakdownGraphData, action) => {
  switch (action.type) {
    case REPORT_REDUX_CONSTANT.GET_ACTIVITY_BREAKDOWN:
      return {
        ...state,
        labels: action.data.map(e => e.label),
        values: action.data.map(e => e.value),
        datasets: [
          {
            data: action.data.map(e => e.value),
            backgroundColor: '#4282FE',
          },
        ],
      };

    default:
      return state;
  }
};

export const pipelineValuesGraphData = (state = initialActivityBreakdownGraphData, action) => {
  switch (action.type) {
    case REPORT_REDUX_CONSTANT.GET_PIPELINE_VALUES:
      return {
        ...state,
        labels: action.data.map(e => e.label),
        values: action.data.map(e => e.value),
        datasets: [
          {
            data: action.data.map(e => e.value),
            backgroundColor: '#4282FE',
          },
        ],
      };

    default:
      return state;
  }
};
