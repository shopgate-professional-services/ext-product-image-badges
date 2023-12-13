import React from 'react';
import PropTypes from 'prop-types';
import { withProductListEntry, useProductListEntry } from '@shopgate/engage/product';
import Badge from '../../components/Badge';
import { badgePositionPdp, badgePositionSliders, badgePositionLists } from '../../config';

import connect from '../connector';

/**
 * @param {Object} badgeInfo badge images to display
 * @returns {JSX}
 */
const ComponentProductImage = ({ children, badgeInfo }) => {
  const { productListType, productListSubType } = useProductListEntry();

  let badgePosition;

  if (!badgeInfo || badgeInfo.length === 0) {
    return children;
  }

  if (productListType === 'pdp' && productListSubType === 'mediaSection') {
    badgePosition = badgePositionPdp;
  }

  if (productListType === 'productSlider') {
    badgePosition = badgePositionSliders;
  }

  if (productListType === 'productGrid') {
    badgePosition = badgePositionLists;
  }

  if (badgePosition === 'bottomLeft' || badgePosition === 'bottomRight') {
    return (
      <div>
        {children}
        <Badge badgePosition={badgePosition} badgeInfo={badgeInfo} />
      </div>
    );
  }

  return (
    <div>
      <Badge badgePosition={badgePosition} badgeInfo={badgeInfo} />
      {children}
    </div>
  );
};

ComponentProductImage.propTypes = {
  children: PropTypes.node.isRequired,
  badgeInfo: PropTypes.arrayOf(PropTypes.string),

};

ComponentProductImage.defaultProps = {
  badgeInfo: null,
};

export default withProductListEntry(connect(ComponentProductImage));
