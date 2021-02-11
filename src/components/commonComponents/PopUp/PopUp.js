import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PopUp.scss';
import bell from '../../../assets/images/whoops-bell.svg';
import { BASE_URL, LINKEDIN_CLIENT_ID } from '../../../constants/UrlConstant';
import { popUpData } from '../../../redux/actions/popUpAction/PopUpAction';

const errorTitles = ['cookie_expired', 'extension_not_installed'];

// eslint-disable-next-line react/prop-types
function PopUp({ popupData }) {
  console.log('popup');
  // const data = useSelector(state => state.popUpReducer);
  const data = popupData;
  console.log('data coming from popup props', data);
  const errorData = useSelector(state => state.clientErrorReducer);
  const findError = useMemo(() => errorData.find(e => e.title === data), [errorData, data]);

  const dispatch = useDispatch();
  const openUrl = () => {
    dispatch(popUpData(null));
    if (findError.title === 'cookie_expired') {
      window.open(
        `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${BASE_URL}client-auth/sign-up-extension&state=fooobar&scope=r_emailaddress,r_liteprofile`,
        '_blank'
      );
    } else {
      window.open(
        'https://chrome.google.com/webstore/detail/jayla/edcpdcdhmbheiolfnlllhgpnamddkdlo',
        '_blank'
      );
    }
  };
  if (!data) {
    return null;
  }
  return (
    <div className="pop-up-main-container">
      <div id="pop-up" className="pop-up-container">
        <div className="whoops-title">
          <img src={bell} />
          <span>WHOOPS!</span>
        </div>
        <div className="whoops-content">{findError && findError.text}</div>
        {findError && errorTitles.includes(findError.title) && (
          <div className="button success-button" onClick={openUrl}>
            {findError.title === 'cookie_expired' ? 'RELOAD EXTENSION' : 'DOWNLOAD NOW'}
          </div>
        )}
      </div>
    </div>
  );
}

export default PopUp;
