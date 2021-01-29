import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './upperHeader.scss';
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
  const [dropDown, setDropDown] = useState(false);

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
    setDateRangePicker(true);
  };
  return (
    <div className="upper-header-block">
      {match && match.isExact && (
        <div className="upper-header--rounded-block search-block">
          <input placeholder="Select Report Date" />
          <button type="button" style={{ backgroundColor: '#ffffff' }}>
            <div className="down-arrow">
              <img src={datePicker} onClick={selectDateRange} className="date-range-img" />{' '}
              <div className="search-area" />
            </div>
          </button>
          {dateRangePicker && <div />}
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
      <div title="Notifications" className="notification-container" onClick="">
        <img src={notification} />
      </div>
      <div className="logout-area" onClick={onDropDownClick}>
        <div className="upper-header--rounded-block">
          <img className="user-dp" src={userPic && userPic ? userPic : user} />
          <label className="label-area">{accountInfo.client.data.firstName}</label>
          <div className="down-arrow">
            <img src={downArrow} onClick={onDropDownClick} />
            {dropDown && (
              <div className="user-dropdown">
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
