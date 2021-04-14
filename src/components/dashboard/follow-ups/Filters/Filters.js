import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import {
  changeCheckbox,
  changeDealValue,
  changePotentialCheckbox,
  resetFilterData,
} from '../../../../redux/actions/filterAction/FilterAction';

const numberToUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

function Filters() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const followupData = useSelector(state => state.followUps);

  const [limits, setLimits] = useState(9);
  // startDeal, endDeal,
  const { stageInitialState, potentialInitialState, startDeal, endDeal } = useSelector(
    ({ filterReducer }) => filterReducer
  );

  const dealSizes = useMemo(
    () =>
      followupData && followupData.dealSize && followupData.dealSize[0]
        ? followupData.dealSize[0]
        : null,
    [followupData]
  );

  useEffect(() => {
    if (document.getElementsByClassName('client-detail-page')[0].offsetWidth <= 963) {
      setLimits(10);
    } else {
      setLimits(9);
    }
  }, []);

  const handleRangePickerChange = value => {
    dispatch(changeDealValue(value));
  };

  const applyFilters = () => {
    if (moment(startDate).isAfter(endDate)) {
      errorNotification('Please enter a valid date range');
    } else if (moment(endDate).isBefore(startDate)) {
      errorNotification('Please enter a valid date range');
    } else {
      const data = {
        stages: Object.entries(stageInitialState)
          .filter(e => e[1].value)
          .map(e => e[0]),
        likelyHoods: Object.entries(potentialInitialState)
          .filter(e => e[1].value)
          .map(e => e[0]),
        startDeal: startDeal.value,
        endDeal: endDeal.value,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
      };

      dispatch(getUpcomingActions(followupData.docs.page, limits, data));
    }
  };
  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    const dealData = {
      endDealValue: dealSizes?.maxDealValue || 999999999,
      startDealValue: dealSizes?.minDealValue || 1,
    };
    dispatch(resetFilterData(dealData));
    const data = {
      stages: [],
      likelyHoods: [],
    };
    dispatch(getUpcomingActions(1, limits, data));
  };

  const onChangeCheckbox = useCallback(e => {
    dispatch(changeCheckbox({ name: e.target.name, value: e.target.checked }));
  }, []);

  const onChangePotential = useCallback(e => {
    dispatch(changePotentialCheckbox({ name: e.target.name, value: e.target.checked }));
  }, []);

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
        {Object.entries(stageInitialState).map(data => (
          <FollowUpCheckBox key={Math.random()} onChange={onChangeCheckbox} data={data} />
        ))}

        <div className="common-title mt-4 mb-2">Deal Size</div>

        <div className="filter-deal-range-container">
          <InputRange
            minValue={dealSizes && dealSizes?.minDealValue ? dealSizes.minDealValue : 1}
            maxValue={dealSizes && dealSizes?.maxDealValue ? dealSizes.maxDealValue : 999999999}
            formatLabel={a => `$${a}`}
            onChange={handleRangePickerChange}
            value={{
              min: startDeal?.value || 1,
              max: endDeal?.value || 999999999,
            }}
          />
          <div className="deal-value-container">
            <span className="common-subtitle mr-5">Min: </span>
            <span>{numberToUSD.format(startDeal?.value)}</span>
          </div>
          <div className="deal-value-container">
            <span className="common-subtitle mr-5">Max: </span>
            <span>{numberToUSD.format(endDeal?.value)}</span>
          </div>
        </div>

        <div className="common-title mt-4 mb-10">Likelihood</div>
        {Object.entries(potentialInitialState).map(data => (
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
