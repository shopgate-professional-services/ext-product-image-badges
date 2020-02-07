import { css } from 'glamor';
import { badgeWidth } from '../../config';

const container = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 10,
}).toString();

const badge = css({
  width: `${badgeWidth}%`,
}).toString();

export default {
  container,
  badge,
};
