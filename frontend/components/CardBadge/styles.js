import { css } from 'glamor';
import { cardBadgeRatio } from '../../config';

const { width, height } = cardBadgeRatio || {};

const container = css({
  display: 'float',
  position: 'absolute',
  right: 0,
  top: 0,
}).toString();

const image = css({
  width: `${width}`,
  height: `${height}`,
  marginLeft: 10,
}).toString();

export default {
  container,
  image,
};
