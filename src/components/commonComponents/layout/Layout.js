import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../sideBar/SideBar';
import UpperHeader from '../upperHeader/UpperHeader';
import './layout.scss';
import { getAuthTokenLocalStorage } from '../../../helpers/LocalStorageHelper';

const Layout = props => {
  const { children } = props;
  const isLoggedIn = getAuthTokenLocalStorage();
  if (!isLoggedIn) {
    return children;
  }
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
