import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useProductListEntry } from '@shopgate/engage/product';
import { makeStyles } from '@shopgate/engage/styles';
import config from '../../config.json';

const {
  showOnLists,
  showOnPdp,
  showOnSliders,
  badgeContainerStylingPdp,
  badgeContainerStylingSliders,
  badgeContainerStylingLists,
  badgeStylingPdp,
  badgeStylingSliders,
  badgeStylingLists,
} = config;

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
      id, src, altText, text, style,
    }) => {
      if (text) {
        return (
          <div style={style} className="product-badge__text" key={id}>{text}</div>
        );
      }

      return (
        <img
          className={badgeClass}
          src={src}
          alt={altText}
          aria-hidden={!altText}
          key={id}
        />
      );
    });
  }, [badgeInfo, badgeClass]);

  const containerClasses = useMemo(() => {
    let customClass;

    if (productListType === 'productGrid' && showOnLists) {
      customClass = classes.productGridCustomContainer;
    }

    if (productListType === 'pdp' && productListSubType === 'mediaSection' && showOnPdp === true) {
      customClass = classes.pdpCustomContainer;
    }

    if (productListType === 'productSlider' && showOnSliders) {
      customClass = classes.slidersCustomContainer;
    }
    /**
     * A bit hacky, but we use the presence of the custom class as an indicator that something needs
     * to be rendered.
     */
    if (!customClass) {
      return null;
    }

    const positionClasses = {
      topLeft: classes.topLeftContainer,
      topRight: classes.topRightContainer,
      bottomLeft: classes.bottomLeftContainer,
      bottomRight: classes.bottomRightContainer,
    };

    return [
      'image-badges',
      classes.baseContainer,
      positionClasses[badgePosition],
      customClass,
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
  badgeInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string,
    altText: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.shape(),
  })).isRequired,
  badgePosition: PropTypes.string.isRequired,
};

export default CardBadge;
