import { css } from 'glamor';
import { gridBadgeRatio } from '../../config';

const { width, height } = gridBadgeRatio || {};

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
