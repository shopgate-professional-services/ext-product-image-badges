import { createSelector } from 'reselect';
import { getProductDataById } from '@shopgate/engage/product';
import { isTriggered } from '../helpers';
import { badgeMap, badgeDisplayCount } from '../config';

export const getBadgeInfo = createSelector(
  getProductDataById,
  (productData) => {
    const badgeInfo = badgeMap.filter(badge => isTriggered(productData, badge))
      .map(filteredBadge => filteredBadge.src);

    if (!badgeInfo) {
      return null;
    }

    return badgeInfo.slice(0, badgeDisplayCount);
  }
);
