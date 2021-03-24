import CLIENT_ERROR_REDUX_CONSTANT from '../../constants/clientErrorConstant/ClientErrorConstant';

// eslint-disable-next-line import/prefer-default-export
export const clientErrorReducer = (state = [], action) => {
  switch (action.type) {
    case CLIENT_ERROR_REDUX_CONSTANT.GET_CLIENT_ERROR:
      return action.data.data;
    default:
      return state;
  }
};
