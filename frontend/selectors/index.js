import { createSelector } from 'reselect';
import { getProduct } from '@shopgate/engage/product';
import { isTriggered } from '../helpers';
import config from '../config.json';

const { badgeMap, badgeDisplayCount } = config;

export const getBadgeInfo = createSelector(
  getProduct,
  (productData) => {
    if (!productData || productData.isFetching) {
      return [];
    }

    const badgeInfo = badgeMap
      .map((badge, id) => ({
        ...badge,
        id,
      }))
      .filter(badge => isTriggered(productData, badge))
      .map(({
        id, src, altText, text, style,
      }) => ({
        id,
        src,
        altText,
        text,
        style,
      }));

    if (!badgeInfo) {
      return null;
    }

    return badgeInfo.slice(0, badgeDisplayCount);
  }
);
