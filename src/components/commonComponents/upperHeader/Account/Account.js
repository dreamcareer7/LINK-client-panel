import React from 'react';
import './Account.scss';

function Account() {
  return (
    <div className="account-container">
      <div className="account-left">
        <div className="dashed-container">
          <div className="absolute-position-title">USER DETAILS</div>
          <div className="success-message">
            <span>!</span>
            <span>Account uploaded Successfully.</span>
          </div>

          <div className="dashed-grid">
            <div>
              <div className="field-title">Name</div>
              <input className="common-input" placeholder="Michelle Obama" />
            </div>
            <div>
              <div className="field-title">Email</div>
              <input className="common-input" placeholder="michelle@abcmedia.com" />
            </div>
            <div>
              <div className="field-title">Phone</div>
              <input className="common-input" placeholder="(+61)545-789-963" />
            </div>
            <div>
              <div className="field-title">Title</div>
              <input className="common-input" placeholder="ABC News" />
            </div>
            <div>
              <div className="field-title">Location</div>
              <input className="common-input" placeholder="Melbourne" />
            </div>
            <div />
            <div>
              <div className="field-title">Company</div>
              <input className="common-input" placeholder="ABC News" />
            </div>
            <div>
              <div className="field-title">Company Size</div>
              <input className="common-input" placeholder="50 - 100" />
            </div>
            <div>
              <div className="field-title">Industry</div>
              <input className="common-input" placeholder="News" />
            </div>
          </div>
          <button type="submit" className="button success-button">
            UPDATE
          </button>
        </div>
        <div className="dashed-container">
          <div className="absolute-position-title">CHANGED PASSWORD</div>
          <div className="success-message">
            <span>!</span>
            <span>Password updated Successfully.</span>
          </div>

          <div className="dashed-grid">
            <div>
              <div className="field-title">Current Password</div>
              <input type="password" className="common-input" placeholder="Michelle Obama" />
            </div>
            <div>
              <div className="field-title">New Password</div>
              <input type="password" className="common-input" placeholder="Michelle Obama" />
            </div>
            <div>
              <div className="field-title">Confirm Password</div>
              <input type="password" className="common-input" placeholder="Michelle Obama" />
            </div>
          </div>
          <button type="submit" className="button success-button">
            UPDATE
          </button>
        </div>
        <div className="dashed-container">
          <div className="absolute-position-title">NOTIFICATIONS</div>
          <div className="d-flex">
            <input type="radio" className="mr-10" />
            <span className="mr-20">Daily</span>
            <input type="radio" className="mr-10" />
            <span className="mr-20">Weekly</span>
            <input type="radio" className="mr-10" />
            <span>Monthly</span>
          </div>
          <input type="radio" className="mr-10" />
          Custom
          <span />
        </div>
      </div>
      <div className="account-right">aaa</div>
    </div>
  );
}

export default Account;
