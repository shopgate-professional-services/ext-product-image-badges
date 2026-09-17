import React from 'react';
import PropTypes from 'prop-types';
import { withProductListEntry, useProductListEntry } from '@shopgate/engage/product';
import { makeStyles } from '@shopgate/engage/styles';
import Badge from '../../components/Badge';
import { badgePositionPdp, badgePositionSliders, badgePositionLists } from '../../config';

import connect from '../connector';

const useStyles = makeStyles()(() => ({
  root: {
    position: 'relative',
  },
}));

/**
 * @param {Array} badgeInfo Array of badge image urls
 * @param {React.ReactNode} children .
 * @returns {JSX.Element}
 */
const ComponentProductImage = ({ children, badgeInfo }) => {
  const { classes } = useStyles();
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
    <div className={classes.root}>
      {children}
      <Badge badgePosition={badgePosition} badgeInfo={badgeInfo} />
    </div>
  );
};

ComponentProductImage.propTypes = {
  children: PropTypes.node.isRequired,
  badgeInfo: PropTypes.arrayOf(PropTypes.object),
};

ComponentProductImage.defaultProps = {
  badgeInfo: null,
};

export default withProductListEntry(connect(ComponentProductImage));
