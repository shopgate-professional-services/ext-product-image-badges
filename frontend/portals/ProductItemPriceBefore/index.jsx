import React from 'react';
import PropTypes from 'prop-types';
import {
  PRODUCT_GRID_LOCATION,
} from '../../constants';
import Badge from '../../components/Badge';
import connect from '../connector';

/**
 * @param {string} location the portal location
 * @param {Object} badgeInfo badge images to display
 * @returns {JSX}
 */
const ProductItemPriceBefore = ({ location, badgeInfo }) => {
  if (!location || location === PRODUCT_GRID_LOCATION || !badgeInfo || badgeInfo.length === 0) {
    return null;
  }

  return <Badge location={location} badgeInfo={badgeInfo} />;
};

ProductItemPriceBefore.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.string,
};

ProductItemPriceBefore.defaultProps = {
  badgeInfo: null,
  location: null,
};

export default connect(ProductItemPriceBefore);
