import React, { useEffect } from 'react';
import './OpportunityDetails.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import user from '../../../../../assets/images/dummy-user.jpg';
import edit from '../../../../../assets/images/edit.svg';
import close from '../../../../../assets/images/cancel.svg';
import { getOpportunity } from '../../../../../redux/actions/followUpAction/FollowUpAction';

function OpportunityDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onBack = () => {
    history.push('/followUps');
  };
  const { id } = useParams();
  // console.log('opportunity detail -> ', id);
  const opportunity = useSelector(state => state.opportunityDetail);
  console.log('opportunity=>', opportunity);

  useEffect(() => {
    dispatch(getOpportunity(id));
  }, []);
  const goToLinkedInProfile = () => {
    console.log('linked in url=>', opportunity.linkedInUrl);
    window.location = `${opportunity.linkedInUrl}`;
  };

  return (
    <>
      <div className="opportunity-header">
        <div className="breadcrumb common-subtitle">
          <span onClick={onBack}>UPCOMING ACTIONS</span>
          <span> / OPPORTUNITY DETAILS</span>
        </div>
        <div className="buttons-row">
          <button type="submit" className="button success-button">
            SYNC
          </button>
          <button type="button" className="button danger-button">
            DELETE OPPORTUNITY
          </button>
        </div>
      </div>

      <div className="warning">
        <span>!</span>
        Only add opportunities that are good prospects, we don&apos;t recommend adding someone
        before a conversation has opened up on LinkedIn.
      </div>

      <div className="opportunity-container">
        <div className="opportunity-left">
          <div className="common-block blue">
            <div className="status-color" />
            <div className="common-block--detail-container">
              <div className="opportunity-detail">
                <div className="DP-name-container">
                  <img
                    className="user-dp"
                    src={opportunity && opportunity.profilePicUrl && opportunity.profilePicUrl}
                  />
                  <div>
                    <div>
                      <div className="common-subtitle client-name ellipsis">
                        {opportunity && opportunity.firstName && opportunity.firstName}
                      </div>
                      <div className="common-content client-designation placeholder-color">
                        {opportunity && opportunity.title && opportunity.title}
                      </div>
                      <button
                        type="button"
                        className="button primary-button slim-button mt-10"
                        onClick={goToLinkedInProfile}
                      >
                        LinkedIn Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className="opportunity-other-details">
                  <div className="content-title ellipsis">PHONE</div>
                  <div className="common-content placeholder-color ellipsis">636-986-9895</div>
                  <div className="content-title ellipsis">EMAIL</div>
                  <div className="common-content placeholder-color ellipsis">
                    {opportunity && opportunity.email && opportunity.email}
                  </div>
                  <div className="content-title ellipsis">LOCATION</div>
                  <div className="common-content placeholder-color ellipsis">Sydney</div>
                </div>
              </div>
              <div className="opportunity--get-detail-container">
                <div>
                  <div className="common-subtitle">STAGE</div>
                  <select className="common-select common-select-white mt-5">
                    <option value="In Conversation">In Conversaion</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div>
                  <div className="common-subtitle">DEAL SIZE</div>
                  <input
                    className="common-input common-input-white mt-5"
                    placeholder={opportunity && opportunity.dealSize && opportunity.dealSize}
                  />
                </div>
                <div>
                  <div className="common-subtitle">POTENTIAL</div>
                  <select className="common-select common-select-white mt-5">
                    <option value="Very Likely">Very likely</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div>
                  <div className="common-subtitle">FOLLOW UP DATE</div>
                  <DatePicker className="mt-5" placeholderText="From" dateFormat="MM-DD-YYYY" />
                </div>
              </div>
              <button type="submit" className="button success-button mt-20">
                SAVE
              </button>
            </div>
          </div>
          <div className="notes-container">
            <div className="note-list">
              <div className="common-subtitle">NOTES</div>
              <div className="note-block mt-10">
                <span className="note">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </span>
                <div className="note-action">
                  <img alt="edit" src={edit} title="Edit Note" />
                  <img className="close-circle" src={close} />
                </div>
                <div className="note-time-stamp">25-01-2021 | 2:35 AM</div>
              </div>
              <div className="note-block mt-10">
                <span className="note">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </span>
                <div className="note-action">
                  <img alt="edit" src={edit} title="Edit Note" />
                  <img className="close-circle" src={close} />
                </div>
                <div className="note-time-stamp">25-01-2021 | 2:35 AM</div>
              </div>
            </div>
            <div className="add-new-note-container">
              <div className="common-subtitle">ADD NEW NOTE</div>
              <div className="note-block mt-10">
                <span className="note">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </span>
              </div>
              <button type="button" className="button success-button">
                ADD
              </button>
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
}

export default OpportunityDetails;
