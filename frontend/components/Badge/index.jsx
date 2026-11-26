import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@shopgate/engage/styles';
import { AREA_PDP, AREA_SLIDERS, AREA_LISTS } from '../../helpers';
import config from '../../config.json';

const {
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
  stackedContainer: {
    alignItems: 'start',
    top: '100%',
    marginTop: 0,
    '* + &': {
      marginTop: 5,
    },
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
 * @param {string} props.area area the badges are rendered in (pdp, sliders, lists)
 * @param {string} props.badgePosition string to declare the badge position
 * @param {boolean} props.stacked whether the badges are rendered below the discount badge
 * @returns {JSX.Element}
 */
const CardBadge = ({
  badgeInfo, area, badgePosition, stacked,
}) => {
  const { classes } = useStyles();

  const badgeClass = useMemo(() => {
    if (area === AREA_SLIDERS) {
      return classes.badgeSliders;
    }

    if (area === AREA_LISTS) {
      return classes.badgeLists;
    }

    return classes.badge;
  }, [classes, area]);

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
    const customClasses = {
      [AREA_PDP]: classes.pdpCustomContainer,
      [AREA_SLIDERS]: classes.slidersCustomContainer,
      [AREA_LISTS]: classes.productGridCustomContainer,
    };

    if (!customClasses[area]) {
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
      stacked ? classes.stackedContainer : positionClasses[badgePosition],
      customClasses[area],
    ].join(' ');
  }, [area, badgePosition, stacked, classes]);

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
  area: PropTypes.string.isRequired,
  badgeInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string,
    altText: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.shape(),
  })).isRequired,
  badgePosition: PropTypes.string,
  stacked: PropTypes.bool,
};

CardBadge.defaultProps = {
  badgePosition: 'topLeft',
  stacked: false,
};

export default CardBadge;
