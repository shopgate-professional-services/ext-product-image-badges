import React from 'react';
import PropTypes from 'prop-types';
import { useProductListEntry } from '@shopgate/engage/product';
import { css } from 'glamor';
import {
  badgeWidth,
  maxBadgeWidth,
  badgeWidthSliders,
  maxBadgeWidthSliders,
  badgeWidthLists,
  maxBadgeWidthLists,
  showOnLists,
  showOnPdp,
  showOnSliders,
  badgeStylingPdp,
  badgeStylingSliders,
  badgeStylingLists,
} from '../../config';

/**
 * @param {*} productListType The productListType
 * @param {*} productListSubType The productListSubType
 * @returns {Object}
 */
const getStyles = (productListType, productListSubType) => ({
  container: css({
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column-reverse',
    width: '100%',
    top: 5,
    left: 5,
    zIndex: 1000,
    ...badgeStylingPdp,
  }).toString(),
  containerTopRight: css({
    display: 'flex',
    position: 'absolute',
    alignItems: 'end',
    flexDirection: 'column-reverse',
    width: '100%',
    top: 5,
    right: 5,
    zIndex: 1000,
    ...badgeStylingPdp,
  }).toString(),
  containerBottomLeft: css({
    display: 'flex',
    flexDirection: 'column-reverse',
    position: 'absolute',
    width: '100%',
    bottom: 10,
    left: 5,
    ...badgeStylingPdp,
  }).toString(),
  containerBottomRight: css({
    display: 'flex',
    flexDirection: 'column-reverse',
    position: 'absolute',
    alignItems: 'end',
    width: '100%',
    bottom: 10,
    right: 5,
    ...badgeStylingPdp,
  }).toString(),
  containerSliders: css({
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column-reverse',
    width: '100%',
    top: 5,
    left: 5,
    zIndex: 1000,
    ...badgeStylingSliders,
  }).toString(),
  containerSlidersTopRight: css({
    display: 'flex',
    position: 'absolute',
    alignItems: 'end',
    flexDirection: 'column-reverse',
    width: '100%',
    top: 5,
    right: 5,
    zIndex: 1000,
    ...badgeStylingSliders,
  }).toString(),
  containerSlidersBottomLeft: css({
    display: 'flex',
    flexDirection: 'column-reverse',
    position: 'absolute',
    width: '100%',
    bottom: productListType === 'productSlider' && productListSubType === 'widgets' ? 100 : 120,
    left: 5,
    ...badgeStylingSliders,
  }).toString(),
  containerSlidersBottomRight: css({
    display: 'flex',
    flexDirection: 'column-reverse',
    position: 'absolute',
    alignItems: 'end',
    width: '100%',
    bottom: productListType === 'productSlider' && productListSubType === 'widgets' ? 100 : 120,
    right: 5,
    ...badgeStylingSliders,
  }).toString(),
  containerLists: css({
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column-reverse',
    width: '100%',
    top: 5,
    left: 5,
    zIndex: 1000,
    ...badgeStylingLists,
  }).toString(),
  containerListsTopRight: css({
    display: 'flex',
    position: 'absolute',
    alignItems: 'end',
    flexDirection: 'column-reverse',
    width: '100%',
    top: 5,
    right: 5,
    zIndex: 1000,
    ...badgeStylingLists,
  }).toString(),
  containerListsBottomLeft: css({
    display: 'flex',
    flexDirection: 'column-reverse',
    position: 'absolute',
    width: '100%',
    bottom: 120,
    left: 5,
    ...badgeStylingLists,
  }).toString(),
  containerListsBottomRight: css({
    display: 'flex',
    flexDirection: 'column-reverse',
    position: 'absolute',
    alignItems: 'end',
    width: '100%',
    bottom: 120,
    right: 5,
    ...badgeStylingLists,
  }).toString(),
  badge: css({
    width: badgeWidth,
    maxWidth: maxBadgeWidth,
  }).toString(),
  badgeSliders: css({
    width: badgeWidthSliders,
    maxWidth: maxBadgeWidthSliders,
  }).toString(),
  badgeLists: css({
    width: badgeWidthLists,
    maxWidth: maxBadgeWidthLists,
  }).toString(),
});

/**
 * @param {Array} badgeInfo Array of badge image urls
 * @returns {JSX}
 */
const CardBadge = ({ badgeInfo, badgePosition }) => {
  const { productListType, productListSubType } = useProductListEntry();

  if (!badgeInfo || badgeInfo.length === 0) {
    return null;
  }

  const styles = getStyles(productListType, productListSubType);

  let images;

  if (productListType === 'productSlider') {
    images = badgeInfo.map((image, index) => (
      <img className={styles.badgeSliders} src={image} alt="" key={index.toString()} />
    ));
  } else if (productListType === 'productGrid') {
    images = badgeInfo.map((image, index) => (
      <img className={styles.badgeLists} src={image} alt="" key={index.toString()} />
    ));
  } else {
    images = badgeInfo.map((image, index) => (
      <img className={styles.badge} src={image} alt="" key={index.toString()} />
    ));
  }

  // badgePostition is topLeft
  if (badgePosition === 'topLeft') {
    if (productListType === 'productGrid' && showOnLists) {
      return <div className={`image-badges ${styles.containerLists}`}>{images}</div>;
    }
    if (productListType === 'pdp' && productListSubType === 'mediaSection' && showOnPdp === true) {
      return <div className={`image-badges ${styles.container}`}>{images}</div>;
    }
    if (productListType === 'productSlider' && showOnSliders) {
      return <div className={`image-badges ${styles.containerSliders}`}>{images}</div>;
    }
  }

  // badgePostition is topRight
  if (badgePosition === 'topRight') {
    if (productListType === 'productGrid' && showOnLists) {
      return <div className={`image-badges ${styles.containerListsTopRight}`}>{images}</div>;
    }
    if (productListType === 'pdp' && productListSubType === 'mediaSection' && showOnPdp === true) {
      return <div className={`image-badges ${styles.containerTopRight}`}>{images}</div>;
    }
    if (productListType === 'productSlider' && showOnSliders) {
      return <div className={`image-badges ${styles.containerSlidersTopRight}`}>{images}</div>;
    }
  }

  // badgePostition is bottomLeft
  if (badgePosition === 'bottomLeft') {
    if (productListType === 'productGrid' && showOnLists) {
      return <div className={`image-badges ${styles.containerListsBottomLeft}`}>{images}</div>;
    }
    if (productListType === 'pdp' && productListSubType === 'mediaSection' && showOnPdp === true) {
      return <div className={`image-badges ${styles.containerBottomLeft}`}>{images}</div>;
    }
    if (productListType === 'productSlider' && showOnSliders) {
      return <div className={`image-badges ${styles.containerSlidersBottomLeft}`}>{images}</div>;
    }
  }

  // badgePostition is bottomRight
  if (badgePosition === 'bottomRight') {
    if (productListType === 'productGrid' && showOnLists) {
      return <div className={`image-badges ${styles.containerListsBottomRight}`}>{images}</div>;
    }
    if (productListType === 'pdp' && productListSubType === 'mediaSection' && showOnPdp === true) {
      return <div className={`image-badges ${styles.containerBottomRight}`}>{images}</div>;
    }
    if (productListType === 'productSlider' && showOnSliders) {
      return <div className={`image-badges ${styles.containerSlidersBottomRight}`}>{images}</div>;
    }
  }

  return null;
};

CardBadge.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
  badgePosition: PropTypes.string.isRequired,
};

export default CardBadge;
