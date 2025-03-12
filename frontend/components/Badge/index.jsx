import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useProductListEntry } from '@shopgate/engage/product';
import { css } from 'glamor';
import {
  showOnLists,
  showOnPdp,
  showOnSliders,
  badgeContainerStylingPdp,
  badgeContainerStylingSliders,
  badgeContainerStylingLists,
  badgeStylingPdp,
  badgeStylingSliders,
  badgeStylingLists,
} from '../../config';

const styles = {
  baseContainer: css({
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column-reverse',
  }),
  topLeftContainer: css({
    alignItems: 'start',
    top: 5,
    left: 5,
  }),
  topRightContainer: css({
    alignItems: 'end',
    top: 5,
    right: 5,
  }),
  bottomLeftContainer: css({
    alignItems: 'start',
    bottom: 10,
    left: 5,
  }),
  bottomRightContainer: css({
    alignItems: 'end',
    bottom: 10,
    right: 5,
  }),
  pdpCustomContainer: css({
    ...badgeContainerStylingPdp,
  }),
  productGridCustomContainer: css({
    ...badgeContainerStylingLists,
  }),
  slidersCustomContainer: css({
    ...badgeContainerStylingSliders,
  }),
  badge: css({
    ...badgeStylingPdp,
  }),
  badgeSliders: css({
    ...badgeStylingSliders,
  }),
  badgeLists: css({
    ...badgeStylingLists,
  }),
};

/**
 * @param {Object} props component props
 * @param {Array} props.badgeInfo Array of badge image urls
 * @param {string} props.badgePosition string to declare the badge position
 * @returns {JSX.Element}
 */
const CardBadge = ({ badgeInfo, badgePosition }) => {
  const { productListType, productListSubType } = useProductListEntry();

  const images = useMemo(() => {
    if (!Array.isArray(badgeInfo) || badgeInfo.length === 0) {
      return [];
    }

    if (productListType === 'productSlider') {
      return badgeInfo.map(({ src, altText }, index) => (
        <img className={styles.badgeSliders} src={src} alt={altText} key={index.toString()} />
      ));
    }

    if (productListType === 'productGrid') {
      return badgeInfo.map(({ src, altText }, index) => (
        <img className={styles.badgeLists} src={src} alt={altText} key={index.toString()} />
      ));
    }
    return badgeInfo.map(({ src, altText }, index) => (
      <img className={styles.badge} src={src} alt={altText} key={index.toString()} />
    ));
  }, [badgeInfo, productListType]);

  const containerClasses = useMemo(() => {
    let customClass;

    if (productListType === 'productGrid' && showOnLists) {
      customClass = 'productGridCustomContainer';
    }

    if (productListType === 'pdp' && productListSubType === 'mediaSection' && showOnPdp === true) {
      customClass = 'pdpCustomContainer';
    }

    if (productListType === 'productSlider' && showOnSliders) {
      customClass = 'slidersCustomContainer';
    }
    /**
     * A bit hacky, but we use the presence of the custom class as an indicator that something needs
     * to be rendered.
     */
    if (!customClass) {
      return null;
    }

    return [
      'image-badges',
      styles.baseContainer,
      styles[`${badgePosition}Container`],
      styles[customClass],
    ].join(' ');
  }, [badgePosition, productListSubType, productListType]);

  if (!containerClasses || images.length === 0) {
    return null;
  }

  return (
    <div className={containerClasses}>
      {images}
    </div>
  );
};

CardBadge.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
  badgePosition: PropTypes.string.isRequired,
};

export default CardBadge;
