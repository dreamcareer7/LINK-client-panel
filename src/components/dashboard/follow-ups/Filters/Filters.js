import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import './Filters.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import InputRange from 'react-input-range';
import FollowUpCheckBox from './FollowUpCheckBox';
import PotentialCheckBox from './PotentialCheckBox';
import { getUpcomingActions } from '../../../../redux/actions/followUpAction/FollowUpAction';
import { errorNotification } from '../../../../constants/Toast';

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
  POTENTIAL: {
    name: 'Potential Deals',
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
const initialDeal = {
  startDeal: {
    name: 'startDeal',
    value: 0,
  },
  endDeal: {
    name: 'endDeal',
    value: 1000,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CHECKBOX':
      return {
        ...state,
        [`${action.name}`]: {
          ...state[`${action.name}`],
          value: action.value,
        },
      };
    case 'RESET_STAGE_FILTER':
      return stageInitialState;
    case 'RESET_POTENTIAL_FILTER':
      return potentialInitialState;
    default:
      return state;
  }
};

function Filters() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const followupData = useSelector(state => state.followUps);

  const [stageCheckBox, setStageCheckBox] = useReducer(reducer, stageInitialState);
  const [potentialCheckBox, setPotentialCheckBox] = useReducer(reducer, potentialInitialState);
  const [deal, setDeal] = useReducer(reducer, initialDeal);

  const dealSizes = useMemo(
    () =>
      followupData && followupData.dealSize && followupData.dealSize[0]
        ? followupData.dealSize[0]
        : null,
    [followupData]
  );

  const [rangeState, setRangeState] = useState({
    min: dealSizes?.minDealValue || 1,
    max: dealSizes?.maxDealValue || 999999999,
  });

  useEffect(() => {
    setRangeState({ min: dealSizes?.minDealValue || 1, max: dealSizes?.maxDealValue || 999999999 });
  }, [dealSizes?.minDealValue, dealSizes?.maxDealValue]);

  const handleRangePickerChange = value => {
    setRangeState(value);
    setDeal({
      type: 'UPDATE_CHECKBOX',
      name: 'startDeal',
      value: value?.min || null,
    });
    setDeal({
      type: 'UPDATE_CHECKBOX',
      name: 'endDeal',
      value: value?.max || null,
    });
  };

  const applyFilters = () => {
    if (moment(startDate).isAfter(endDate)) {
      errorNotification('Please enter a date in the future.');
    } else if (moment(endDate).isBefore(startDate)) {
      errorNotification('Please enter to date after from date');
    } else {
      const data = {
        stages: Object.entries(stageCheckBox)
          .filter(e => e[1].value)
          .map(e => e[0]),
        likelyHoods: Object.entries(potentialCheckBox)
          .filter(e => e[1].value)
          .map(e => e[0]),
        startDeal: deal.startDeal.value,
        endDeal: deal.endDeal.value,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
      };

      dispatch(getUpcomingActions(followupData.docs.page, 9, data));
    }
  };
  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setStageCheckBox({ type: 'RESET_STAGE_FILTER' });
    setPotentialCheckBox({ type: 'RESET_POTENTIAL_FILTER' });
    setRangeState({
      min: dealSizes?.minDealValue || 1,
      max: dealSizes?.maxDealValue || 999999999,
    });
    const data = {
      stages: [],
      likelyHoods: [],
    };
    dispatch(getUpcomingActions(1, 9, data));
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
  const numberToUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return (
    <div>
      <div className="heading">Filters</div>
      <div className="filters-container">
        <div className="common-title">Follow Up Date </div>
        <DatePicker
          className="mt-10"
          placeholderText="From date"
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={date => setStartDate(date)}
          onFocus={e => {
            e.target.placeholder = '';
          }}
          onBlur={e => {
            e.target.placeholder = 'From date';
          }}
        />
        <DatePicker
          className="mt-10"
          placeholderText="To date"
          dateFormat="dd/MM/yyyy"
          selected={endDate}
          onChange={date => setEndDate(date)}
          onFocus={e => {
            e.target.placeholder = '';
          }}
          onBlur={e => {
            e.target.placeholder = 'To date';
          }}
        />

        <div className="common-title mt-4 mb-10">Stage</div>
        {Object.entries(stageCheckBox).map(data => (
          <FollowUpCheckBox key={Math.random()} onChange={onChangeCheckbox} data={data} />
        ))}

        <div className="common-title mt-4 mb-2">Deal Size</div>

        <div className="filter-deal-range-container">
          <InputRange
            minValue={dealSizes && dealSizes?.minDealValue ? dealSizes.minDealValue : 1}
            maxValue={dealSizes && dealSizes?.maxDealValue ? dealSizes.maxDealValue : 999999999}
            formatLabel={a => `$${a}`}
            onChange={handleRangePickerChange}
            value={rangeState}
          />
          <div className="deal-value-container">
            <span className="common-subtitle mr-5">Min: </span>
            <span>{numberToUSD.format(rangeState.min)}</span>
          </div>
          <div className="deal-value-container">
            <span className="common-subtitle mr-5">Max: </span>
            <span>{numberToUSD.format(rangeState.max)}</span>
          </div>
        </div>

        <div className="common-title mt-4 mb-10">Likelihood</div>
        {Object.entries(potentialCheckBox).map(data => (
          <PotentialCheckBox key={Math.random()} onChange={onChangePotential} data={data} />
        ))}

        <button
          type="submit"
          className="button success-button filter-apply-filters-button"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button type="button" className="button primary-button mt-10" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
