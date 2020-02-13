import React from 'react';
import PropTypes from 'prop-types';
import { withCurrentProduct } from '@shopgate/engage/core';
import Badge from '../../components/Badge';
import connect from '../connector';

/**
 * @param {Object} badgeInfo badge images to display
 * @returns {JSX}
 */
function ComponentProductImageBefore({ badgeInfo }) {
  if (!badgeInfo || badgeInfo.length === 0) {
    return null;
  }

  return (
    <Badge badgeInfo={badgeInfo} />
  );
}

ComponentProductImageBefore.propTypes = {
  badgeInfo: PropTypes.arrayOf(PropTypes.string),
};

ComponentProductImageBefore.defaultProps = {
  badgeInfo: null,
};

export default withCurrentProduct(connect(ComponentProductImageBefore));
