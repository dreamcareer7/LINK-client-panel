/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Strategy.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getStrategies } from '../../../redux/actions/strategyAction/StrategyAction';

const Strategy = () => {
  const dispatch = useDispatch();
  const strategyData = useSelector(({ strategy }) => strategy);

  useEffect(() => {
    dispatch(getStrategies());
  }, []);

  return (
    <div className="strategy-container">
      {strategyData?.map((step, index) => (
        <CardBox step={step} index={index} />
      ))}
    </div>
  );
};
export default Strategy;

function CardBox(props) {
  const { step } = props;

  const component = useRef(null);
  const shouldShowReadMore = useRef(false);
  const [expanded, setExpanded] = useState(true);
  const forceUpdate = useState(false);

  const getData = useCallback(() => {
    const description = step?.description ?? null;

    if (description) {
      const b = description?.match(/(?<={{)(.*?)(?=}})/);
      if (b) {
        const aa = b[1].split('$$');
        const link = `<a href='${aa[1]}' target="_blank">${aa[0]}</a>`;
        return description.replace(/{{(.*?)}}/, link);
      }
    }
    return description;
  }, [step, expanded]);

  const showReadMore = useCallback(target => {
    if (target) {
      console.log('');
      console.log(target);
      console.log(target.scrollHeight);
      console.log(target.offsetHeight);
      console.log('');
      return (target?.scrollHeight ?? 0) > (target?.offsetHeight ?? 0);
    }
    return false;
  }, []);

  const measuredRef = useCallback(
    node => {
      if (node !== null) {
        component.current = node;
        if (!shouldShowReadMore.current) {
          shouldShowReadMore.current = showReadMore(node);
        }
        forceUpdate[1]();
      }
    },
    [component.current, showReadMore, forceUpdate, shouldShowReadMore.current]
  );

  return (
    <div>
      <div className="common-title chart-title strategy-title">{step.title}</div>
      <span ref={measuredRef} className={`strategy-data  ${expanded && 'read-more'}`}>
        <span dangerouslySetInnerHTML={{ __html: getData() }} />
        {shouldShowReadMore.current && (
          <span
            className="common-subtitle cursor-pointer read-more-text"
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? 'Read more' : 'Read less'}
          </span>
        )}
      </span>
      <div style={{ borderRadius: '10px' }}>
        <div
          dangerouslySetInnerHTML={{
            __html: step.videoScript,
          }}
        />
      </div>
    </div>
  );
}

CardBox.propTypes = {
  step: PropTypes.shape({
    title: PropTypes.string,
    videoScript: PropTypes.string,
    description: PropTypes.string,
  }),
};

CardBox.defaultProps = {
  step: {
    title: '',
    description: '',
    videoScript: '',
  },
};
