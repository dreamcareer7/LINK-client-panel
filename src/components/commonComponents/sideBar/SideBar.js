import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import linkfluencer from '../../../assets/linkfluencer.png';
import home from '../../../assets/home.png';
/* import group from '../../../assets/group.png'; */
import rightQuote from '../../../assets/right-quote-sign.png';
import gear from '../../../assets/gear.png';
import calender from '../../../assets/calender.png';

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
          <div className="menu-item">
            <NavLink className="menu-link" to="/home" replace>
              <img alt="home" src={home} /> <span>Home</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/followUps" replace>
              <img alt="followups" src={calender} /> <span>Follow ups</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/crm" replace>
              <img alt="crm" src={rightQuote} /> <span>CRM</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/reporting" replace>
              <img alt="reporting" src={gear} /> <span>Reporting</span>
            </NavLink>
          </div>
        </div>
        <div className="copyright">Copyright 2021. Linkfluencer Pvt. Ltd.</div>
      </div>
    </div>
  );
}

export default SideBar;
