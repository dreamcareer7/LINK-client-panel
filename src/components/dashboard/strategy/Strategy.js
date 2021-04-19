import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Strategy.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getStrategies } from '../../../redux/actions/strategyAction/StrategyAction';

const Strategy = () => {
  /*  const steps = [
    {
      title: 'STEP 1 : OUTCOME',
      data:
        'yiuidsd uuuu  Donec bibendum vel est id ornare.{{click here$$https://www.google.com/}} Quisque purus odio',
      video: 'VIDEO',
    },
    {
      title: 'STEP 2 : TARGET MARKET',
      data:
        'Praesent a nisl vitae lorem malesuada posuere ut a magna. Quisque consectetur velit ac lobortis tristique. Curabitur at sapien nec nisi venenatis tincidunt. Nunc turpis velit, rutrum non posuere eu, convallis sed ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras sed faucibus odio, non consectetur leo. Ut convallis sem ultricies accumsan condimentum. Donec bibendum vel est id ornare. Quisque purus odio, pharetra vel sodales in, consequat non mauris. Quisque non tellus eget mi ornare rutrum sit amet non sem. Fusce in pharetra lacus. Integer et elementum leo.',
      video: 'VIDEO2',
    },
    {
      title: 'STEP 3 : PROFILE',
      data:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate orci sed purus egestas, a mattis diam iaculis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras consequat ex et mauris posuere, eu lacinia ante congue. Praesent a nisl vitae lorem malesuada posuere ut a magna. Quisque consectetur velit ac lobortis tristique. Curabitur at sapien nec nisi venenatis tincidunt. Nunc turpis velit, rutrum non posuere eu, convallis sed ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras sed faucibus odio, non consectetur leo. Ut convallis sem ultricies accumsan condimentum. Donec bibendum vel est id ornare. Quisque purus odio, pharetra vel sodales in, consequat non mauris. Quisque non tellus eget mi ornare rutrum sit amet non sem. Fusce in pharetra lacus. Integer et elementum leo.',
      video: 'VIDEO 3',
    },
    {
      title: 'STEP 4 : CONNECT',
      data:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Praesent a nisl vitae lorem malesuada posuere ut a magna. Quisque consectetur velit ac lobortis tristique. Curabitur at sapien nec nisi venenatis tincidunt. Nunc turpis velit, rutrum non posuere eu, convallis sed ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras sed faucibus odio, non consectetur leo. Ut convallis sem ultricies accumsan condimentum. Donec bibendum vel est id ornare. Quisque purus odio, pharetra vel sodales in, consequat non mauris. Quisque non tellus eget mi ornare rutrum sit amet non sem. Fusce in pharetra lacus. Integer et elementum leo.',
      video: 'VIDEO 3',
    },
  ]; */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStrategies());
  }, []);

  const [isReadMoreClick, setIsReadMoreClick] = useState(-1);
  const forceUpdate = useState(false);
  const elRefs = useRef([]);

  const strategyData = useSelector(({ strategy }) => strategy);

  const getData = index => {
    const target = strategyData[index];
    const b = target?.description?.match(/(?<={{)(.*?)(?=}})/);
    if (b) {
      const aa = b[1].split('$$');
      const link = `<a href='${aa[1]}' target="_blank">${aa[0]}</a>`;
      return target?.description.replace(/{{(.*?)}}/, link);
    }
    return target?.description;
  };

  const readMoreData = useCallback(
    e => {
      console.log('e->', e);
      setIsReadMoreClick(e);
    },
    [setIsReadMoreClick]
  );

  const showReadMore = useCallback(
    target => {
      if (target) {
        return target?.scrollHeight > target?.offsetHeight;
      }
      return false;
    },
    [elRefs.current]
  );

  const measuredRef = useCallback(
    (node, index) => {
      if (node !== null) {
        elRefs.current[index] = showReadMore(node);
        forceUpdate[1](true);
      }
    },
    [elRefs.current, showReadMore]
  );

  return (
    <div className="strategy-container">
      {strategyData?.map((step, index) => (
        <div>
          <div className="common-title chart-title strategy-title">{step.title}</div>
          <span
            id={`data-${index}`}
            ref={node => measuredRef(node, index)}
            className={`strategy-data  ${isReadMoreClick !== index && 'read-more'}`}
          >
            <span dangerouslySetInnerHTML={{ __html: getData(index) }} />(
            {elRefs.current[index] && (
              <span
                className="common-subtitle cursor-pointer read-more-text"
                onClick={
                  isReadMoreClick !== index
                    ? () => readMoreData(index)
                    : () => setIsReadMoreClick(-1)
                }
              >
                {isReadMoreClick !== index ? 'Read more' : 'Read less'}
              </span>
            )}
            )
          </span>
          <div style={{ borderRadius: '10px' }}>
            <div
              dangerouslySetInnerHTML={{
                __html: strategyData[index].videoScript,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Strategy;
