import React, { useState } from 'react';
import './upperHeader.scss';
import search from '../../../assets/search.png';
import user from '../../../assets/user.png';
import downArrow from '../../../assets/arrow_down.png';
import logout from '../../../assets/logout.svg';

function UpperHeader() {
  const [isDropDownOpen, setIsDropDownOPen] = useState(false);

  return (
    <div className="upper-header-block">
      <div className="upper-header--rounded-block search-block">
        <input placeholder="Search Subscriber" />
        <button type="button">
          <img src={search} />{' '}
        </button>
      </div>
      <div className="upper-header--rounded-block">
        <img className="user-dp" src={user} />
        <label>Michelle Obama</label>
        <div className="down-arrow" onClick={() => setIsDropDownOPen(!isDropDownOpen)}>
          <img src={downArrow} />
          {isDropDownOpen ? (
            <div className="user-dropdown">
              <div className="dropdown-option">
                <img src={logout} />
                <span>Logout</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
