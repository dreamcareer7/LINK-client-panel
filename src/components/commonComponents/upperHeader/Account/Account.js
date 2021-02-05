import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Account.scss';
import DatePicker from 'react-datepicker';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import {
  getCompanySize,
  getIndutries,
  getInvoices,
  updateClientInfo,
} from '../../../../redux/actions/accountAction/AccountAction';

import AccountService from '../../../../services/account-services/AccountServices';
import { downloadInvoiceHistory } from '../../../../helpers/downloadInvoiceHistory';
import InvoicesList from './InvoicesList';
import { errorNotification } from '../../../../constants/Toast';

function Account() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pagenum, setPageNum] = useState(1);
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
  const { company, client, industries, invoices } = useSelector(state => state.AccountReducer);
  console.log('pagenum=>', pagenum);
  console.log('client=>', client.data.stripeCustomerId);
  useEffect(() => {
    const data = {
      page: 1,
    };
    window.recer();
    dispatch(getInvoices(data));
  }, []);

  const docs = useMemo(() => (invoices && invoices.data ? invoices.data : null), [invoices]);
  const invoiceData = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  const activePage = useMemo(() => (docs && docs.page ? docs.page : 1), [docs]);
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
  const onEndDateChange = e => {
    setEndDate(e);
    const date = moment(e);
    const today = new Date();
    if (date) {
      if (startDate) {
        if (date.isBefore(moment(startDate))) {
          errorNotification('You can not set end date before start date');
        } else {
          const data = {
            page: pagenum,
            startDate: moment(startDate).toISOString(),
            endDate: today.toISOString(),
          };
          dispatch(getInvoices(data));
        }
      } else {
        const data = {
          page: pagenum,
          startDate: date.subtract(30, 'days').toISOString(),
          endDate: date.toISOString(),
        };
        dispatch(getInvoices(data));
      }
    }
  };
  const onStartDateChange = date => {
    setStartDate(date);
    if (date) {
      if (endDate && moment(endDate).isBefore(date)) {
        errorNotification('You can not set end date before start date');
      } else {
        const today = new Date();

        const data = {
          page: pagenum,
          startDate: moment(date).toISOString(),
          endDate: today.toISOString(),
        };
        dispatch(getInvoices(data));
      }
    }
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
        const invoice = r.data;
        downloadInvoiceHistory(invoice, 'invoice.csv');
      })
      .catch(e => console.log(e));
  };
  const handlePageChange = page => {
    setPageNum(page);
    const data = {
      page,
    };
    dispatch(getInvoices(data));
  };

  /* const onCancelScriptRun = () => {
    try {
      window.barecancel.params = {
        access_token_id: 'f3f1ef18-d0de-46c2-9038-31eb84adc7a4', // Your Cancellation API public key
        customer_oid: client.data.stripeCustomerId, // The provider id of this customer. For example, the Stripe Customer ID
        callback_send(data) {
          console.log(165);
          console.log(data);
        },
        callback_error(error) {
          console.error(error);
        },
      };
      dispatch(getClientInfo());
    } catch (e) {
      console.log(e);
    }
  }; */

  console.log(moment().format('YYYY-MM-DD'));
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

              <button type="button" id="barecancel-trigger">
                Cancel
              </button>
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
                  maxDate={moment().toDate()}
                  onChange={onStartDateChange}
                />
              </div>

              <div className="date-picker">
                <DatePicker
                  placeholderText="To"
                  className="common-input"
                  selected={endDate}
                  minDate={startDate}
                  maxDate={moment().toDate()}
                  onChange={onEndDateChange}
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

          {invoiceData &&
            invoiceData.map((invoice, index) => (
              <InvoicesList key={index.toString()} invoice={invoice} />
            ))}
          {invoices && invoices.data && invoices.data.docs && invoices.data.docs.length > 5 && (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={invoices.total || 1}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
