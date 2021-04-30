import React from 'react';
import './ErrorPage.scss';
import errorImage from '../../../assets/images/error-404.svg';
import {AUTH_TOKEN} from "../../../helpers/LocalStorageHelper";

const ErrorPage = () => {
    const token = AUTH_TOKEN;
  return (
    <div className="error-page-container">
      <img src={errorImage} />
      <div className="page-does-not-exist">This page does not exist</div>
      <div className="invalid-url">Please check your URL or return to linkfluencer dashboard.</div>
        {token && <button className="button primary-button mt-20" >Back to Dashboard</button>}
    </div>
  );
};

export default ErrorPage;
