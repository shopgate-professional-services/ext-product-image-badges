import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {
  badgeStylingSlider,
  badgeStylingPdp,
  badgeStylingList,
} from '../../config';

/**
 * @param {string} location the portal location
 * @param {Array} badgeInfo Array of badge image urls
 * @returns {JSX}
 */
const CardBadge = ({ location, badgeInfo }) => {
  const images = badgeInfo.map((image, index) => (
    <img className={styles.badge} src={image} alt="" key={index.toString()} />
  ));

  if (Object.entries(badgeStylingSlider).length > 0 && location === 'productCard') {
    return (
      <div className={styles.containerSlider}>
        {images}
      </div>
    );
  }

  if (Object.entries(badgeStylingPdp).length > 0 && location === 'PDP') {
    return (
      <div className={styles.containerPdp}>
        {images}
      </div>
    );
  }

  if (Object.entries(badgeStylingList).length > 0 && location === 'List') {
    return (
      <div className={styles.containerList}>
        {images}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {images}
    </div>
  );
};

CardBadge.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.string.isRequired,
};

export default CardBadge;
