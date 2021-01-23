import DASHBOARD_REDUX_CONSTANTS from '../../constants/dashboardReduxConstant/DashboardReduxConstant';

const initialValue = {
  opportunity: {
    data: [],
  },
  pipeline: {
    data: [],
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

    default:
      return state;
  }
};
