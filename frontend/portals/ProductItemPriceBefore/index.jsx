import React from 'react';
import PropTypes from 'prop-types';
import GridBadge from '../../components/GridBadge';
import CardBadge from '../../components/CardBadge';
import { PRODUCT_CARD_LOCATION } from '../../constants';
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

  const badge = location === PRODUCT_CARD_LOCATION ?
    (<CardBadge badgeInfo={badgeInfo} />) :
    (<GridBadge badgeInfo={badgeInfo} />);

  return badge;
};

ProductItemPriceBefore.propTypes = {
  location: PropTypes.string.isRequired,
  badgeInfo: PropTypes.arrayOf(PropTypes.string),
};

ProductItemPriceBefore.defaultProps = {
  badgeInfo: null,
};

export default connect(ProductItemPriceBefore);
