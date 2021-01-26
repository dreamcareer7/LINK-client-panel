import React from 'react';
import './ClientDetailsBlock.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getLabelFromValues } from '../../../../../helpers/chartHelper';
import { stageMapperObject } from '../../../../../helpers/Mappers';

/* import user from '../../../../../assets/images/dummy-user.jpg'; */

const likelyHoodClassMapper = [
  { label: 'green', value: 'VERY_LIKELY' },
  { label: 'yellow', value: 'LIKELY' },
  { label: 'red', value: 'NOT_LIKELY' },
];

function ClientDetailsBlock({ opportunity }) {
  const {
    profilePicUrl,
    email,
    companyName,
    followUp,
    firstName,
    lastName,
    stage,
    title,
    phone,
    likelyHood,
  } = opportunity;
  console.log('likelyHoods=>', likelyHood);

  return (
    <div
      className={`common-block upcoming-action-block-size cursor-pointer ${getLabelFromValues(
        likelyHood,
        likelyHoodClassMapper
      )} ${!likelyHood && 'blue'}`}
    >
      <div className="status-color" />
      <div className="common-block--detail-container">
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
          <div className="common-content placeholder-color ellipsis">{phone}</div>
          <div className="content-title ellipsis">EMAIL</div>
          <div className="common-content placeholder-color ellipsis">{email}</div>
          <div className="content-title ellipsis">STAGE</div>
          <div className="common-content placeholder-color ellipsis">
            {getLabelFromValues(stage, stageMapperObject)}
          </div>
          <div className="content-title">FOLLOW-UP DATE</div>
          <div className="common-content placeholder-color ellipsis">
            {followUp ? moment(followUp).format('MM/DD/YYYY') : followUp}
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
    title: PropTypes.string,
    followUp: PropTypes.string,
    phone: PropTypes.string,
    likelyHood: PropTypes.string,
  }).isRequired,
};

export default ClientDetailsBlock;
