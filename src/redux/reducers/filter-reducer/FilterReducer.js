import FILTER_REDUX_CONSTANT from '../../constants/filterConstant/FilterCoanstant';
import {potentialInitialState, stageInitialState} from "../../../components/dashboard/follow-ups/Filters/Filters";

const initialValue = {
  startDeal: {
    name: 'startDeal',
    value: 0,
  },
  endDeal: {
    name: 'endDeal',
    value: 1000,
  },
};
// eslint-disable-next-line import/prefer-default-export
export const FilterReducer = (state = initialValue, action) => {
  switch (action.type) {
    case FILTER_REDUX_CONSTANT.UPDATE_CHECKBOX:
      return {
        ...state,
        [`${action.name}`]: {
          ...state[`${action.name}`],
          value: action.value,
        },
      };
    case 'RESET_STAGE_FILTER':
      return stageInitialState;
    case 'RESET_POTENTIAL_FILTER':
      return potentialInitialState;
    default:
      return state;
  }
};
