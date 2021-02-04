import ACCOUNT_REDUX_CONSTANT from '../../constants/accountConstant/AccountConstant';

const initialValue = {
  company: {
    data: [],
  },
  industries: {
    data: [],
  },
  client: {
    data: [],
  },
  invoices: {
    data: [],
  },
};
// eslint-disable-next-line import/prefer-default-export
export const AccountReducer = (state = initialValue, action) => {
  switch (action.type) {
    case ACCOUNT_REDUX_CONSTANT.GET_CLIENT_INFO:
      return {
        ...state,
        client: {
          ...state.client,
          data: action.data,
        },
      };

    case ACCOUNT_REDUX_CONSTANT.GET_COMPANY_SIZE:
      return {
        ...state,
        company: {
          ...state.company,
          data: action.data,
        },
      };
    case ACCOUNT_REDUX_CONSTANT.GET_INVOICES:
      return {
        ...state,
        invoices: {
          ...state.invoices,
          data: action.data,
        },
      };

    case ACCOUNT_REDUX_CONSTANT.GET_INDUSTRIES:
      return {
        ...state,
        industries: {
          ...state.industries,
          data: action.data,
        },
      };

    default:
      return state;
  }
};
