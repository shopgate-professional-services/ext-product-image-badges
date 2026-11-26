import React from 'react';
import Badge from '../../components/Badge';
import useAreaBadges from '../../hooks/useAreaBadges';

/**
 * Renders the badges below the discount badge of the theme when both share the top left corner.
 * @returns {JSX.Element|null}
 */
const ProductBadgesAfter = () => {
  const { area, badges, stackBelowDiscount } = useAreaBadges();

  if (!stackBelowDiscount || badges.length === 0) {
    return null;
  }

  return <Badge area={area} badgePosition="topLeft" badgeInfo={badges} stacked />;
};

export default ProductBadgesAfter;
