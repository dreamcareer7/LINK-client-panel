import CRM_REDUX_CONSTANT from '../../constants/crmReduxConstants/CRMReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const crms = (state = null, action) => {
  switch (action.type) {
    case CRM_REDUX_CONSTANT.GET_FILTERED_CRMS:
      return action.data;

    default:
      return state;
  }
};
