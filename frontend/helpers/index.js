/**
 * @param {Array} tags product tags
 * @param {Array} triggerTags config trigger tags
 * @returns {boolean}
 */
export const hasTriggerTag = (tags, triggerTags) => {
  if (!tags) {
    return false;
  }

  return tags.some(tag =>
    triggerTags.some(trigger => trigger === tag));
};

/**
 * @param {Array} additionalProperties product additional properties
 * @param {Array} properties product additional properties
 * @param {Array} triggerProps config trigger props
 * @returns {boolean}
 */
export const hasTriggerProp = (additionalProperties, properties, triggerProps) => {
  if (!additionalProperties && !properties) {
    return false;
  }

  if (additionalProperties) {
    return additionalProperties.some(obj =>
      triggerProps.some(trigger =>
        trigger.label === obj.label && trigger.value === obj.value));
  }

  if (properties) {
    return properties.some(obj =>
      triggerProps.some(trigger =>
        trigger.label === obj.label && trigger.value === obj.value));
  }

  return false;
};

/**
 * @param {Object} productData productDataObject
 * @param {Object} badge config badgeMap info
 * @returns {boolean} should filter
 */
export const isTriggered = (productData, badge) => {
  const { tags, additionalProperties, properties } = productData || {};
  const { triggerTags, triggerProps } = badge || {};

  return hasTriggerTag(tags, triggerTags) ||
    hasTriggerProp(additionalProperties, properties, triggerProps);
};

export const AREA_PDP = 'pdp';
export const AREA_SLIDERS = 'sliders';
export const AREA_LISTS = 'lists';

/**
 * Maps the product list type of a badge location to the area used in the extension config.
 * @param {string} productListType product list type from the product list entry context
 * @param {string} productListSubType product list sub type from the product list entry context
 * @returns {string|null}
 */
export const getBadgeArea = (productListType, productListSubType) => {
  if (productListType === 'pdp' && productListSubType === 'mediaSection') {
    return AREA_PDP;
  }

  if (productListType === 'productSlider') {
    return AREA_SLIDERS;
  }

  if (productListType === 'productGrid') {
    return AREA_LISTS;
  }

  return null;
};

/**
 * Badges without a showOn list are shown in every area.
 * @param {Object} badge config badgeMap info
 * @param {string} area badge area
 * @returns {boolean}
 */
export const isShownInArea = (badge, area) =>
  !Array.isArray(badge?.showOn) || badge.showOn.includes(area);

/**
 * @param {Object} productData productDataObject
 * @param {string} area badge area
 * @param {Array} badgeMap config badgeMap
 * @param {number} badgeDisplayCount max number of badges
 * @returns {Array}
 */
export const getAreaBadges = (productData, area, badgeMap, badgeDisplayCount) => {
  if (!productData || productData.isFetching || !area || !Array.isArray(badgeMap)) {
    return [];
  }

  return badgeMap
    .map((badge, id) => ({
      ...badge,
      id,
    }))
    .filter(badge => isShownInArea(badge, area) && isTriggered(productData, badge))
    .slice(0, badgeDisplayCount)
    .map(({
      id, src, altText, text, style,
    }) => ({
      id,
      src,
      altText,
      text,
      style,
    }));
};
