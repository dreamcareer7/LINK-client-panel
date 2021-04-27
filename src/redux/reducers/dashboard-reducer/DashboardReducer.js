import DASHBOARD_REDUX_CONSTANTS from '../../constants/dashboardReduxConstant/DashboardReduxConstant';

const initialValue = {
  dashboardData: {
    data: {
      timeSpentInLinkedIn: 0,
      inviteSent: 0,
      inviteAccepted: 0,
      acceptanceRate: 0,
      opportunityCount: 0,
      percentOfLeadsClosed: 0,
      totalSalesGenerated: 0,
    },
  },
  opportunity: {
    data: [],
  },
  pipeline: {
    data: [],
  },
  totalSales: {
    data: [],
  },
  startDate: null,
  endDate: null,
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
        [action.name]: {
          ...state[action.name],
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

    case DASHBOARD_REDUX_CONSTANTS.UPDATE_DASHBOARD_DATE_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };

    default:
      return state;
  }
};
