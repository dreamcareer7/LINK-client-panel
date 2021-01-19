import React from 'react';
import './PopUp.scss'
import bell from '../../../assets/images/whoops-bell.svg'

function PopUp() {
  return(
    <div className="pop-up-main-container">
      <div id="pop-up" className='pop-up-container'>
        <div className='whoops-title'>
          <img src={bell}/>
          <span>WHOOPS!</span>
        </div>
        <div className='whoops-content'>
          You&apos;re not currently in the Google Chrome Web Browser.
          If you haven&apos;t already installed it, click the download
          button below to start using Jayla.
        </div>
        <div className='button success-button'>DOWNLOAD NOW</div>
      </div>
    </div>
  )
}

export default PopUp;
