import React, { useEffect, useRef, useState } from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './upperHeader.scss';
import moment from 'moment';
import search from '../../../assets/images/search.png';
import user from '../../../assets/images/dummy-user.jpg';
import datePicker from '../../../assets/images/datepicker.svg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';
import notification from '../../../assets/images/notification.svg';
import account from '../../../assets/images/account.svg';
import help from '../../../assets/images/lifesaver.svg';
import { clearAuthToken } from '../../../helpers/LocalStorageHelper';
import FollowUpService from '../../../services/follow-up-service/FollowUpSevice';
import { getClientInfo, logoutUser } from '../../../redux/actions/accountAction/AccountAction';
import { useOnClickOutside } from '../../../helpers/UseClickOutsideHook';
import {
  getActivityBreakdownGraphData,
  getConversationGraphData,
  getPipelineValuesGraphData,
  getTotalSalesGraphData,
} from '../../../redux/actions/ReportingActions/ReportingAction';
import { successNotification } from '../../../constants/Toast';
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
  console.log('notificationData=>', notificationData);
  const onSelectDateRange = e => {
    setDateRangeVal(e);
    console.log(e.start.toISOString());
    const data = {
      startDate: e.start.toISOString(),
      endDate: e.end.toISOString(),
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

  const onClickNotification = () => {
    FollowUpService.clearNotification()
      .then(res => {
        console.log(res);
        if (res.data.status === 'SUCCESS') {
          successNotification('Notification read');
          dispatch({
            type: FCM_REDUX_CONSTANT.FCM_DATA,
            data: null,
          });
          history.push('/followUps');
        }
      })
      .catch(e => console.log(e));
  };

  const onLogOut = () => {
    clearAuthToken();
    logoutUser(localStorage.getItem('fcmToken'));
    history.push('/signUp');
  };
  const onAccountClick = () => {
    history.replace('/account');
  };
  const onHelpClick = () => {
    history.replace('/popUp');
  };
  const selectDateRange = () => {
    setDateRangePicker(!dateRangePicker);
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
        <input placeholder="Search Subscriber" value={searchText} onChange={onSearch} />
        <button type="button">
          <div className="down-arrow">
            <img src={search} />{' '}
            <div className="search-area">
              {filtered.map(e => (
                <div className="open-search-area" onClick={() => onClickSearchedVal(e._id)}>
                  {e.firstName} {e.lastName}
                </div>
              ))}
            </div>
          </div>
        </button>
      </div>
      <div title="Notifications" className="notification-container" onClick={onClickNotification}>
        <img src={notification} />
        {notificationData && <div className="notify-dot" />}
      </div>
      <div className="logout-area" onClick={onDropDownClick}>
        <div className="upper-header--rounded-block">
          <img className="user-dp" src={userPic && userPic ? userPic : user} />
          <label className="label-area">{accountInfo.client.data.firstName}</label>
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
