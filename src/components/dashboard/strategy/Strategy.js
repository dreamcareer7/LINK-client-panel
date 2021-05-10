/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import './Strategy.scss';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getStrategies } from '../../../redux/actions/strategyAction/StrategyAction';
import Loader from '../../commonComponents/Loader/Loader';

const Strategy = () => {
  const dispatch = useDispatch();
  const { strategyData, isLoading } = useSelector(({ strategy }) => strategy ?? {});

  /*  const [isReadMoreNeeded, setIsReadMoreNeeded] = useState(false);

    const resizeListener = () => {
      const descriptionLength = strategyData.map(strategy => strategy.description.length);
      console.log(descriptionLength);
      const s = document.getElementsByClassName('strategy')?.[0].offsetWidth;
      if (s < 635) setIsReadMoreNeeded(true);
    };

    useEffect(() => {
      window.addEventListener('resize', resizeListener);
    }, [isReadMoreNeeded]); */

  useEffect(() => {
    document.title = 'Strategy';
    dispatch(getStrategies());
  }, []);

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {strategyData && !isLoading ? (
        strategyData.length !== 0 ? (
          <div className="strategy-container" id="s1">
            {strategyData?.map((step, index) => (
              <CardBox step={step} index={index} className="strategy" />
            ))}
          </div>
        ) : (
          <div className="no-data-in-strategy">No Data Available</div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Strategy;

function CardBox(props) {
  const { step, ...restProps } = props;

  const component = useRef(null);
  const readMore = useRef(null);
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
      return (target?.scrollHeight ?? 0) > (target?.offsetHeight ?? 0);
    }
    return false;
  }, []);

  const measuredRef = useCallback(
    node => {
      if (node !== null) {
        component.current = node;
        shouldShowReadMore.current = showReadMore(node);

        forceUpdate[1](e => !e);
      }
    },
    [component.current, showReadMore, shouldShowReadMore.current]
  );

  const changeReadMoreCallback = useCallback(() => {
    measuredRef(component.current);
  }, [component.current, measuredRef]);

  const handleResize = useCallback(_.throttle(changeReadMoreCallback, 1000), [
    changeReadMoreCallback,
  ]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [measuredRef]);

  useEffect(() => {
    const element = readMore.current;
    if (element) {
      if (expanded) {
        element.style.position = 'absolute';
      } else {
        element.style.position = 'static';
      }
    }
  }, [expanded, readMore.current]);

  return (
    <div {...restProps}>
      <div className="common-title chart-title strategy-title">{step.title}</div>
      <span ref={measuredRef} className={`strategy-data  ${expanded && 'read-more'}`}>
        <span dangerouslySetInnerHTML={{ __html: getData() }} />
        {shouldShowReadMore.current && (
          <span
            className="common-subtitle cursor-pointer read-more-text"
            ref={readMore}
            onClick={() => setExpanded(e => !e)}
          >
            {expanded ? 'Read more' : 'Read less'}
          </span>
        )}
      </span>
      <div className="video-script-style">
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
