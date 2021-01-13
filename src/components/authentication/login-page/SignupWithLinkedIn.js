import React from 'react';
import linkFluencer from '../../../assets/images/linkfluencer.png';

import './login.scss';

function SignupWithLinkedIn() {
  const onClickSignUp = () => {
    window.location =
      'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77ugsdksaaa1rf&redirect_uri=https://2a0d824dbdaf.ngrok.io/client-auth/sign-up&state=fooobar&scope=r_emailaddress,r_liteprofile';
  };

  return (
    <div className="login-content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />

      <button type="button" className="sign-up-button" onClick={onClickSignUp}>
        SIGN UP WITH LINKEDIN
      </button>
      <a href="forgot" className="forgot-password">
        Forgot Password?
      </a>
    </div>
  );
}

export default SignupWithLinkedIn;
