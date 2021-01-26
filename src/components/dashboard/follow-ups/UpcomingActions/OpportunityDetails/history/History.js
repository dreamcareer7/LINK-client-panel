import React, { useEffect } from 'react';
import './History.scss';
/* import PropTypes from 'prop-types'; */
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import {
  clearConversation,
  fetchConversation,
} from '../../../../../../redux/actions/followUpAction/historyAction/HistoryAction';

function History() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchConversation(id, ''));
    return () => {
      dispatch(clearConversation());
    };
  }, []);

  const handleScroll = e => {
    console.log('handle scroll', e);
  };

  const allConversation = useSelector(state => state.opportunityHistory);
  console.log('allConversation=>', allConversation);
  if (allConversation.isLoading) {
    return <div className="loader ajax-global-spin" />;
  }

  return (
    <div className="opportunity-right common-block blue">
      <div className="status-color" />

      <div className="common-block--detail-container chat-history" onScroll={handleScroll}>
        <div className="common-subtitle">HISTORY</div>
        {allConversation && allConversation.data ? (
          allConversation.data.map(convo => (
            <div className="chat-container" key={Math.random()}>
              {convo.id === '2' ? (
                <div className="left-conversation">
                  <img className="chat-dp" src={convo.profilePicUrl} />
                  <div className="chat-bubble">
                    {convo.message ? convo.message : 'This message is deleted'}
                    <span className="chat-time-stamp">
                      {moment(convo.createdAt).format('DD/MM/YYYY | hh:mm A')}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="right-conversation">
                  <div className="chat-bubble user-bubble">
                    {convo.message ? convo.message : 'This message is deleted'}
                    <span className="chat-time-stamp right-date-time">
                      {moment(convo.createdAt).format('DD/MM/YYYY | hh:mm A')}
                    </span>
                  </div>
                  <img className="chat-dp" src={convo.profilePicUrl} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No conversation</div>
        )}
      </div>
    </div>
  );
}
History.propTypes = {};

export default History;
