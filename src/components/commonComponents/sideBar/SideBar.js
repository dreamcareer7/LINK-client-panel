import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import linkfluencer from '../../../assets/images/linkfluencer.png';
import dashboard from '../../../assets/home.svg';
import strategy from '../../../assets/images/horse-chess-piece.png';
import crm from '../../../assets/crm.svg';
import reporting from '../../../assets/reporting.svg';
import calendar from '../../../assets/calendar.svg';

function SideBar() {
  return (
    <div>
      <div className="">
        <NavLink className="dashboard-logo" to="/dashboard" replace>
          <img alt="Linkfluencer" src={linkfluencer} />
        </NavLink>
      </div>
      <div className="menu-bar">
        <div className="menu">
          <NavLink className="menu-item menu-link" to="/dashboard" replace>
            <img alt="home" src={dashboard} /> <span>Dashboard</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/followups" replace>
            <img alt="followups" src={calendar} /> <span>Follow Ups</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/crm" replace>
            <img alt="crm" src={crm} /> <span>CRM</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/strategy" replace>
            <img alt="crm" src={strategy} /> <span>Strategy</span>
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
