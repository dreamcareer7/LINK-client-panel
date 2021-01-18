import React from 'react';
/* import PropTypes from 'prop-types'; */
import user from '../../../../../../assets/images/dummy-user.jpg';

function History() {
  return (
    <div className="opportunity-right common-block blue">
      <div className="status-color" />
      <div className="common-block--detail-container chat-history">
        <div className="common-subtitle">HISTORY</div>
        <div className="chat-container">
          <div className="left-conversation">
            <img className="chat-dp" src={user} />
            <div className="chat-bubble">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              <span className="chat-time-stamp">25-01-2020 | 2:35 AM</span>
            </div>
          </div>
          <div className="right-conversation">
            <div className="chat-bubble user-bubble">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              <span className="chat-time-stamp">25-01-2020 | 2:35 AM</span>
            </div>
            <img className="chat-dp" src={user} />
          </div>
          <div className="left-conversation">
            <img className="chat-dp" src={user} />
            <div className="chat-bubble">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              <span className="chat-time-stamp">25-01-2020 | 2:35 AM</span>
            </div>
          </div>
          <div className="right-conversation">
            <div className="chat-bubble user-bubble">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              <span className="chat-time-stamp">25-01-2020 | 2:35 AM</span>
            </div>
            <img className="chat-dp" src={user} />
          </div>
          <div className="left-conversation">
            <img className="chat-dp" src={user} />
            <div className="chat-bubble">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              <span className="chat-time-stamp">25-01-2020 | 2:35 AM</span>
            </div>
          </div>
          <div className="right-conversation">
            <div className="chat-bubble user-bubble">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              <span className="chat-time-stamp">25-01-2020 | 2:35 AM</span>
            </div>
            <img className="chat-dp" src={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
History.propTypes = {};

export default History;
