import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import linkfluencer from '../../../assets/images/linkfluencer.png';
import home from '../../../assets/home.svg';
/* import group from '../../../assets/group.png'; */
import crm from '../../../assets/crm.svg';
import reporting from '../../../assets/reporting.svg';
import calendar from '../../../assets/calendar.svg';

function SideBar() {
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

          <NavLink className="menu-item menu-link" to="/followUps" replace>
            <img alt="followups" src={calendar} /> <span>Follow ups</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/crm" replace>
            <img alt="crm" src={crm} /> <span>CRM</span>
          </NavLink>

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
