import React, { useEffect, useRef, useState } from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './upperHeader.scss';
import moment from 'moment';
import search from '../../../assets/images/search.png';
import loggeduser from '../../../assets/images/loggeduser.jpg';
import datePicker from '../../../assets/images/datepicker.svg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';
import notification from '../../../assets/images/notification.svg';
import account from '../../../assets/images/account.svg';
import help from '../../../assets/images/lifesaver.svg';
import FollowUpService from '../../../services/follow-up-service/FollowUpSevice';
import { getClientInfo, logoutUser } from '../../../redux/actions/accountAction/AccountAction';
import { useOnClickOutside } from '../../../helpers/UseClickOutsideHook';
import {
  getActivityBreakdownGraphData,
  getConversationGraphData,
  getPipelineValuesGraphData,
  getTotalSalesGraphData,
} from '../../../redux/actions/ReportingActions/ReportingAction';
import FCM_REDUX_CONSTANT from '../../../redux/constants/fcmConstant/FcmConstant';

function UpperHeader() {
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch('/reporting');
  useEffect(() => {
    dispatch(getClientInfo());
  }, []);

  const accountInfo = useSelector(state => state.AccountReducer);
  const userPic = accountInfo.client.data.profilePicUrl;

  const [searchText, setSearchText] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [dateRangePicker, setDateRangePicker] = useState(false);
  const ref = useRef();
  const [dropDown, setDropDown] = useState(false);
  const [dateRangeVal, setDateRangeVal] = useState(
    moment.range(moment().clone().subtract(5, 'days'), moment().clone())
  );
  const notificationData = useSelector(state => state.fcmReducer);

  const onSelectDateRange = e => {
    setDateRangeVal(e);
    const data = {
      startDate: moment(e.start).format('YYYY-MM-DD'),
      endDate: moment(e.end).format('YYYY-MM-DD'),
    };

    dispatch(getActivityBreakdownGraphData(data));
    dispatch(getPipelineValuesGraphData(data));
    dispatch(getConversationGraphData(data));
    dispatch(getTotalSalesGraphData(data));
  };

  const onClickSearchedVal = val => {
    history.push(`/followUps/opportunityDetails/${val}`);
    setFiltered([]);
    setSearchText('');
  };

  const onSearch = e => {
    const text = e.target.value;
    setSearchText(text);
    if (text && text.trim().length > 0) {
      const data = {
        name: text,
      };
      FollowUpService.searchSubscriber(data).then(r => {
        const searchResult = r.data.data;
        setFiltered(searchResult);
      });
      /* setFiltered(array.filter(f => f.match(e.target.value))); */
    } else {
      setFiltered([]);
    }
  };
  const onDropDownClick = () => {
    setDropDown(!dropDown);
  };
  useOnClickOutside(ref, () => setDropDown(false));
  useOnClickOutside(ref, () => setDateRangePicker(false));

  useEffect(() => {
    FollowUpService.getNotification()
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          const show = res.data.data;
          if (show.showDot) {
            dispatch({
              type: FCM_REDUX_CONSTANT.ADD_NEW_NOTIFICATION,
              data: {},
            });
          }
        }
      })
      .catch(e => console.log(e));
  }, []);
  useEffect(() => {
    const unlisten = history.listen(() => {
      setDateRangeVal(moment.range(moment().clone().subtract(5, 'days'), moment().clone()));
    });
    return unlisten;
  }, []);
  const onClickNotification = () => {
    FollowUpService.clearNotification()
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          dispatch({
            type: FCM_REDUX_CONSTANT.CLEAR_ALL_NOTIFICATION,
            data: null,
          });
          history.push('/followUps');
        }
      })
      .catch(e => console.log(e));
  };

  const onLogOut = () => {
    logoutUser(localStorage.getItem('fcmToken'));
    history.push('/signUp');
  };
  const onAccountClick = () => {
    history.replace('/account');
  };
  const onHelpClick = () => {
    window.open('https://support.linkfluencer.com/hc/en-us', '_blank');
  };
  const selectDateRange = () => {
    setDateRangePicker(!dateRangePicker);
  };
  const [searchStart, setSearchStart] = useState(false);
  const searchBlurEvent = e => {
    setSearchText('');
    e.target.placeholder = 'Search Opportunity';
    setSearchStart(!e);
  };
  return (
    <div className="upper-header-block">
      {match && match.isExact && (
        <div className="upper-header--rounded-block search-block mr-20">
          <input
            placeholder="Select Report Date"
            value={`${dateRangeVal.start.format('DD-MM-YYYY')} ${dateRangeVal.end.format(
              'DD-MM-YYYY'
            )} `}
          />
          <button type="button" className="date-picker-btn">
            <div className="down-arrow">
              <img src={datePicker} onClick={selectDateRange} className="date-range-img" />{' '}
              <div className="search-area" />
            </div>
          </button>
          {dateRangePicker && (
            <div className="date-range-picker-layout-outer" ref={ref}>
              <div className="date-range-picker-layout-inner">
                <DateRangePicker value={dateRangeVal} onSelect={onSelectDateRange} />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="upper-header--rounded-block search-block">
        <input
          placeholder="Search Opportunity"
          value={searchText}
          onChange={onSearch}
          onKeyDown={setSearchStart}
          onFocus={e => {
            e.target.placeholder = '';
          }}
          onBlur={searchBlurEvent}
        />
        <div className="search-icon">
          <img src={search} />
          <div className="search-area">
            {searchStart && filtered.length === 0 && (
              <div className="open-search-area">No such opportunity found</div>
            )}
            {filtered.map(e => (
              <div className="open-search-area" onClick={() => onClickSearchedVal(e._id)}>
                {e.firstName} {e.lastName}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div title="Notifications" className="notification-container" onClick={onClickNotification}>
        <img src={notification} />
        {notificationData.length > 0 && <div className="notify-dot" />}
      </div>
      <div
        className={`logout-area ${dropDown && 'user-settings-container'}`}
        onClick={onDropDownClick}
      >
        <div className="upper-header--rounded-block user-settings">
          <img className="user-dp" src={userPic && userPic ? userPic : loggeduser} />
          <label className="label-area">
            {accountInfo.client.data.firstName}{' '}
            {accountInfo.client.data.lastName && accountInfo.client.data.lastName}
          </label>
          <div className="down-arrow">
            <img src={downArrow} onClick={onDropDownClick} />
            {dropDown && (
              <div className="user-dropdown" ref={ref}>
                <div className="dropdown-option" onClick={onAccountClick}>
                  <img src={account} />
                  <span>Account</span>
                </div>
                <div className="dropdown-option" onClick={onHelpClick}>
                  <img src={help} />
                  <span>Help & Support</span>
                </div>
                <div className="dropdown-option" onClick={onLogOut}>
                  <img src={logout} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
