import React, { useCallback, useReducer, useState } from 'react';
import './Filters.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import FollowUpCheckBox from './FollowUpCheckBox';
import PotentialCkeckBox from './PotentialCkeckBox';
import { getUpcomingActions } from '../../../../redux/actions/followUpAction/FollowUpAction';

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
const potentialInitialState = {
  VERY_LIKELY: {
    name: 'Very Likely Deals',
    value: false,
  },
  LIKELY: {
    name: 'Likely Deals',
    value: false,
  },
  NOT_LIKELY: {
    name: 'Not Likely Deals',
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
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [stageCheckBox, setStageCheckBox] = useReducer(reducer, stageInitialState);
  const [potentialCheckBox, setPotentialCheckBox] = useReducer(reducer, potentialInitialState);
  console.log(startDate && startDate.toISOString());
  console.log(
    Object.entries(stageCheckBox)
      .filter(e => e[1].value)
      .map(e => e[0])
  );
  console.log(
    Object.entries(potentialCheckBox)
      .filter(e => e[1].value)
      .map(e => e[0])
  );
  const applyFilters = () => {
    console.log('applay filter');
    const data = {
      stages: Object.entries(stageCheckBox)
        .filter(e => e[1].value)
        .map(e => e[0]),
      likelyHoods: Object.entries(potentialCheckBox)
        .filter(e => e[1].value)
        .map(e => e[0]),
      startDeal: 13,
      endDeal: 1000,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
    };

    dispatch(getUpcomingActions(data));
  };
  const onChangeCheckbox = useCallback(e => {
    setStageCheckBox({
      type: 'UPDATE_CHECKBOX',
      name: e.target.name,
      value: e.target.checked,
    });
  }, []);

  const onChangePotential = useCallback(e => {
    setPotentialCheckBox({
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
        {Object.entries(potentialCheckBox).map(data => (
          <PotentialCkeckBox key={Math.random()} onChange={onChangePotential} data={data} />
        ))}

        <button type="submit" className="button success-button mt-20" onClick={applyFilters}>
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
