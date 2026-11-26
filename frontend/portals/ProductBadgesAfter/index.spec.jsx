import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentProductImage from '../ComponentProductImage';
import ProductBadgesAfter from './index';

let mockAreaBadges = {};

jest.mock('../../hooks/useAreaBadges', () => () => mockAreaBadges);

jest.mock('../../config.json', () => ({
  badgeContainerStylingPdp: {},
  badgeContainerStylingSliders: {},
  badgeContainerStylingLists: {},
  badgeStylingPdp: {},
  badgeStylingSliders: {},
  badgeStylingLists: {},
}), { virtual: true });

const badges = [{
  id: 1,
  src: 'https://example.com/new.png',
  altText: 'New',
}];

describe('Badge portals', () => {
  it('should render the badges on the image when there is no discount badge to stack below', () => {
    mockAreaBadges = {
      area: 'lists',
      badges,
      position: 'topLeft',
      stackBelowDiscount: false,
    };

    render((
      <>
        <ComponentProductImage><span>image</span></ComponentProductImage>
        <ProductBadgesAfter />
      </>
    ));

    expect(screen.getAllByAltText('New')).toHaveLength(1);
    expect(screen.getByAltText('New').parentElement.className).toMatch(/topLeftContainer/);
  });

  it('should render the badges below the discount badge only once', () => {
    mockAreaBadges = {
      area: 'lists',
      badges,
      position: 'topLeft',
      stackBelowDiscount: true,
    };

    render((
      <>
        <ComponentProductImage><span>image</span></ComponentProductImage>
        <ProductBadgesAfter />
      </>
    ));

    expect(screen.getByText('image')).toBeInTheDocument();
    expect(screen.getAllByAltText('New')).toHaveLength(1);
    expect(screen.getByAltText('New').parentElement.className).toMatch(/stackedContainer/);
  });

  it('should render only the image without badges', () => {
    mockAreaBadges = {
      area: 'lists',
      badges: [],
      position: 'topLeft',
      stackBelowDiscount: false,
    };

    const { container } = render((
      <>
        <ComponentProductImage><span>image</span></ComponentProductImage>
        <ProductBadgesAfter />
      </>
    ));

    expect(container.innerHTML).toBe('<span>image</span>');
  });
});
