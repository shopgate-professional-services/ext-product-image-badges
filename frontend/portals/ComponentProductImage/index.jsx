import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@shopgate/engage/styles';
import Badge from '../../components/Badge';
import useAreaBadges from '../../hooks/useAreaBadges';

const useStyles = makeStyles()(() => ({
  root: {
    position: 'relative',
  },
}));

/**
 * Renders the badges on top of the product image. When the theme shows its discount badge in the
 * same corner, the badges are rendered below it by the ProductBadgesAfter portal instead.
 * @param {Object} props component props
 * @param {React.ReactNode} props.children .
 * @returns {JSX.Element}
 */
const ComponentProductImage = ({ children }) => {
  const { classes } = useStyles();
  const {
    area, badges, position, stackBelowDiscount,
  } = useAreaBadges();

  if (!area || badges.length === 0 || stackBelowDiscount) {
    return children;
  }

  return (
    <div className={classes.root}>
      {children}
      <Badge area={area} badgePosition={position} badgeInfo={badges} />
    </div>
  );
};

ComponentProductImage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ComponentProductImage;
