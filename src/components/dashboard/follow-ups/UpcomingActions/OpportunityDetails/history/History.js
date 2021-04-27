import React, { useEffect, useMemo, useRef } from 'react';
import './History.scss';
/* import PropTypes from 'prop-types'; */
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import defaultUser from '../../../../../../assets/images/defaultUser.jpg';
import {
  clearConversation,
  fetchConversation,
} from '../../../../../../redux/actions/followUpAction/historyAction/HistoryAction';

function History() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const chatContainer = useRef(null);
  const prevChatLength = useRef(0);

  useEffect(() => {
    dispatch(fetchConversation(id));
    return () => {
      dispatch(clearConversation());
    };
  }, []);

  const allConversationData = useSelector(state => state.opportunityHistory);
  const allConversation = useMemo(
    () => (allConversationData && allConversationData.data ? allConversationData.data : []),
    [allConversationData]
  );

  const handleScroll = e => {
    const targetVal = e.target;
    if (targetVal.scrollTop < 1) {
      const data = {
        createdAt: allConversation.data[0].createdAt,
      };
      if (!allConversationData.isAllDataLoaded) {
        dispatch(fetchConversation(id, data));
      }
    }
  };

  useEffect(() => {
    if (chatContainer.current && allConversation.data && allConversation.data.length > 0) {
      if (prevChatLength.current === 0) {
        setTimeout(() => {
          const scrollHeights = chatContainer?.current?.scrollHeight;
          const height = chatContainer?.current?.clientHeight;
          const maxScrollTop = scrollHeights - height;
          chatContainer.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }, 300);
      }
      prevChatLength.current = allConversation.length;
    }
  }, [allConversation.data]);

  return (
    <div className="opportunity-right history-container common-block blue">
      <div className="status-color" />

      <div className="common-block--detail-container chat-history">
        <div className="common-subtitle">HISTORY</div>
        <div className="whole-chat-container" ref={chatContainer} onScroll={handleScroll}>
          {allConversation && allConversation.data && allConversation.data.length > 0 ? (
            allConversation.data.map(convo => (
              <div className="chat-container" key={Math.random()}>
                {convo.id === '2' ? (
                  <div className="left-conversation">
                    <img className="chat-dp" src={convo.profilePicUrl || defaultUser} />
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
                    <img className="chat-dp" src={convo.profilePicUrl || defaultUser} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-data-style text-center">
              <span>
                It looks like there&apos;s no conversation history with this opportunity, visit
                their profile to start building a relationship with them today.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
History.propTypes = {};

export default History;
