import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * @param {Array} badgeInfo Array of badge image urls
 * @returns {JSX}
 */
const GridBadge = ({ badgeInfo }) => {
  const images = badgeInfo.map((image, index) => (
    <img className={styles.image} src={image} alt="" key={index.toString()} />
  ));

  return (
    <div className={styles.container}>
      {images}
    </div>
  );
};

GridBadge.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GridBadge;
