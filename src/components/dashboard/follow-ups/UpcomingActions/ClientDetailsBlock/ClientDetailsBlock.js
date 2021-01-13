import React from 'react';
import './ClientDetailsBlock.scss';
import PropTypes from 'prop-types';
import moment from 'moment';

/* import user from '../../../../../assets/images/dummy-user.jpg'; */

function ClientDetailsBlock({ opportunity }) {
  const {
    profilePicUrl,
    email,
    companyName,
    createdAt,
    firstName,
    lastName,
    stage,
    title,
  } = opportunity;

  return (
    <div className="client-detail-block">
      <div className="status-color" />
      <div className="client-detail-container">
        <div className="DP-name-container">
          <img className="user-dp" src={profilePicUrl} />
          <div>
            <div>
              <div className="common-subtitle client-name ellipsis">{firstName + lastName}</div>
              <div className="common-content client-designation placeholder-color">
                {title}
                {`${title && companyName ? ', ' : ''}`}
                {companyName}
              </div>
            </div>
          </div>
        </div>
        <div className="client-other-details">
          <div className="content-title ellipsis">PHONE</div>
          <div className="common-content placeholder-color ellipsis">636-986-9895</div>
          <div className="content-title ellipsis">EMAIL</div>
          <div className="common-content placeholder-color ellipsis">{email}</div>
          <div className="content-title ellipsis">STAGE</div>
          <div className="common-content placeholder-color ellipsis">{stage}</div>
          <div className="content-title">FOLLOW-UP DATE</div>
          <div className="common-content placeholder-color ellipsis">
            {moment(createdAt).format('MM/DD/YYYY')}
          </div>
        </div>
      </div>
    </div>
  );
}
ClientDetailsBlock.propTypes = {
  opportunity: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    companyName: PropTypes.string,
    email: PropTypes.string,
    profilePicUrl: PropTypes.string,
    stage: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ClientDetailsBlock;
