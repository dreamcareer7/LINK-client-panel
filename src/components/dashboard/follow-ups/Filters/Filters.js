import React, { useCallback, useReducer, useState } from 'react';
import './Filters.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FollowUpCheckBox from './FollowUpCheckBox';

const stageInitialState = {
  INITIAL_CONTACT: {
    name: 'Initial Contact',
    value: false,
  },
  IN_CONVERSION: {
    name: 'In Conversation',
    value: false,
  },
  MEETING_BOOKED: {
    name: 'Meeting Booked',
    value: false,
  },
  FOLLOW_UP: {
    name: 'Follow Up',
    value: false,
  },
  POTENTIAL_DEAL: {
    name: 'Potential Deal',
    value: false,
  },
  CLOSED: {
    name: 'Closed',
    value: false,
  },
  LOST: {
    name: 'Lost',
    value: false,
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKBOX':
      // eslint-disable-next-line no-case-declarations
      const temp = { ...state };
      temp[`${action.name}`].value = action.value;
      return temp;
    default:
      return state;
  }
};
function Filters() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [stageCheckBox, setStageCheckBox] = useReducer(reducer, stageInitialState);

  console.log(
    Object.entries(stageCheckBox)
      .filter(e => e[1].value)
      .map(e => e[0])
  );

  const onChangeCheckbox = useCallback(e => {
    setStageCheckBox({
      type: 'UPDATE_CHECKBOX',
      name: e.target.name,
      value: e.target.checked,
    });
  }, []);
  // console.log(document.getElementById('intial-contact').value);
  return (
    <div>
      <div className="heading placeholder-color">Filters</div>
      <div className="filters-container">
        <div className="common-title">Follow-up Date</div>
        <DatePicker
          className="mt-10"
          placeholderText="From"
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <DatePicker
          className="mt-10"
          placeholderText="To"
          // dateFormat="MM-DD-YYYY"
          selected={endDate}
          onChange={date => setEndDate(date)}
        />

        <div className="common-title mt-20 mb-5">Stage</div>
        {Object.entries(stageCheckBox).map(data => (
          <FollowUpCheckBox key={Math.random()} onChange={onChangeCheckbox} data={data} />
        ))}

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
