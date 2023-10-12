import { css } from 'glamor';
import {
  badgeWidth,
  maxBadgeWidth,
  badgeStyling,
  badgeStylingSlider,
  badgeStylingPdp,
  badgeStylingList,
} from '../../config';

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

const containerSlider = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 2, // Same as CTA
  ...badgeStylingSlider,
}).toString();

const containerList = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 2, // Same as CTA
  ...badgeStylingList,
}).toString();

const containerPdp = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 2, // Same as CTA
  ...badgeStylingPdp,
}).toString();

const badge = css({
  width: `${badgeWidth}%`,
  maxWidth: maxBadgeWidth,
}).toString();

export default {
  container,
  containerSlider,
  containerList,
  containerPdp,
  badge,
};
