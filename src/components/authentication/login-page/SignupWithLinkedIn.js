import React from 'react';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import signInLinkedIn from '../../../assets/images/Sign-in-Large---Default.png';
import './login.scss';
import { BASE_URL, LINKEDIN_CLIENT_ID } from '../../../constants/UrlConstant';

function SignupWithLinkedIn() {
  const onClickSignUp = () => {
    window.location = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${BASE_URL}client-auth/sign-up&state=fooobar&scope=r_emailaddress,r_liteprofile`;
  };

  return (
    <div className="login-content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />

      <button type="button" className="sign-up-button" onClick={onClickSignUp}>
        <img src={signInLinkedIn} />
      </button>
    </div>
  );
}

export default SignupWithLinkedIn;
