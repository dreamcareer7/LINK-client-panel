import FILTER_REDUX_CONSTANT from '../../constants/filterConstant/FilterConstant';

// eslint-disable-next-line import/prefer-default-export
export const changeCheckbox = data => {
  return dispatch => {
    dispatch({
      type: FILTER_REDUX_CONSTANT.UPDATE_STAGE_CHECKBOX,
      ...data,
    });
  };
};

export const changePotentialCheckbox = data => {
  return dispatch => {
    dispatch({
      type: FILTER_REDUX_CONSTANT.UPDATE_POTENTIAL_CHECKBOX,
      ...data,
    });
  };
};
export const changeDealValue = value => {
  return dispatch => {
    dispatch({
      type: FILTER_REDUX_CONSTANT.UPDATE_DEAL_VALUE,
      value,
    });
  };
};

export const changeStartDateValue = value => {
  return dispatch => {
    dispatch({
      type: FILTER_REDUX_CONSTANT.UPDATE_START_DATE_VALUE,
      value,
    });
  };
};
export const changeEndDateValue = value => {
  return dispatch => {
    dispatch({
      type: FILTER_REDUX_CONSTANT.UPDATE_END_DATE_VALUE,
      value,
    });
  };
};

export const resetFilterData = data => {
  return dispatch => {
    dispatch({
      type: FILTER_REDUX_CONSTANT.RESET_FILTER,
      data,
    });
  };
};
