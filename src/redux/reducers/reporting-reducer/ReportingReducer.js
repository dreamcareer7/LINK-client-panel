import REPORT_REDUX_CONSTANT from '../../constants/reportReduxConstants/ReportReduxConstant';
import { getLabelFromValues } from '../../../helpers/chartHelper';
import { potentialMapperObject } from '../../../helpers/Mappers';

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
        labels: action.data.map(e => getLabelFromValues(e._id, potentialMapperObject)),
        values: action.data.map(e => e.totalDealValue),
        datasets: [
          {
            data: action.data.map(e => e.totalDealValue),
            backgroundColor: ['#39C3BB', '#FCAB50', '#FF696A'],
          },
        ],
      };

    default:
      return state;
  }
};
