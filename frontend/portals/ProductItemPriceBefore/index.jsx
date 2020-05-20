import React from 'react';
import PropTypes from 'prop-types';
import {
  PRODUCT_GRID_LOCATION,
} from '../../constants';
import Badge from '../../components/Badge';
import connect from '../connector';
import { showOnSliders } from '../../config';

/**
 * @param {string} location the portal location
 * @param {Object} badgeInfo badge images to display
 * @returns {JSX}
 */
const ProductItemPriceBefore = ({ location, badgeInfo }) => {
  // Needed so that badge is not rendered twice in product grid view
  if (!showOnSliders || !location || location === PRODUCT_GRID_LOCATION || !badgeInfo || badgeInfo.length === 0) {
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
