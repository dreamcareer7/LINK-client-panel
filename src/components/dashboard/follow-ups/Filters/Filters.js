import React from 'react';
import './Filters.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Filters() {
  return (
    <div>
      <div className="heading placeholder-color">Filters</div>
      <div className="filters-container">
        <div className="common-title">Follow-up Date</div>
        <DatePicker className="mt-10" placeholderText="From" dateFormat="MM-DD-YYYY" />
        <DatePicker className="mt-10" placeholderText="To" dateFormat="MM-DD-YYYY" />
        <div className="common-title mt-20 mb-5">Stage</div>
        <input id="intial-contact" type="checkbox" />
        <label htmlFor="intial-contact" className="checkbox mb-10">
          Initial Contact
        </label>

        <input id="in-conversation" type="checkbox" />
        <label htmlFor="in-conversation" className="checkbox mb-10">
          In Conversation
        </label>

        <input id="meeting-booked" type="checkbox" />
        <label htmlFor="meeting-booked" className="checkbox mb-10">
          Meeting Booked
        </label>

        <input id="follow-up" type="checkbox" />
        <label htmlFor="follow-up" className="checkbox mb-10">
          Follow Up
        </label>

        <input id="potential-deal" type="checkbox" />
        <label htmlFor="potential-deal" className="checkbox mb-10">
          Potential Deal
        </label>

        <input id="closed" type="checkbox" />
        <label htmlFor="closed" className="checkbox mb-10">
          Closed
        </label>

        <input id="lost" type="checkbox" />
        <label htmlFor="losts" className="checkbox">
          Lost
        </label>

        <div className="common-title mt-20 mb-5">Deal Size</div>
        <select className="common-select white-input w-100">
          <option value="$501-$1000">$501-$1000</option>
          <option value="$501-$1000">$501-$1000</option>
          <option value="$501-$1000">$501-$1000</option>
        </select>

        <div className="common-title mt-20 mb-5">Potential</div>
        <input id="very-likely-deals" type="checkbox" />
        <label htmlFor="very-likely-deals" className="checkbox mb-10">
          Very Likely Deals
        </label>

        <input id="likely-deals" type="checkbox" />
        <label htmlFor="likely-deals" className="checkbox mb-10">
          Likely Deals
        </label>

        <input id="not-likely-deals" type="checkbox" />
        <label htmlFor="not-likely-deals" className="checkbox mb-10">
          Not Likely Deals
        </label>

        <button type="submit" className="button success-button mt-20">
          Apply Filters
        </button>
        <button type="button" className="button primary-button mt-10">
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
