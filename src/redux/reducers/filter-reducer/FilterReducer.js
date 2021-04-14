import FILTER_REDUX_CONSTANT from '../../constants/filterConstant/FilterConstant';

const initialValue = {
  startDeal: {
    name: 'startDeal',
    value: 0,
  },
  endDeal: {
    name: 'endDeal',
    value: 1000,
  },
  stageInitialState: {
    INITIAL_CONTACT: {
      name: 'Initial Contact',
      value: false,
    },
    IN_CONVERSION: {
      name: 'In Conversation',
      value: false,
    },
    MEETING_BOOKED: {
      name: 'Meeting Booked',
      value: false,
    },
    FOLLOW_UP: {
      name: 'Follow Up',
      value: false,
    },
    POTENTIAL: {
      name: 'Potential Deals',
      value: false,
    },
    CLOSED: {
      name: 'Closed',
      value: false,
    },
    LOST: {
      name: 'Lost',
      value: false,
    },
  },
  potentialInitialState: {
    VERY_LIKELY: {
      name: 'Very Likely Deals',
      value: false,
    },
    LIKELY: {
      name: 'Likely Deals',
      value: false,
    },
    NOT_LIKELY: {
      name: 'Not Likely Deals',
      value: false,
    },
  },
};
// eslint-disable-next-line import/prefer-default-export
export const filterReducer = (state = initialValue, action) => {
  switch (action.type) {
    case FILTER_REDUX_CONSTANT.UPDATE_STAGE_CHECKBOX:
      return {
        ...state,
        stageInitialState: {
          ...state.stageInitialState,
          [action.name]: {
            ...state.stageInitialState[action.name],
            value: action.value,
          },
        },
      };
    case FILTER_REDUX_CONSTANT.UPDATE_POTENTIAL_CHECKBOX:
      return {
        ...state,
        potentialInitialState: {
          ...state.potentialInitialState,
          [action.name]: {
            ...state.potentialInitialState[action.name],
            value: action.value,
          },
        },
      };
    case FILTER_REDUX_CONSTANT.UPDATE_DEAL_VALUE:
      return {
        ...state,
        startDeal: {
          name: 'startDeal',
          value: action.value.min,
        },
        endDeal: {
          name: 'endDeal',
          value: action.value.max,
        },
      };
    case 'RESET_STAGE_FILTER':
      return { ...initialValue };
    default:
      return state;
  }
};
