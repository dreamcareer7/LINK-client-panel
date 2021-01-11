import React from 'react';
import './UpcomingActions.scss';
import ClientDetailsBlock from './ClientDetailsBlock/ClientDetailsBlock';

function UpcomingActions() {
  return (
    <div>
    <div className='heading'>Upcoming Actions</div>
    <div className='client-detail-blocks-container'>
     <ClientDetailsBlock/>
     <ClientDetailsBlock/>
     <ClientDetailsBlock/>
     <ClientDetailsBlock/>
     <ClientDetailsBlock/>
     <ClientDetailsBlock/>
    </div>
  </div>
  );
}

export default UpcomingActions;
