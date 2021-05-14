import React, { useEffect } from 'react';
import './FollowUps.scss';
import Filters from './Filters/Filters';
import UpcomingActions from './UpcomingActions/UpcomingActions';

function FollowUps() {
  useEffect(() => {
    document.title = 'Follow Ups';
    document.getElementsByClassName('common-area')?.[0]?.scrollTo(0, 0);
  }, []);
  return (
    <div className="follow-ups-container">
      <UpcomingActions />
      <Filters />
    </div>
  );
}

export default FollowUps;
