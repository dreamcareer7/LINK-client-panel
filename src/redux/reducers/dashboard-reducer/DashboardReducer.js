import DASHBOARD_REDUX_CONSTANTS from '../../constants/dashboardReduxConstant/DashboardReduxConstant';

const initialValue = {
  dashboardData: { data: [] },
  opportunity: {
    data: [],
  },
  pipeline: {
    data: [],
  },
  totalSales: {
    data: [],
  },
  startDate: {
    name: 'startDate',
    value: null,
  },
  endDate: {
    name: 'endDate',
    value: null,
  },
  clientQuote: {
    data: [],
  },
};
// eslint-disable-next-line import/prefer-default-export
export const dashboardReducer = (state = initialValue, action) => {
  switch (action.type) {
    case DASHBOARD_REDUX_CONSTANTS.OPPRTUNITIES_REDUX_CONSTANT:
      return {
        ...state,
        opportunity: {
          ...state.opportunity,
          data: action.data,
        },
      };

    case DASHBOARD_REDUX_CONSTANTS.DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: {
          ...state.dashboardData,
          data: action.data,
        },
      };

    case DASHBOARD_REDUX_CONSTANTS.PIPELINE_REDUX_CONSTANT:
      return {
        ...state,
        pipeline: {
          ...state.pipeline,
          data: action.data,
        },
      };

    case DASHBOARD_REDUX_CONSTANTS.CLIENT_QUOTE:
      return {
        ...state,
        clientQuote: {
          ...state.clientQuote,
          data: action.data,
        },
      };

    case DASHBOARD_REDUX_CONSTANTS.TOTAL_SALES_REDUX_CONSTANT:
      return {
        ...state,
        totalSales: {
          ...state.totalSales,
          data: action.data,
        },
      };

    case DASHBOARD_REDUX_CONSTANTS.RESET_PIPELINE_GRAPH_DATA:
      return {
        ...state,
        pipeline: {
          ...state.pipeline,
        },
      };

    case DASHBOARD_REDUX_CONSTANTS.RESET_TOTAL_SALES_GRAPH_DATA:
      return { ...state, totalSales: { ...state.totalSales } };

    case DASHBOARD_REDUX_CONSTANTS.UPDATE_START_DATE_VALUE:
      return {
        ...state,
        startDate: {
          name: 'startDate',
          value: action.value,
        },
      };

    case DASHBOARD_REDUX_CONSTANTS.UPDATE_END_DATE_VALUE:
      return {
        ...state,
        endDate: {
          name: 'endDate',
          value: action.value,
        },
      };

    default:
      return state;
  }
};
