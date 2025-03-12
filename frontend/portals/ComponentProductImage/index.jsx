import React from 'react';
import PropTypes from 'prop-types';
import { withProductListEntry, useProductListEntry } from '@shopgate/engage/product';
import { css } from 'glamor';
import Badge from '../../components/Badge';
import { badgePositionPdp, badgePositionSliders, badgePositionLists } from '../../config';

import connect from '../connector';

const styles = {
  root: css({
    position: 'relative',
  }),
};

/**
 * @param {Array} badgeInfo Array of badge image urls
 * @param {React.ReactNode} children .
 * @returns {JSX.Element}
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

  return (
    <div className={styles.root}>
      {children}
      <Badge badgePosition={badgePosition} badgeInfo={badgeInfo} />
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
