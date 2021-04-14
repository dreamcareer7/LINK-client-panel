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
