import React from 'react';
import SideBar from '../sideBar/SideBar';
import UpperHeader from '../upperHeader/UpperHeader';
import './layout.scss';

const Layout =() => {
  // eslint-disable-next-line react/prop-types

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
          <div className="common-area">hello</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
