import React from 'react';
import PropTypes from 'prop-types';

function AuthTextInput(props) {
  const { onChange, value, placeholder, type, src } = props;
  return (
    <div className="form--detail-container">
      <div className="detail-icon">
        <img alt="" src={src} />
      </div>
      <input className="" type={type} onChange={onChange} value={value} placeholder={placeholder} />
    </div>
  );
}

AuthTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  src: PropTypes.element,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
AuthTextInput.defaultProps = {
  type: 'text',
  src: '',
};

export default AuthTextInput;
