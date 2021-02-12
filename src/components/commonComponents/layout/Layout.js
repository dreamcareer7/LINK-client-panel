import React, { useEffect } from 'react';
import is from 'is_js';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SideBar from '../sideBar/SideBar';
import UpperHeader from '../upperHeader/UpperHeader';
import './layout.scss';
import { getAuthTokenLocalStorage } from '../../../helpers/LocalStorageHelper';
import { addFCMListner } from '../../../redux/actions/fcmAction/FcmAction';
import { checkingCookiee } from '../../../redux/actions/cookieeAction/CookieeAction';
import { getClientError } from '../../../redux/actions/clientErrorAction/ClientErrorAction';
import PopUp from '../PopUp/PopUp';
import POPUP_REDUX_CONSTANT from '../../../redux/constants/popUpConstant/PopUpConstant';

const Layout = props => {
  const { children } = props;
  const dispatch = useDispatch();
  const isLoggedIn = getAuthTokenLocalStorage();

  const onClosePopup = () => {
    dispatch({
      type: POPUP_REDUX_CONSTANT.POP_UP_MESSAGE,
      data: null,
    });
  };
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(addFCMListner());
      dispatch(checkingCookiee());
      dispatch(getClientError());
    }
  }, []);
  const checkCookiee = useSelector(state => state.popUpReducer);
  if (!isLoggedIn) {
    return children;
  }
  if (checkCookiee) return <PopUp popupData={checkCookiee} onClosePopup={onClosePopup} />;
  if (is.not.chrome()) return <PopUp popupData="browser_not_supported" />;
  if (is.mobile()) return <PopUp popupData="device_not_desktop" />;
  return (
    <div>
      <div className="dashboard">
        <div className="dashboard--left-part">
          <SideBar />
        </div>
        <div className="dashboard--right-part">
          <div className="dashboard--upperHeader">
            <UpperHeader />
          </div>
          <div className="common-area">{children}</div>
        </div>
      </div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
