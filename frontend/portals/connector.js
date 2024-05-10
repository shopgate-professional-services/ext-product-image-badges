import { connect } from 'react-redux';
import { getBadgeInfo } from '../selectors';

/**
 * @param {Object} state state
 * @param {Object} props component props
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  badgeInfo: getBadgeInfo(state, props?.productListEntry),
});

export default connect(mapStateToProps);
