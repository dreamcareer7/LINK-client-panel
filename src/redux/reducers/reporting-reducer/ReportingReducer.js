import REPORT_REDUX_CONSTANT from '../../constants/reportReduxConstants/ReportReduxConstant';
import { getLabelFromValues } from '../../../helpers/chartHelper';
import { potentialMapperObject } from '../../../helpers/Mappers';

export const activityBreakdownGraphData = (state = [], action) => {
  switch (action.type) {
    case REPORT_REDUX_CONSTANT.GET_ACTIVITY_BREAKDOWN_GRAPH_DATA:
      return action.data;

    default:
      return state;
  }
};

const initialPipelineValuesGraphData = {
  labels: [],
  fillText: '$7,00,000',
  datasets: [
    {
      data: [],
      backgroundColor: ['#39C3BB', '#FCAB50', '#FF696A'],
    },
  ],
};

export const pipelineValuesGraphData = (state = initialPipelineValuesGraphData, action) => {
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

const initialConversationGraphData = {
  labels: ['AR', 'A to C', 'C to M', 'M to S'],
  datasets: [
    {
      data: [0, 0, 0, 0],
      backgroundColor: '#4282FE',
      datalabels: { display: false },
    },
  ],
};

export const conversationGraphData = (state = initialConversationGraphData, action) => {
  switch (action.type) {
    case REPORT_REDUX_CONSTANT.GET_CONVERSATION_GRAPH_DATA:
      return {
        ...state,
        datasets: [
          {
            data: [action.data.ar, action.data.aToC, action.data.cToM, action.data.MToS],
          },
        ],
      };

    default:
      return state;
  }
};
