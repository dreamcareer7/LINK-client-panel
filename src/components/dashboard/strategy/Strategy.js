import React, { useState, useCallback } from 'react';
import './Strategy.scss';

const Strategy = () => {
  const steps = [
    {
      title: 'STEP 1 : OUTCOME',
      data:
        'yiuidsd uuuu  Donec bibendum vel est id ornare.{{click here$$https://www.google.com/}} Quisque purus odio, pharetra vel sodales in, consequat non mauris. Quisque non tellus eget mi ornare rutrum sit amet non sem. Fusce in pharetra lacus. Integer et elementum leo.',
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
  ];
  const [isReadMoreClick, setIsReadMoreClick] = useState(-1);

  const getData = index => {
    const target = steps[index];
    const b = target.data.match(/(?<={{)(.*?)(?=}})/);
    if (b) {
      const aa = b[1].split('$$');
      const link = `<a href='${aa[1]}' target="_blank">${aa[0]}</a>`;
      return target.data.replace(/{{(.*?)}}/, link);
    }
    return target.data;
  };

  /* const show = document.getElementsByClassName('strategy-data')?.[0]?.scrollHeight;
  console.log(show); */
  const readMoreData = useCallback(
    e => {
      setIsReadMoreClick(e);
    },
    [setIsReadMoreClick]
  );
  return (
    <div className="strategy-container">
      {steps.map((step, i) => (
        <div>
          <div className="common-title chart-title strategy-title">{step.title}</div>
          <span className={`strategy-data ${isReadMoreClick !== i && 'read-more'}`}>
            <span dangerouslySetInnerHTML={{ __html: getData(i) }} />(
            <span
              className="common-subtitle cursor-pointer read-more-text"
              onClick={isReadMoreClick !== i ? () => readMoreData(i) : () => setIsReadMoreClick(-1)}
            >
              {isReadMoreClick !== i ? 'Read more' : 'Read less'}
            </span>
            )
          </span>

          <div style={{ borderRadius: '10px' }}>
            <div
              className="wistia_responsive_padding"
              style={{ padding: '56.25% 0 0 0', position: 'relative' }}
            >
              <div
                className="wistia_responsive_wrapper"
                style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
              >
                <span
                  className="wistia_embed wistia_async_wks36r0sz0 popover=true popoverAnimateThumbnail=true videoFoam=true"
                  style={{
                    display: 'inline-block',
                    height: '100%',
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  &nbsp;
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Strategy;
