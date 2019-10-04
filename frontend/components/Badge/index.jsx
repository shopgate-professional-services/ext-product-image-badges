import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from '@shopgate/pwa-common/components/Image';
import {
  PRODUCT_DETAILS_PAGE_LOCATION,
  PRODUCT_CARD_LOCATION,
  PRODUCT_GRID_LOCATION,
} from '../../constants';
import styles from './styles';

/**
 * @param {Array} badgeInfo Array of badge image urls
 * @returns {JSX}
 */
const CardBadge = ({ location, badgeInfo }) => {
  const imageClass = classNames(
    { [styles.cardImage]: location === PRODUCT_CARD_LOCATION },
    { [styles.gridImage]: location === PRODUCT_GRID_LOCATION },
    { [styles.pdpImage]: location === PRODUCT_DETAILS_PAGE_LOCATION }
  );

  const images = badgeInfo.map((image, index) => (
    <Image className={imageClass} src={image} alt="" key={index.toString()} />
  ));

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
