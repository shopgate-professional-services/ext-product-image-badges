import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useProductListEntry } from '@shopgate/engage/product';
import { makeStyles } from '@shopgate/engage/styles';
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

const useStyles = makeStyles()(() => ({
  baseContainer: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column-reverse',
  },
  topLeftContainer: {
    alignItems: 'start',
    top: 5,
    left: 5,
  },
  topRightContainer: {
    alignItems: 'end',
    top: 5,
    right: 5,
  },
  bottomLeftContainer: {
    alignItems: 'start',
    bottom: 10,
    left: 5,
  },
  bottomRightContainer: {
    alignItems: 'end',
    bottom: 10,
    right: 5,
  },
  pdpCustomContainer: {
    ...badgeContainerStylingPdp,
  },
  productGridCustomContainer: {
    ...badgeContainerStylingLists,
  },
  slidersCustomContainer: {
    ...badgeContainerStylingSliders,
  },
  badge: {
    ...badgeStylingPdp,
  },
  badgeSliders: {
    ...badgeStylingSliders,
  },
  badgeLists: {
    ...badgeStylingLists,
  },
}));

/**
 * @param {Object} props component props
 * @param {Array} props.badgeInfo Array of badge image urls
 * @param {string} props.badgePosition string to declare the badge position
 * @returns {JSX.Element}
 */
const CardBadge = ({ badgeInfo, badgePosition }) => {
  const { classes } = useStyles();
  const { productListType, productListSubType } = useProductListEntry();

  const badgeClass = useMemo(() => {
    if (productListType === 'productSlider') {
      return classes.badgeSliders;
    }

    if (productListType === 'productGrid') {
      return classes.badgeLists;
    }

    return classes.badge;
  }, [classes, productListType]);

  const images = useMemo(() => {
    if (!Array.isArray(badgeInfo) || badgeInfo.length === 0) {
      return [];
    }

    return badgeInfo.map(({
      src, altText, text, style,
    }, index) => {
      if (text) {
        return (
          <div style={style} className="product-badge__text" key={index.toString()}>{text}</div>
        );
      }

      return (
        <img
          className={badgeClass}
          src={src}
          alt={altText}
          aria-hidden={!altText}
          key={index.toString()}
        />
      );
    });
  }, [badgeInfo, badgeClass]);

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
      classes.baseContainer,
      classes[`${badgePosition}Container`],
      classes[customClass],
    ].join(' ');
  }, [badgePosition, productListSubType, productListType, classes]);

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
  badgeInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  badgePosition: PropTypes.string.isRequired,
};

export default CardBadge;
