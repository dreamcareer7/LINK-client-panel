import React from 'react';
import './ClientDetailsBlock.scss';
import user from '../../../../../assets/images/dummy-user.jpg';

function ClientDetailsBlock() {
  return (
    <div className="client-detail-block">
      <div className="status-color" />
      <div className="client-detail-container">
        <div className="DP-name-container">
          <img className="user-dp" src={user} />
          <div>
            <div>
              <div className="common-subtitle client-name ellipsis">TRACY SMITH</div>
              <div className="common-content client-designation placeholder-color">
                Director, Magnatech Media
              </div>
            </div>
          </div>
        </div>
        <div className="client-other-details">
          <div className="content-title">
            <div className="ellipsis">PHONE</div>
            <div className="ellipsis">EMAIL</div>
            <div className="ellipsis">STAGE</div>
            <div className="">FOLLOW-UP DATE</div>
          </div>
          <div className="common-content placeholder-color">
            <div className="ellipsis">636-986-9895</div>
            <div className="ellipsis">tracy@magnatech.co</div>
            <div className="ellipsis">Meeting Booked</div>
            <div className="ellipsis">11th January 2021</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsBlock;
