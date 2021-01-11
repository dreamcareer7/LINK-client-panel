import React from 'react';
import './FollowUps.scss';
import Filters from './Filters/Filters';
import UpcomingActions from './UpcomingActions/UpcomingActions';


function FollowUps() {
  return (
    <div className="follow-ups-container">
      <UpcomingActions/>
      <Filters/>
      </div>
    );
}

export default FollowUps;
