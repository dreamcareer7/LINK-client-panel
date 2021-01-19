import React from 'react';
import './Account.scss';
import DatePicker from 'react-datepicker';
import eye from '../../../../assets/images/visibility.svg';
import download from '../../../../assets/images/down-arrow.svg';

function Account() {
  return (
    <div className='account-container'>
      <div className='account-left'>
        <div className='dashed-container'>
          <div className='absolute-position-title'>USER DETAILS</div>
          <div className='success-message'>
            <span>!</span>
            <span>Account uploaded Successfully.</span>
          </div>

          <div className='dashed-flex'>
            <div>
              <span className='field-title'>Name</span>
              <input className='common-input' placeholder='Michelle Obama' />
            </div>
            <div>
              <span className='field-title'>Email</span>
              <input className='common-input' placeholder='michelle@abcmedia.com' />
            </div>
            <div>
              <span className='field-title'>Phone</span>
              <input className='common-input' placeholder='(+61)545-789-963' />
            </div>
          </div>
          <div className='dashed-flex'>
            <div>
              <span className='field-title'>Title</span>
              <input className='common-input' placeholder='ABC News' />
            </div>
            <div>
              <span className='field-title'>Location</span>
              <input className='common-input' placeholder='Melbourne' />
            </div>
            <div />
          </div>
          <div className='dashed-flex'>
            <div>
              <span className='field-title'>Company</span>
              <input className='common-input' placeholder='ABC News' />
            </div>
            <div>
              <span className='field-title'>Company Size</span>
              <input className='common-input' placeholder='50 - 100' />
            </div>
            <div>
              <span className='field-title'>Industry</span>
              <input className='common-input' placeholder='News' />
            </div>
          </div>
          <button type='submit' className='button success-button mt-20'>
            UPDATE
          </button>
        </div>
        <div className='dashed-container'>
          <div className='absolute-position-title'>CHANGED PASSWORD</div>
          <div className='success-message'>
            <span>!</span>
            <span>Password updated Successfully.</span>
          </div>

          <div className='dashed-flex'>
            <div>
              <span className='field-title'>Current Password</span>
              <input type='password' className='common-input' />
            </div>
            <div>
              <span className='field-title'>New Password</span>
              <input type='password' className='common-input' />
            </div>
            <div>
              <span className='field-title'>Confirm Password</span>
              <input type='password' className='common-input' />
            </div>
          </div>
          <button type='submit' className='button success-button mt-20'>
            UPDATE
          </button>
        </div>
        <div className='dashed-container notifications-container'>
          <div className='absolute-position-title'>NOTIFICATIONS</div>
          <div className='notification--radio-button-row'>
            <input type='radio' className='mr-10' />
            <span>Daily</span>
            <input type='radio' className='mr-10' />
            <span>Weekly</span>
            <input type='radio' className='mr-10' />
            <span>Monthly</span>
          </div>
          <div className='notification--radio-button-row mt-10'>
            <input type='radio' className='mr-10' />
            <span>Custom</span>
          </div>
          <div className='d-flex mt-20'>
            <input id='browser' type='checkbox' /><label htmlFor='browser' className='mr-20'>Browser</label>
            <input id='email' type='checkbox' /><label htmlFor='email' className='mr-20'>Email</label>
          </div>
          <button type='submit' className='button success-button mt-20'>
            UPDATE
          </button>
        </div>
        <div className='dashed-container'>
          <div className='absolute-position-title'>SUBSCRIPTION</div>
          <div className='subscription-row'>
            <div className='subscription-status'>
              <div className='active' />
              Active
            </div>

            <div className='d-flex'>
              <button type='button' className='mr-10'>Pause</button>
              <button type='button'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div className='account-right'>
        <div className='dashed-container'>
          <div className='absolute-position-title'>TRANSACTION HISTORY</div>
          <div className='common-subtitle mb-5'>Date Range</div>
          <div className='date-range-button-container'>
            <div className='d-flex'>
              <div className='date-picker'>
                <DatePicker placeholderText='From' className='common-input' />
              </div>
              <div className='date-picker'>
                <DatePicker placeholderText='To' className='common-input' />
              </div>
            </div>
            <button type='button' className='button primary-button'>DOWNLOAD FULL HISTORY</button>
          </div>
          <div className='transaction-history-table-row mt-20'>
            <div>Date</div>
            <div>Amount</div>
            <div>Subscription Type</div>
            <div>Receipt No.</div>
            <div className="actions"/>
          </div>
            <div className='transaction-history-table-row table-row'>
              <div>01/01/2021</div>
              <div>$100</div>
              <div>Monthly</div>
              <div>9876543210</div>
              <div className="actions">
                <img src={eye}/>
                <img src={download}/>
              </div>
            </div>

        </div>

      </div>
    </div>
  );
}

export default Account;
