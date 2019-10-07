import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../../components/Badge';
import connect from '../connector';

/**
 * @param {string} location the portal location
 * @param {Object} badgeInfo badge images to display
 * @returns {JSX}
 */
const ProductItemPriceBefore = ({ location, badgeInfo }) => {
  if (!location || !badgeInfo || badgeInfo.length === 0) {
    return null;
  }

  return <Badge location={location} badgeInfo={badgeInfo} />;
};

ProductItemPriceBefore.propTypes = {
  location: PropTypes.string.isRequired,
  badgeInfo: PropTypes.arrayOf(PropTypes.string),
};

ProductItemPriceBefore.defaultProps = {
  badgeInfo: null,
};

export default connect(ProductItemPriceBefore);
