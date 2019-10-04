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
 * @param {Array} triggerProps config trigger props
 * @returns {boolean}
 */
export const hasTriggerProp = (additionalProperties, triggerProps) => {
  if (!additionalProperties) {
    return false;
  }

  return additionalProperties.some(obj =>
    triggerProps.some(trigger => trigger === obj.label));
};

/**
 * @param {Object} productData productDataObject
 * @param {Object} badge config badgeMap info
 * @returns {boolean} should filter
 */
export const isTriggered = (productData, badge) => {
  const { tags, additionalProperties } = productData || {};
  const { triggerTags, triggerProps } = badge || {};

  return hasTriggerTag(tags, triggerTags) || hasTriggerProp(additionalProperties, triggerProps);
};

