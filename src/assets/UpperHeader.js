import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import './upperHeader.scss';
import search from '../../../assets/images/search.png';
import user from '../../../assets/images/dummy-user.jpg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';
import {clearUserData} from "../../../redux/actions/authActions/AuthActions";

function UpperHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDropDownOpen,setIsDropDownOPen] = useState(false);
  const onLogOut = () => {
    dispatch(clearUserData());
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
      <div className="upper-header--rounded-block">
        <img className="user-dp" src={user} />
        <label>Michelle Obama</label>
        <div className="down-arrow" onClick={()=>setIsDropDownOPen(!isDropDownOpen)}>
          <img src={downArrow}/>
          {isDropDownOpen ?
          <div className="user-dropdown">
            <div className="dropdown-option">
              <img src={logout} />
              <span onClick={onLogOut}>Logout</span>
            </div>
          </div> : <></>}
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
