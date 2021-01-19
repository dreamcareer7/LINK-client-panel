import React from 'react';
import PropTypes from 'prop-types';

function PotentialCheckBox({ onChange, data }) {
  return (
    <div>
      <input
        id={data[0]}
        type="checkbox"
        name={data[0]}
        checked={data[1].value}
        onChange={onChange}
      />
      <label htmlFor={data[0]} className="checkbox mb-10">
        {data[1].name}
      </label>
    </div>
  );
}
PotentialCheckBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf.isRequired,
};
export default PotentialCheckBox;
