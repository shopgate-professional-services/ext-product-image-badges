import { css } from 'glamor';
import { badgeWidth, maxBadgeWidth, badgeStyling } from '../../config';

const container = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 2, // Same as CTA
  ...badgeStyling,
}).toString();

const badge = css({
  width: `${badgeWidth}%`,
  maxWidth: maxBadgeWidth,
}).toString();

export default {
  container,
  badge,
};
