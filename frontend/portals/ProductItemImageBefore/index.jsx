import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../../components/Badge';
import { showOnLists } from '../../config';
import connect from '../connector';

/**
 * @param {Object} badgeInfo badge images to display
 * @returns {JSX}
 */
const ProductItemImageBefore = ({ badgeInfo }) => {
  if (!showOnLists || !badgeInfo || badgeInfo.length === 0) {
    return null;
  }

  return <Badge badgeInfo={badgeInfo} />;
};

ProductItemImageBefore.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string),
};

ProductItemImageBefore.defaultProps = {
  badgeInfo: null,
};

export default connect(ProductItemImageBefore);
