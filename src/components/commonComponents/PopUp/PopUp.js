import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PopUp.scss';
import bell from '../../../assets/images/whoops-bell.svg';
import { BASE_URL, LINKEDIN_CLIENT_ID } from '../../../constants/UrlConstant';
import { popUpData } from '../../../redux/actions/popUpAction/PopUpAction';
import { useOnClickOutside } from '../../../helpers/UseClickOutsideHook';

const errorTitles = ['cookie_expired', 'extension_not_installed', 'browser_not_supported'];

// eslint-disable-next-line react/prop-types
const PopUp = ({ popupData, onClosePopup = () => {} }) => {
  const dispatch = useDispatch();
  const popupRef = React.useRef();

  const data = popupData;
  const errorData = useSelector(state => state.clientErrorReducer);
  const findError = useMemo(() => errorData.find(e => e.title === data), [errorData, data]);
  useOnClickOutside(popupRef, onClosePopup);

  const openUrl = () => {
    dispatch(popUpData(null));
    if (findError.title === 'cookie_expired') {
      window.open(
        `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${BASE_URL}client-auth/sign-up-extension&state=fooobar&scope=r_emailaddress,r_liteprofile`,
        '_blank'
      );
    } else if (findError.title === 'browser_not_supported') {
      window.open(
        'https://www.google.com/chrome/thank-you.html?brand=JJTC&statcb=0&installdataindex=empty&defaultbrowser=0',
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
    <div
      className={`${
        popupData === 'browser_not_supported' ||
        popupData === 'device_not_desktop' ||
        popupData === 'device_mobile'
          ? 'pop-up-not-chrome-container'
          : 'pop-up-main-container'
      }`}
    >
      <div id="pop-up" ref={popupRef} className="pop-up-container">
        <div className="whoops-title">
          <img src={bell} />
          <span>ATTENTION!</span>
        </div>
        <div className="whoops-content">{findError && findError.text}</div>
        {findError && errorTitles.includes(findError.title) && (
          <div className="button success-button popup-button" onClick={openUrl}>
            {findError.title === 'cookie_expired' ? 'SYNC NOW' : 'DOWNLOAD NOW'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUp;
