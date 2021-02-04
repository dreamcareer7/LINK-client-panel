import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Account.scss';
import DatePicker from 'react-datepicker';
import eye from '../../../../assets/images/visibility.svg';
import download from '../../../../assets/images/down-arrow.svg';
import {
  getCompanySize,
  getIndutries,
  updateClientInfo,
} from '../../../../redux/actions/accountAction/AccountAction';
import AccountService from '../../../../services/account-services/AccountServices';
import { downloadInvoiceHistory } from '../../../../helpers/downloadInvoiceHistory';

function Account() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [form, setFormValue] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    location: '',
    company: '',
    company_size: '',
    industry: '',
  });
  const dispatch = useDispatch();
  const { company, client, industries } = useSelector(state => state.AccountReducer);

  const onHandleSubmit = () => {
    const formData = {
      firstName: form.name,
      email: form.email,
      phone: form.phone,
      title: form.title,
      industry: form.industry,
      companyName: form.company,
      companySize: form.company_size,
      companyLocation: form.location,
    };
    dispatch(updateClientInfo(formData));
  };

  useEffect(() => {
    dispatch(getCompanySize());
    dispatch(getIndutries());
    if (client && client.data && client.data) {
      setFormValue({
        name: client.data.firstName && client.data.firstName,
        email: client.data.email && client.data.email,
        phone: client.data.phone && client.data.phone,
        title: client.data.title && client.data.title,
        location: client.data.companyLocation && client.data.companyLocation,
        company: client.data.companyName && client.data.companyName,
        company_size: client.data.companySize && client.data.companySize,
        industry: client.data.industry && client.data.industry,
      });
    }
  }, [
    client && client.data && client.data.firstName,
    client && client.data && client.data.email,
    client && client.data && client.data.phone,
    client && client.data && client.data.title,
    client && client.data && client.data.companyName,
    client && client.data && client.data.companyLocation,
    client && client.data && client.data.companySize,
    client && client.data && client.data.industry,
  ]);

  const onHandleChange = e => {
    setFormValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onDownloadFullHistory = () => {
    AccountService.downloadInvoice()
      .then(r => {
        const invoiceData = r.data;
        downloadInvoiceHistory(invoiceData, 'invoice.csv');
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="account-container">
      <div className="account-left">
        <div className="dashed-container">
          <div className="absolute-position-title">USER DETAILS</div>
          {/* <div className='success-message'>
            <span>!</span>
            <span>Account uploaded Successfully.</span>
          </div> */}

          <div className="dashed-flex">
            <div>
              <span className="field-title">Name</span>
              <input
                className="common-input"
                value={form.name || ''}
                onChange={onHandleChange}
                name="name"
                placeholder="Michelle Obama"
              />
            </div>
            <div>
              <span className="field-title">Email</span>
              <input
                onChange={onHandleChange}
                value={form.email || ''}
                className="common-input"
                name="email"
                placeholder="michelle@abcmedia.com"
              />
            </div>
            <div>
              <span className="field-title">Phone</span>
              <input
                onChange={onHandleChange}
                value={form.phone || ''}
                className="common-input"
                name="phone"
                placeholder="(+61)545-789-963"
              />
            </div>
          </div>
          <div className="dashed-flex">
            <div>
              <span className="field-title">Title</span>
              <input
                onChange={onHandleChange}
                value={form.title || ''}
                className="common-input"
                name="title"
                placeholder="ABC News"
              />
            </div>
            <div>
              <span className="field-title">Location</span>
              <input
                onChange={onHandleChange}
                value={form.location || ''}
                name="location"
                className="common-input"
                placeholder="Melbourne"
              />
            </div>
            <div />
          </div>
          <div className="dashed-flex">
            <div>
              <span className="field-title">Company</span>
              <input
                className="common-input"
                onChange={onHandleChange}
                value={form.company || ''}
                name="company"
                placeholder="ABC News"
              />
            </div>
            <div>
              <span className="field-title">Company Size</span>
              <select
                className="common-input"
                value={form.company_size}
                onChange={onHandleChange}
                name="company_size"
              >
                {company &&
                  company.data &&
                  company.data.map(value => <option key={value}>{value}</option>)}
              </select>
            </div>
            <div>
              <span className="field-title">Industry</span>
              <select
                className="common-input"
                value={form.industry}
                onChange={onHandleChange}
                name="industry"
              >
                {industries &&
                  industries.data &&
                  industries.data.map(value => <option key={value}>{value}</option>)}
              </select>
            </div>
          </div>
          <button type="button" onClick={onHandleSubmit} className="button success-button mt-20">
            UPDATE
          </button>
        </div>
        {/* <div className='dashed-container'>
          <div className='absolute-position-title'>CHANGED PASSWORD</div>
          <div className='success-message'>
            <span>!</span>
            <span>Password updated Successfully.</span>
          </div>

          <div className="dashed-flex">
            <div>
              <span className="field-title">Current Password</span>
              <input type="password" className="common-input" />
            </div>
            <div>
              <span className="field-title">New Password</span>
              <input type="password" className="common-input" />
            </div>
            <div>
              <span className="field-title">Confirm Password</span>
              <input type="password" className="common-input" />
            </div>
          </div>
          <button type="submit" className="button success-button mt-20">
            UPDATE
          </button>
        </div> */}

        <div className="dashed-container notifications-container">
          <div className="absolute-position-title">NOTIFICATIONS</div>
          {/* <div className='notification--radio-button-row'>
            <input type='radio' className='mr-10' />
            <span>Daily</span>
            <input type="radio" className="mr-10" />
            <span>Weekly</span>
            <input type="radio" className="mr-10" />
            <span>Monthly</span>
          </div>
          <div className="notification--radio-button-row mt-10">
            <input type="radio" className="mr-10" />
            <span>Custom</span>
          </div> */}
          <div className="d-flex mt-20">
            <input id="browser" type="checkbox" />
            <label htmlFor="browser" className="mr-20">
              Browser
            </label>
            <input id="email" type="checkbox" />
            <label htmlFor="email" className="mr-20">
              Email
            </label>
          </div>
          <button type="submit" className="button success-button mt-20">
            UPDATE
          </button>
        </div>
        <div className="dashed-container">
          <div className="absolute-position-title">SUBSCRIPTION</div>
          <div className="subscription-row">
            <div className="subscription-status">
              {client && client.data && client.data.isActive ? (
                <>
                  <div className="active" />
                  Active
                </>
              ) : (
                <>
                  <div className="inactive" />
                  In Active
                </>
              )}
            </div>

            <div className="d-flex">
              {/* <button type='button' className='mr-10'>Pause</button> */}
              <button type="button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div className="account-right">
        <div className="dashed-container">
          <div className="absolute-position-title">TRANSACTION HISTORY</div>
          <div className="common-subtitle mar-bott-5">Date Range</div>
          <div className="date-range-button-container">
            <div className="d-flex">
              <div className="date-picker">
                <DatePicker
                  placeholderText="From"
                  className="common-input"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                />
              </div>
              <div className="date-picker">
                <DatePicker
                  placeholderText="To"
                  className="common-input"
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                />
              </div>
            </div>
            <button type="button" className="button primary-button" onClick={onDownloadFullHistory}>
              DOWNLOAD FULL HISTORY
            </button>
          </div>
          <div className="transaction-history-table-row mt-20">
            <div>Date</div>
            <div>Amount</div>
            <div>Subscription Type</div>
            <div>Receipt No.</div>
            <div className="actions" />
          </div>
          <div className="transaction-history-table-row table-row">
            <div>01/01/2021</div>
            <div>$100</div>
            <div>Monthly</div>
            <div>9876543210</div>
            <div className="actions">
              <img src={eye} />
              <img src={download} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
