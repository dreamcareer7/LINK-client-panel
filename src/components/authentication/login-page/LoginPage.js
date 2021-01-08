import React, { useState } from 'react';

import linkFluencer from '../../../assets/images/linkfluencer.png';
import './login.scss';
import user from '../../../assets/images/user.png';
import padlock from '../../../assets/images/padlock.png';
import hideInterface from '../../../assets/images/hide-interface-symbol.png';
import {
  checkForEmail,
  errorNotification,
  replaceHiddenCharacters,
} from '../../../constants/Toast';
import AuthTextInput from '../common/text-input/AuthTextInput';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onClickLoginButton = (inputUserName, inputPassword) => {
    if (inputUserName.toString().trim().length === 0) errorNotification('Please enter username');
    else if (!checkForEmail(replaceHiddenCharacters(inputUserName)))
      errorNotification('Please enter a valid username');
    else if (replaceHiddenCharacters(inputPassword.toString()).trim().length === 0)
      errorNotification('Please enter password');
    else {
      console.log('user login');
    }
  };

  return (
    <div className="login-content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />
      <div className="login-form">
        <AuthTextInput
          src={user}
          type="text"
          placeholder="Enter Username"
          value={userName}
          onChange={e => setUserName(e.target.value.toString().trim())}
        />
        <div className="form--detail-container">
          <div className="detail-icon">
            <img alt="password" src={padlock} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value.toString().trim())}
          />
          <button
            className="show-hide-eye-btn"
            type="button"
            onClick={() => setShowPassword(e => !e)}
          >
            <img
              alt="hide-pswrd"
              className="show-hide-pswrd"
              src={showPassword ? user : hideInterface}
            />
          </button>
        </div>

        <button
          type="button"
          className="button success-button login-button"
          onClick={() => onClickLoginButton(userName, password)}
        >
          LOGIN
        </button>
        <a href="forgot" className="forgot-password">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
