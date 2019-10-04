import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * @param {Array} badgeInfo Array of badge image urls
 * @returns {JSX}
 */
const PDPBadge = ({ badgeInfo }) => {
  const images = badgeInfo.map((image, index) => (
    <img className={styles.image} src={image} alt="" key={index.toString()} />
  ));

  return (
    <div className={styles.container}>
      {images}
    </div>
  );
};

PDPBadge.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PDPBadge;
