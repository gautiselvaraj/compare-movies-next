import React from 'react';
import PropTypes from 'prop-types';
import { formatedCurrency } from '~/utils/CMUtils';
import './Profit.scss';

const Profit = ({ budget, revenue }) => {
  if (!budget || !revenue || budget < 1000 || revenue < 1000) {
    return null;
  }

  return (
    <span className="profit tooltip" data-title="Profit">
      {formatedCurrency(revenue - budget)}
    </span>
  );
};

Profit.propTypes = {
  budget: PropTypes.number,
  revenue: PropTypes.number
};

export default Profit;
