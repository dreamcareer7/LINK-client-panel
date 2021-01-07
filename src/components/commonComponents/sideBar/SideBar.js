import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import linkfluencer from '../../../../src/assets/linkfluencer.png';
import home from '../../../../src/assets/home.png';
import group from '../../../../src/assets/group.png';
import rightQuote from '../../../../src/assets/right-quote-sign.png';
import gear from '../../../../src/assets/gear.png';

function SideBar() {
    const dispatch = useDispatch();
    const history = useHistory();
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
                            <img alt="home" src={home} /> <span>Dashboard</span>
                        </NavLink>
                    </div>

                    <div className="menu-item">
                        <NavLink className="menu-link" to="/subscribers" replace>
                            <img alt="subscribers" src={group} /> <span>Subscribers</span>
                        </NavLink>
                    </div>

                    <div className="menu-item">
                        <NavLink  className="menu-link"  to="/quoteBank" replace>
                            <img alt="quoteBank" src={rightQuote} /> <span>Quote Bank</span>
                        </NavLink>
                    </div>

                    <div className="menu-item">
                        <NavLink className="menu-link" to="/settings" replace>
                            <img alt="settings" src={gear} /> <span>Settings</span>
                        </NavLink>
                    </div>
                    <div className="menu-item">
                        <button type="button">
                            Logout
                        </button>
                    </div>
                </div>
                <div className="copyright">Copyright 2021. Linkfluencer Pvt. Ltd.</div>
            </div>
        </div>
    );
}

export default SideBar;
