import React from 'react';
import PropTypes from 'prop-types';
import {
  PRODUCT_GRID_LOCATION,
} from '../../constants';
import Badge from '../../components/Badge';
import connect from '../connector';

/**
 * @param {Object} badgeInfo badge images to display
 * @returns {JSX}
 */
const ProductItemImageBefore = ({ badgeInfo }) => {
  if (!badgeInfo || badgeInfo.length === 0) {
    return null;
  }

  return <Badge location={PRODUCT_GRID_LOCATION} badgeInfo={badgeInfo} />;
};

ProductItemImageBefore.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string),
};

ProductItemImageBefore.defaultProps = {
  badgeInfo: null,
};

export default connect(ProductItemImageBefore);
