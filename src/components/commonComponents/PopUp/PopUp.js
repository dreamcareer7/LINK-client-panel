import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './PopUp.scss';
import bell from '../../../assets/images/whoops-bell.svg';
import { BASE_URL, LINKEDIN_CLIENT_ID } from '../../../constants/UrlConstant';
import { popUpData } from '../../../redux/actions/popUpAction/PopUpAction';

function PopUp() {
  const data = useSelector(state => state.popUpReducer);
  console.log('data=>', data);
  const dispatch = useDispatch();
  const openUrl = () => {
    dispatch(popUpData(null));
    window.open(
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${BASE_URL}client-auth/sign-up-extension&state=fooobar&scope=r_emailaddress,r_liteprofile`,
      '_blank'
    );
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
        <div className="whoops-content">{data}</div>
        <div className="button success-button" onClick={openUrl}>
          DOWNLOAD NOW
        </div>
      </div>
    </div>
  );
}

export default PopUp;
