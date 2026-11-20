import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../../components/Badge';
import useAreaBadges from '../../hooks/useAreaBadges';
import { AREA_PDP } from '../../helpers';

/**
 * Some layouts render the pdp discount badge outside of the product list entry of the media
 * section, so the portal props are used as a fallback.
 */
const PDP_DISCOUNT_BADGE_LOCATION = 'productDiscountBadge';

/**
 * Renders the badges below the discount badge of the theme when both share the top left corner.
 * @param {Object} props component props
 * @param {string} props.location location of the theme badge container
 * @param {string} props.productId product id of the theme badge container
 * @returns {JSX.Element|null}
 */
const ProductBadgesAfter = ({ location, productId }) => {
  const { area, badges, stackBelowDiscount } = useAreaBadges({
    area: location === PDP_DISCOUNT_BADGE_LOCATION ? AREA_PDP : null,
    productId,
  });

  if (!stackBelowDiscount || badges.length === 0) {
    return null;
  }

  return <Badge area={area} badgePosition="topLeft" badgeInfo={badges} stacked />;
};

ProductBadgesAfter.propTypes = {
  location: PropTypes.string,
  productId: PropTypes.string,
};

ProductBadgesAfter.defaultProps = {
  location: null,
  productId: null,
};

export default ProductBadgesAfter;
