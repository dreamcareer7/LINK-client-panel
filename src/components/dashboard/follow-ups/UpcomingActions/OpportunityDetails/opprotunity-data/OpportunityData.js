import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';

import '../OpportunityDetails.scss';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import defaultUser from '../../../../../../assets/images/defaultUser.jpg';
import { updateOpportunity } from '../../../../../../redux/actions/followUpAction/FollowUpAction';
import { errorNotification } from '../../../../../../constants/Toast';

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
  const [stageValue, setStageValue] = useState(stage !== undefined ? stage : 'SELECT');
  const [potentialValue, setPotentialValue] = useState(
    likelyHood !== undefined ? likelyHood : 'SELECT'
  );
  const [locationVal, setLocationVal] = useState(location);
  const [dealSizeVal, setDealSizeVal] = useState(dealSize);
  const allConversationData = useSelector(state => state.opportunityHistory);

  const onChangeStage = e => {
    setStageValue(e.target.value);
  };

  const [isSave, setIsSave] = useState(false);

  const onSaveOpportunityData = () => {
    setIsSave(true);
    if (!dealSizeVal || potentialValue === 'SELECT' || stageValue === 'SELECT' || !followUpDate) {
      errorNotification('Please fill out the sections highlighted below in red');
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
        followUp: followUpDate || null,
      };
      dispatch(updateOpportunity(_id, data));
      setIsSave(false);
    }
  };
  const decimalRegex = new RegExp(/(^[0-9]{0,9}(\.\d{0,2})?$)/);
  const handleDealSizeChange = useCallback(
    e => {
      if (decimalRegex.test(e.target.value)) setDealSizeVal(e.target.value);
      else setDealSizeVal('');
    },
    [decimalRegex, setDealSizeVal]
  );

  const onChangePotentialValue = useCallback(
    event => {
      setPotentialValue(event.target.value);
      if (event.target.value !== 'SELECT') {
        event?.classList?.remove('opportunity-error-placeholder');
      }
    },
    [setPotentialValue]
  );

  return (
    <div className="common-block opportunity-detail-block blue">
      <div className="status-color" />
      <div className="common-block--detail-container">
        <div className="opportunity-detail">
          <div className="DP-name-container">
            <img className="user-dp" src={profilePicUrl || defaultUser} />
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
              placeholder="Enter phone number"
              onFocus={e => {
                e.target.placeholder = '';
              }}
              onBlur={e => {
                e.target.placeholder = 'Enter phone number';
              }}
            />
            <div className="content-title ellipsis">EMAIL</div>
            <input
              type="text"
              className="common-input common-input-white ellipsis"
              value={mail}
              onChange={e => setMail(e.target.value)}
              placeholder="Enter Email"
              onFocus={e => {
                e.target.placeholder = '';
              }}
              onBlur={e => {
                e.target.placeholder = 'Enter Email';
              }}
            />
            <div className="content-title ellipsis">LOCATION</div>
            <input
              type="text"
              className="common-input common-input-white  ellipsis"
              value={locationVal}
              onChange={e => setLocationVal(e.target.value)}
              placeholder="Enter location"
              onFocus={e => {
                e.target.placeholder = '';
              }}
              onBlur={e => {
                e.target.placeholder = 'Enter location';
              }}
            />
          </div>
        </div>
        <div className="opportunity--get-detail-container">
          <div>
            <div className="common-subtitle">STAGE</div>
            <select
              className={`common-select common-select-white mt-5 ${
                stageValue === 'SELECT' && isSave && 'opportunity-error-placeholder'
              }`}
              value={
                allConversationData && allConversationData?.changeStageToInConversation
                  ? 'IN_CONVERSION'
                  : stageValue
              }
              onChange={onChangeStage}
            >
              <option value="SELECT">Select</option>
              <option value="INITIAL_CONTACT">Initial Contact</option>
              <option value="IN_CONVERSION"> In Conversation</option>
              <option value="MEETING_BOOKED">Meeting Booked</option>
              <option value="FOLLOW_UP">Follow Up</option>
              <option value="POTENTIAL">Potential Deals</option>
              <option value="CLOSED">Closed</option>
              <option value="LOST">Lost</option>
            </select>
          </div>
          <div>
            <div className="common-subtitle">DEAL SIZE</div>
            <input
              className={`common-input common-input-white mt-5 ${
                !dealSizeVal && isSave && 'opportunity-error-placeholder'
              }`}
              placeholder="$0"
              value={dealSizeVal}
              onChange={handleDealSizeChange}
              onFocus={e => {
                e.target.placeholder = '';
              }}
              onBlur={e => {
                e.target.placeholder = '$0';
              }}
            />
          </div>
          <div>
            <div className="common-subtitle">LIKELIHOOD</div>
            <select
              className={`common-select common-select-white mt-5 ${
                potentialValue === 'SELECT' && isSave && 'opportunity-error-placeholder'
              }`}
              value={potentialValue}
              onChange={e => onChangePotentialValue(e)}
            >
              <option value="SELECT">Select</option>
              <option value="VERY_LIKELY">Very Likely Deals</option>
              <option value="LIKELY">Likely Deals</option>
              <option value="NOT_LIKELY">Not Likely Deals</option>
            </select>
          </div>
          <div>
            <div className="common-subtitle">FOLLOW UP DATE</div>
            <DatePicker
              className={`mt-5 ${!followUpDate && isSave && 'opportunity-error-placeholder'}`}
              placeholderText="Set a date"
              onFocus={e => {
                e.target.placeholder = '';
              }}
              onBlur={e => {
                e.target.placeholder = 'Set a date';
              }}
              value={followUpDate ? moment(followUpDate).format('DD/MM/YYYY') : followUpDate}
              dateFormat="DD/MM/YYYY"
              minDate={new Date()}
              onChange={date => setFollowUpDate(date)}
            />
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
