import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import linkfluencer from '../../../assets/linkfluencer.png';
import home from '../../../assets/home.png';
import group from '../../../assets/group.png';
import rightQuote from '../../../assets/right-quote-sign.png';
import gear from '../../../assets/gear.png';

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
          <div className="menu-item">
            <NavLink className="menu-link" to="/dashboard" replace>
              <img alt="home" src={home} /> <span>Home</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/subscribers" replace>
              <img alt="subscribers" src={group} /> <span>Follow ups</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/quoteBank" replace>
              <img alt="quoteBank" src={rightQuote} /> <span>CRM</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/settings" replace>
              <img alt="settings" src={gear} /> <span>Reporting</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <button type="button">Logout</button>
          </div>
        </div>
        <div className="copyright">Copyright 2021. Linkfluencer Pvt. Ltd.</div>
      </div>
    </div>
  );
}

export default SideBar;
