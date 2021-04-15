import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import linkfluencer from '../../../assets/images/linkfluencer.png';
import home from '../../../assets/home.svg';
import crm from '../../../assets/crm.svg';
import reporting from '../../../assets/reporting.svg';
import calendar from '../../../assets/calendar.svg';

function SideBar() {
  /* const dispatch = useDispatch();
  const followupData = useSelector(state => state.followUps);
  const dealSizes = useMemo(
    () =>
      followupData && followupData.dealSize && followupData.dealSize[0]
        ? followupData.dealSize[0]
        : null,
    [followupData]
  );
  const clearFilter = () => {
    const dealData = {
      endDealValue: dealSizes?.maxDealValue || 999999999,
      startDealValue: dealSizes?.minDealValue || 1,
    };
    dispatch(resetFilterData(dealData));
    const data = {
      stages: [],
      likelyHoods: [],
    };
    dispatch(getUpcomingActions(1, 9, data));
  };
*/
  return (
    <div>
      <div className="">
        <NavLink className="dashboard-logo" to="/home" replace>
          <img alt="Linkfluencer" src={linkfluencer} />
        </NavLink>
      </div>
      <div className="menu-bar">
        <div className="menu">
          <NavLink className="menu-item menu-link" to="/home" replace>
            <img alt="home" src={home} /> <span>Home</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/followups" replace>
            <img alt="followups" src={calendar} /> <span>Follow Ups</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/crm" replace>
            <img alt="crm" src={crm} /> <span>CRM</span>
          </NavLink>

          {/*        <NavLink className="menu-item menu-link" to="/strategy" replace>
            <img alt="crm" src={strategy} /> <span>Strategy</span>
          </NavLink>
*/}
          <NavLink className="menu-item menu-link" to="/reporting" replace>
            <img alt="reporting" src={reporting} /> <span>Reporting</span>
          </NavLink>
        </div>
        <div className="copyright">Copyright 2021. linkfluencer Pty Ltd</div>
      </div>
    </div>
  );
}

export default SideBar;
