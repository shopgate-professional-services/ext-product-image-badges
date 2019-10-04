import { css } from 'glamor';
import { cardBadgeRatio, gridBadgeRatio, pdpBadgeRatio } from '../../config';

const container = css({
  display: 'float',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 10,
}).toString();

const cardImage = css({
  width: `${cardBadgeRatio.width}`,
  height: `${cardBadgeRatio.height}`,
}).toString();

const gridImage = css({
  width: `${gridBadgeRatio.width}`,
  height: `${gridBadgeRatio.height}`,
}).toString();

const pdpImage = css({
  width: `${pdpBadgeRatio.width}`,
  height: `${pdpBadgeRatio.height}`,
}).toString();

export default {
  container,
  cardImage,
  gridImage,
  pdpImage,
};
