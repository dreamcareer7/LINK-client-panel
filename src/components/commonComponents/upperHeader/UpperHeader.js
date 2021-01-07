import React from 'react';
import { useHistory } from 'react-router-dom';
import './upperHeader.scss';
import search from '../../../assets/search.png';
import user from '../../../assets/dummy-user.jpg';
import downArrow from '../../../assets/arrow_down.png';
import logout from '../../../assets/logout.svg';

function UpperHeader() {
  const history = useHistory();
  const onLogOut = () => {
    history.push('/login');
  };
  return (
    <div className="upper-header-block">
      <div className="upper-header--rounded-block search-block">
        <input placeholder="Search Subscriber" />
        <button type="button">
          <img src={search} />{' '}
        </button>
      </div>
      <div className="logout-area">
        <div className="upper-header--rounded-block">
          <img className="user-dp" src={user} />
          <label>Michelle Obama</label>
          <div className="down-arrow">
            <img src={downArrow} />
            <div className="user-dropdown">
              <div className="dropdown-option">
                <img src={logout} />
                <span onClick={onLogOut}>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
