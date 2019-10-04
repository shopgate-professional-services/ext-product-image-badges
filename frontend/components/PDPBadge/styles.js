import { css } from 'glamor';
import { pdpBadgeRatio } from '../../config';

const { width, height } = pdpBadgeRatio || {};

const container = css({
  display: 'float',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 10,
}).toString();

const image = css({
  width: `${width}`,
  height: `${height}`,
}).toString();

export default {
  container,
  image,
};
