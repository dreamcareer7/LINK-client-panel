import REPORT_REDUX_CONSTANT from '../../constants/reportReduxConstants/ReportReduxConstant';
import { getLabelFromValues } from '../../../helpers/chartHelper';
import { chartPotentialMapperObject } from '../../../helpers/Mappers';

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
      // eslint-disable-next-line no-case-declarations
      const filteredData = action.data;
      return {
        ...state,
        labels: filteredData.data.map(e => getLabelFromValues(e._id, chartPotentialMapperObject)),
        values: filteredData.data.map(e => e.totalDealValue),
        totalDealAmount: filteredData.totalDealAmount,
        datasets: [
          {
            data: filteredData.data.map(e => (e.totalDealValue ? e.totalDealValue : '')),
            backgroundColor: ['#39C3BB', '#FCAB50', '#FF696A'],
            dataTotal: filteredData.data.map(e => (e.totalDealValueStr ? e.totalDealValueStr : '')),
            dataTotalPer: filteredData.data.map(e =>
              e.totalDealValuePer ? e.totalDealValuePer : ''
            ),
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
    case REPORT_REDUX_CONSTANT.RESET_CONVERSATION_GRAPH_DATA:
      return initialConversationGraphData;
    default:
      return state;
  }
};

const initialTotalSalesGraphData = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#4282FE',
      datalabels: { display: false },
    },
  ],
};

export const totalSalesGraphData = (state = initialTotalSalesGraphData, action) => {
  switch (action.type) {
    case REPORT_REDUX_CONSTANT.GET_TOTAL_SALES_GRAPH_DATA:
      return {
        ...state,
        // TODO fix the id
        labels: action.data.data.map(e => e._id),
        values: action.data.data.map(e => (e.totalDealSize !== 0 ? e.totalDealSize : '')),
        maximumGraphValue: action.data.maximumGraphValue !== 0 ? action.data.maximumGraphValue : 0,
        datasets: [
          {
            data: action.data.data.map(e => (e.totalDealSize !== 0 ? e.totalDealSize : '')),
          },
        ],
      };
    case REPORT_REDUX_CONSTANT.RESET_TOTAL_SALES_GRAPH_DATA:
      return initialTotalSalesGraphData;
    default:
      return state;
  }
};
