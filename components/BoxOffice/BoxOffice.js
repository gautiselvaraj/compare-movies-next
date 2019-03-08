import React from 'react';
import PropTypes from 'prop-types';
import { formatedCurrency } from '../../utils/CMUtils';
import './BoxOffice.scss';

const BoxOffice = ({ budget, revenue }) => {
  if (!revenue || revenue < 1000) {
    return null;
  }

  return (
    <span className="box-office tooltip" aria-label="Box Office">
      {formatedCurrency(revenue)}
    </span>
  );
};

BoxOffice.propTypes = {
  revenue: PropTypes.number
};

export default BoxOffice;
