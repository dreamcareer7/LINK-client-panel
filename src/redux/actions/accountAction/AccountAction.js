import {errorNotification, successNotification} from '../../../constants/Toast';
import ACCOUNT_REDUX_CONSTANT from '../../constants/accountConstant/AccountConstant';
// eslint-disable-next-line import/no-named-as-default
import AccountService from '../../../services/account-services/AccountServices';

// eslint-disable-next-line import/prefer-default-export
export const getIndutries = () => {
    return dispatch => {
        AccountService.getIndustry()
            .then(response => {
                if (response.data.status === 'SUCCESS') {
                    dispatch({
                        type: ACCOUNT_REDUX_CONSTANT.GET_INDUSTRIES,
                        data: response.data.data,
                    });
                }
            })
            .catch(e => {
                if (e.response.data.status === undefined) {
                    errorNotification('It seems like server is down, Please try after sometime.');
                } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
                    errorNotification('Internal server error');
                }
            });
    };
};

export const getClientInfo = () => {
    return dispatch => {
        AccountService.getClientInfo()
            .then(response => {
                if (response.data.status === 'SUCCESS') {
                    dispatch({
                        type: ACCOUNT_REDUX_CONSTANT.GET_CLIENT_INFO,
                        data: response.data.data,
                    });
                }
            })
            .catch(e => {
                if (e.response.data.status === undefined) {
                    errorNotification('It seems like server is down, Please try after sometime.');
                } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
                    errorNotification('Internal server error');
                }
            });
    };
};

export const updateClientInfo = data => {
    return dispatch => {
        AccountService.updateClient(data)
            .then(response => {
                if (response.data.status === 'SUCCESS') {
                    dispatch({
                        type: ACCOUNT_REDUX_CONSTANT.UPDATE_CLIENT_INFO,
                        data: response.data.data,
                    });
                    successNotification('Client Update successfully!');
                }
            })
            .catch(e => {
                if (e.response.data.status === undefined) {
                    errorNotification('It seems like server is down, Please try after sometime.');
                } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
                    errorNotification('Internal server error');
                }
            });
    };
};

export const getCompanySize = () => {
    return dispatch => {
        AccountService.getCompany()
            .then(response => {
                if (response.data.status === 'SUCCESS') {
                    dispatch({
                        type: ACCOUNT_REDUX_CONSTANT.GET_COMPANY_SIZE,
                        data: response.data.data,
                    });
                }
            })
            .catch(e => {
                if (e.response.data.status === undefined) {
                    errorNotification('It seems like server is down, Please try after sometime.');
                } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
                    errorNotification('Internal server error');
                }
            });
    };
};


export const addFCMToken = (token) => {
    AccountService.creatFCMToken({fcmToken: token})
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
};

export const logoutUser = (token) => {
    AccountService.logoutUser({fcmToken: token})
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
};
