import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import '../OpportunityDetails.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateOpportunity } from '../../../../../../redux/actions/followUpAction/FollowUpAction';

function OpportunityData({ opportunityData, goToLinkedIn }) {
  const {
    profilePicUrl,
    firstName,
    lastName,
    title,
    email,
    dealSize,
    followUp,
    stage,
    likelyHood,
    location,
    _id,
    phone,
    companyName,
  } = opportunityData;
  const dispatch = useDispatch();
  const [followUpDate, setFollowUpDate] = useState(followUp);
  const [phoneVal, setPhoneVal] = useState(phone);
  const [mail, setMail] = useState(email);
  const [stageValue, setStageValue] = useState(stage);
  const [potentialValue, setPotentialValue] = useState(likelyHood);
  const [locationVal, setLocationVal] = useState(location);
  const [dealSizeVal, setDealSizeVal] = useState(dealSize);
  const onSaveOpportunityData = () => {
    if (dealSizeVal === '-') {
      setDealSizeVal('');
    } else if (potentialValue === 'SELECT') {
      setPotentialValue('');
    } else if (stageValue === 'SELECT') {
      setStageValue('');
    } else {
      const data = {
        firstName,
        lastName,
        title,
        companyName,
        stage: stageValue,
        phone: phoneVal,
        email: mail,
        dealSize: dealSizeVal,
        likelyHood: potentialValue,
        location: locationVal,
        followUp: followUpDate,
      };
      dispatch(updateOpportunity(_id, data));
    }
  };
  return (
    <div className="common-block opportunity-detail-block blue">
      <div className="status-color" />
      <div className="common-block--detail-container">
        <div className="opportunity-detail">
          <div className="DP-name-container">
            <img className="user-dp" src={profilePicUrl} />
            <div>
              <div>
                <div className="common-subtitle client-name ellipsis">
                  {firstName} {lastName}
                </div>
                <div className="common-content client-designation placeholder-color">
                  {title}
                  {`${title && companyName ? ', ' : ''}`}
                  {companyName}
                </div>
                <button
                  type="button"
                  className="button primary-button slim-button mt-10"
                  onClick={goToLinkedIn}
                >
                  LinkedIn Profile
                </button>
              </div>
            </div>
          </div>
          <div className="opportunity-other-details">
            <div className="content-title ellipsis">PHONE</div>
            <input
              type="text"
              className="common-input common-input-white ellipsis"
              value={phoneVal}
              onChange={e => setPhoneVal(e.target.value)}
            />
            <div className="content-title ellipsis">EMAIL</div>
            <input
              type="text"
              className="common-input common-input-white ellipsis"
              value={mail}
              onChange={e => setMail(e.target.value)}
            />
            <div className="content-title ellipsis">LOCATION</div>
            <input
              type="text"
              className="common-input common-input-white  ellipsis"
              value={locationVal}
              onChange={e => setLocationVal(e.target.value)}
            />
          </div>
        </div>
        <div className="opportunity--get-detail-container">
          <div>
            <div className="common-subtitle">STAGE</div>
            <select
              className="common-select common-select-white mt-5"
              value={stageValue}
              onChange={e => setStageValue(e.target.value)}
            >
              <option value="SELECT">Select</option>
              <option value="INITIAL_CONTACT">Initial Contact</option>
              <option value="IN_CONVERSION"> In Conversation</option>
              <option value="MEETING_BOOKED">Meeting Booked</option>
              <option value="FOLLOW_UP">Follow Up</option>
              <option value="POTENTIAL">Potential Deal</option>
              <option value="CLOSED">Closed</option>
              <option value="LOST">Lost</option>
            </select>
          </div>
          <div>
            <div className="common-subtitle">DEAL SIZE</div>
            <input
              className="common-input common-input-white mt-5"
              placeholder="-"
              value={dealSizeVal && dealSizeVal}
              onChange={e => {
                setDealSizeVal(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="common-subtitle">LIKELIHOODS</div>
            <select
              className="common-select common-select-white mt-5"
              value={potentialValue}
              onChange={e => setPotentialValue(e.target.value)}
            >
              <option value="SELECT">Select</option>
              <option value="VERY_LIKELY">Very Likely Deals</option>
              <option value="LIKELY">Likely Deals</option>
              <option value="NOT_LIKELY">Not Likely Deals</option>
            </select>
          </div>
          <div>
            <div className="common-subtitle">FOLLOW UP DATE</div>
            {stageValue === 'LOST' ? (
              <DatePicker className="mt-5 cursor-not-allowed" disableCalendar readOnly placeholderText="Cannot set follow up date for lost stage" />
            ) : (
              <DatePicker
                className="mt-5"
                placeholderText="Follow up date"
                value={followUpDate ? moment(followUpDate).format('MM/DD/YYYY') : followUpDate}
                dateFormat="MM/DD/YYYY"
                minDate={new Date()}
                onChange={date => setFollowUpDate(date)}
              />
            )}
          </div>
        </div>
        <button
          type="button"
          className="button success-button mt-20"
          onClick={onSaveOpportunityData}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
OpportunityData.propTypes = {
  opportunityData: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profilePicUrl: PropTypes.string.isRequired,
    stage: PropTypes.string,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string,
    dealSize: PropTypes.string.isRequired,
    followUp: PropTypes.string.isRequired,
    likelyHood: PropTypes.string.isRequired,
    location: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  goToLinkedIn: PropTypes.func.isRequired,
};

export default OpportunityData;
