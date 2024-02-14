import { createSelector } from 'reselect';
import { getProduct } from '@shopgate/engage/product';
import { isTriggered } from '../helpers';
import { badgeMap, badgeDisplayCount } from '../config';

export const getBadgeInfo = createSelector(
  getProduct,
  (productData) => {
    if (!productData || productData.isFetching) {
      return [];
    }

    const badgeInfo = badgeMap.filter(badge => isTriggered(productData, badge))
      .map(filteredBadge => filteredBadge.src);

    if (!badgeInfo) {
      return null;
    }

    return badgeInfo.slice(0, badgeDisplayCount);
  }
);
