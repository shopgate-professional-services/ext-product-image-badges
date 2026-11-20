import { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useWidgetSettings } from '@shopgate/engage/core';
import {
  useProductListEntry,
  ProductContext,
  getProduct,
  getProductDiscount,
} from '@shopgate/engage/product';
import {
  AREA_PDP,
  AREA_SLIDERS,
  AREA_LISTS,
  getBadgeArea,
  getAreaBadges,
} from '../helpers';
import config from '../config.json';

const {
  badgeMap,
  badgeDisplayCount,
  showOnPdp,
  showOnSliders,
  showOnLists,
  badgePositionPdp,
  badgePositionSliders,
  badgePositionLists,
} = config;

const areaSettings = {
  [AREA_PDP]: {
    show: showOnPdp,
    position: badgePositionPdp,
  },
  [AREA_SLIDERS]: {
    show: showOnSliders,
    position: badgePositionSliders,
  },
  [AREA_LISTS]: {
    show: showOnLists,
    position: badgePositionLists,
  },
};

export const PDP_DISCOUNT_BADGE_SETTINGS = '@shopgate/engage/product/components/ProductDiscountBadge';

/**
 * Resolves the badges of the current product list entry and whether they have to be placed
 * below the discount badge of the theme.
 * @param {Object} [fallback] values for locations outside of a product list entry
 * @param {string} [fallback.area] badge area
 * @param {string} [fallback.productId] product id
 * @returns {Object} area, badges, position and stackBelowDiscount
 */
const useAreaBadges = (fallback = {}) => {
  const entry = useProductListEntry() || {};
  const productId = entry.productId || fallback.productId;
  const area = getBadgeArea(entry.productListType, entry.productListSubType)
    || fallback.area
    || null;
  const { show = false, position } = areaSettings[area] || {};

  const { productId: pdpProductId } = useContext(ProductContext) || {};

  const props = useMemo(() => ({ productId }), [productId]);
  // On the pdp the theme takes the discount of the base product, not of the selected variant.
  const discountProps = useMemo(() => ({
    productId: area === AREA_PDP && pdpProductId ? pdpProductId : productId,
  }), [area, pdpProductId, productId]);
  const product = useSelector(state => getProduct(state, props));
  const discount = useSelector(state => getProductDiscount(state, discountProps));
  const { pdp } = useWidgetSettings(PDP_DISCOUNT_BADGE_SETTINGS) || {};

  const badges = useMemo(
    () => (show ? getAreaBadges(product, area, badgeMap, badgeDisplayCount) : []),
    [area, product, show]
  );

  // The theme shows the discount badge on the pdp image only when its widget setting is enabled.
  const discountBadgeShown = !!discount && (area !== AREA_PDP || !!pdp?.show);

  return {
    area,
    badges,
    position,
    stackBelowDiscount: position === 'topLeft' && discountBadgeShown,
  };
};

export default useAreaBadges;
