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

export const activityBreakdownGraphData = (state = [], action) => {
  switch (action.type) {
    case REPORT_REDUX_CONSTANT.GET_ACTIVITY_BREAKDOWN_GRAPH_DATA:
      return action.data;

    default:
      return state;
  }
};

export const pipelineValuesGraphData = (state = initialActivityBreakdownGraphData, action) => {
  switch (action.type) {
    case REPORT_REDUX_CONSTANT.GET_PIPELINE_VALUES_GRAPH_DATA:
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
